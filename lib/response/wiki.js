import WikiCard from '../img/views/WikiCard.js';
import { getCookie, apiRoleData } from '../model/api.js';
import { findMatchingRoles } from '../model/roles.js';
import { getActiveUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function parseWikiQuery(text) {
    const typeMap = {
        技能: '技能',
        jn: '技能',
        天赋: '技能',
        共鸣链: '共鸣链',
        gml: '共鸣链',
        命座: '共鸣链',
        回路: '机制',
        机制: '机制',
        jz: '机制',
        操作: '机制',
        wiki: '概览',
        攻略: '概览',
        gl: '概览',
        图鉴: '概览',
        介绍: '概览'
    };
    let queryType = '概览';
    let charName = text;
    for (const [keyword, type] of Object.entries(typeMap)) {
        if (text.endsWith(keyword)) {
            queryType = type;
            charName = text.slice(0, -keyword.length).trim();
            break;
        }
    }
    charName = charName.replace(/^[!！/#＃](?:库洛|kuro|mc|鸣潮)/, '').trim();
    return { charName, queryType };
}
var wiki = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserKey;
    const format = Format.create();
    const md = Format.createMarkdown();
    const text = event.MessageText?.trim() ?? '';
    const { charName, queryType } = parseWikiQuery(text);
    if (!charName) {
        md.addText('[鸣潮] 请输入角色名，例如: #mc吟霖技能  #mc安可共鸣链  #mc鉴心攻略');
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
        md.addText('[鸣潮] 未添加Token或Token已失效');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const { cookie } = ckResult;
    const roleResp = await apiRoleData(uid, cookie, userId);
    if (!roleResp.success || !roleResp.data?.roleList) {
        md.addText('[鸣潮] 角色数据获取失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const candidates = findMatchingRoles(roleResp.data.roleList, charName);
    if (candidates.length > 1) {
        md.addText(`[鸣潮]「${charName}」匹配到多个角色：${candidates.map(role => role.roleName).join('、')}\n请使用完整角色名查询。`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const matchedRole = candidates[0];
    if (!matchedRole) {
        md.addText(`[鸣潮] 未找到角色「${charName}」，请检查角色名是否正确`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const { apiRoleDetail } = await import('../model/api.js');
    const detailResp = await apiRoleDetail(uid, cookie, userId, matchedRole.roleId);
    if (!detailResp.success || !detailResp.data) {
        md.addText(`[鸣潮] 角色「${matchedRole.roleName}」详情获取失败`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(WikiCard, {
        data: {
            uid,
            detail: detailResp.data,
            queryType
        }
    });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] Wiki卡片渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};

export { wiki as default };
