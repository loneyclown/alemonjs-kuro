import CharDetailCard from '../img/views/CharDetailCard.js';
import { getCookie, apiRoleData, apiRoleDetail, apiBaseInfo, apiMineV2 } from '../model/api.js';
import { getActiveUid } from '../model/db.js';
import { findMatchingRoles } from '../model/roles.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var chardetail = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserKey;
    const format = Format.create();
    const md = Format.createMarkdown();
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
        md.addText('[鸣潮] 未添加Token或Token已失效\n请私聊发送 #mc登录 重新登录');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const { cookie } = ckResult;
    const roleResp = await apiRoleData(uid, cookie, userId);
    if (!roleResp.success || !roleResp.data) {
        md.addText(`[鸣潮] 角色列表查询失败: ${roleResp.msg || '未知错误'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const roleList = roleResp.data.roleList || [];
    const candidates = findMatchingRoles(roleList, charName);
    if (candidates.length > 1) {
        md.addText(`[鸣潮]「${charName}」匹配到多个角色：${candidates.map(role => role.roleName).join('、')}\n请使用完整角色名查询。`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const target = candidates[0];
    if (!target) {
        const names = roleList.map(r => r.roleName).join('、');
        md.addText(`[鸣潮] 未找到角色「${charName}」\n已拥有: ${names || '无'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const [detailResp, baseResp, mineResp] = await Promise.all([
        apiRoleDetail(uid, cookie, userId, target.roleId),
        apiBaseInfo(uid, cookie, userId),
        apiMineV2(cookie)
    ]);
    if (!detailResp.success || !detailResp.data) {
        md.addText(`[鸣潮] 角色详情查询失败: ${detailResp.msg || '未知错误'}\n提示: 请先在游戏内展示该角色的声骸数据`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(CharDetailCard, {
        data: {
            uid,
            detail: detailResp.data,
            base: baseResp.data ?? undefined,
            headUrl: mineResp.data?.mine?.headUrl
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

export { chardetail as default };
