import CharDetailCard from '@src/img/views/CharDetailCard';
import { apiRoleData, apiRoleDetail, getCookie } from '@src/model/api';
import { getActiveUid } from '@src/model/db';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });
  const [message] = useMessage(event);
  const userId = event.UserId;

  const format = Format.create();
  const md = Format.createMarkdown();

  // 提取角色名
  const charName = e.MessageText.replace(/^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(?:查询|卡片|kp|面板|面版|mb)\s*/, '').trim();

  if (!charName) {
    md.addText('[鸣潮] 请输入角色名，如: #mc面板 今汐');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const uid = await getActiveUid(userId);

  if (!uid) {
    md.addText('[鸣潮] 请先绑定特征码: #mc绑定123456789');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const ckResult = await getCookie(uid, userId);

  if (!ckResult) {
    md.addText('[鸣潮] 未添加Token或Token已失效\n请使用 #mc登录 手机号 验证码 重新登录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { cookie } = ckResult;

  // 1. 获取角色列表，查找目标角色的 roleId
  const roleResp = await apiRoleData(uid, cookie);

  if (!roleResp.success || !roleResp.data) {
    md.addText(`[鸣潮] 角色列表查询失败: ${roleResp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const roleList = roleResp.data.roleList || [];
  const target = roleList.find(
    r => r.roleName === charName || r.roleName.includes(charName) || (r.acronym && r.acronym.toLowerCase() === charName.toLowerCase())
  );

  if (!target) {
    const names = roleList.map(r => r.roleName).join('、');

    md.addText(`[鸣潮] 未找到角色「${charName}」\n已拥有: ${names || '无'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 2. 获取角色详情
  const detailResp = await apiRoleDetail(uid, cookie, target.roleId);

  if (!detailResp.success || !detailResp.data) {
    md.addText(`[鸣潮] 角色详情查询失败: ${detailResp.msg || '未知错误'}\n提示: 请先在游戏内展示该角色的声骸数据`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 3. 渲染详情卡片
  const img = await renderComponentIsHtmlToBuffer(CharDetailCard, {
    data: {
      uid,
      detail: detailResp.data
    }
  });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 角色详情卡片渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
};
