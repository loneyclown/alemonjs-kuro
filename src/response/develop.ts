import DevelopCard from '@src/img/views/DevelopCard';
import { apiBatchRoleCost, apiCalcRefresh, apiOwnedRoleInfo, getCookie } from '@src/model/api';
import { getActiveUid } from '@src/model/db';
import type { CultivateCostItem } from '@src/model/types';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

/** 技能类型顺序 */
const SKILL_ORDER = ['常态攻击', '共鸣技能', '共鸣解放', '变奏技能', '共鸣回路'];

/** 技能突破列表 */
const SKILL_BREAK_LIST = ['2-1', '2-2', '2-3', '2-4', '2-5', '3-1', '3-2', '3-3', '3-4', '3-5'];

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });
  const [message] = useMessage(event);
  const userId = event.UserId;

  const format = Format.create();
  const md = Format.createMarkdown();

  const uid = await getActiveUid(userId);

  if (!uid) {
    md.addText('[鸣潮] 请先绑定特征码: #mc绑定123456789');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const ckResult = await getCookie(uid, userId);

  if (!ckResult) {
    md.addText('[鸣潮] 未添加Token或Token已失效');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { cookie } = ckResult;

  // 刷新计算器数据
  await apiCalcRefresh(uid, cookie);

  // 获取已拥有角色
  const ownedResp = await apiOwnedRoleInfo(uid, cookie);

  if (!ownedResp.success || !ownedResp.data) {
    md.addText('[鸣潮] 获取角色培养数据失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const ownedRoles = ownedResp.data?.roleInfoList ?? [];

  if (ownedRoles.length === 0) {
    md.addText('[鸣潮] 未找到已拥有角色');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 构建批量培养请求 — 所有已拥有角色 升级到90、技能10
  const contentList = ownedRoles.map(role => {
    return {
      roleId: role.roleId,
      roleStartLevel: role.level ?? 1,
      roleEndLevel: 90,
      skillLevelUpList: SKILL_ORDER.map(() => ({
        startLevel: 1,
        endLevel: 10
      })),
      advanceSkillList: SKILL_BREAK_LIST,
      weaponStartLevel: 1,
      weaponEndLevel: 90,
      weaponId: 0,
      _category: 'self'
    };
  });

  const costResp = await apiBatchRoleCost(uid, cookie, contentList);

  if (!costResp.success || !costResp.data?.costList) {
    md.addText('[鸣潮] 培养成本计算失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 合并所有角色的材料需求
  const mergedCosts = new Map<number, CultivateCostItem>();

  for (const roleEntry of costResp.data.costList) {
    for (const cost of roleEntry.cultivateCost ?? []) {
      const existing = mergedCosts.get(cost.id);

      if (existing) {
        existing.num += cost.num;
      } else {
        mergedCosts.set(cost.id, { ...cost });
      }
    }
  }

  const totalCosts = Array.from(mergedCosts.values()).sort((a, b) => b.quality - a.quality || b.num - a.num);

  const img = await renderComponentIsHtmlToBuffer(DevelopCard, {
    data: {
      uid,
      roles: costResp.data.costList.map(c => ({
        roleId: c.roleId,
        roleName: c.roleName
      })),
      costs: totalCosts
    }
  });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 培养卡片渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
};
