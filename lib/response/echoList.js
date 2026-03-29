import EchoListCard from '../img/views/EchoListCard.js';
import { getCookie, apiRoleData, apiBaseInfo, apiRoleDetail } from '../model/api.js';
import { getActiveUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

const ECHOES_PER_PAGE = 20;
var echoList = async (e) => {
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
    const ckResult = await getCookie(uid);
    if (!ckResult) {
        md.addText('[鸣潮] 未添加Token或Token已失效');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const { cookie } = ckResult;
    const [roleResp, baseResp] = await Promise.all([apiRoleData(uid, cookie), apiBaseInfo(uid, cookie)]);
    if (!roleResp.success || !roleResp.data?.roleList?.length) {
        md.addText('[鸣潮] 角色列表为空或查询失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const playerName = baseResp.success && baseResp.data ? baseResp.data.name : '漂泊者';
    const allEchoes = [];
    for (const role of roleResp.data.roleList) {
        const detailResp = await apiRoleDetail(uid, cookie, role.roleId);
        if (!detailResp.success || !detailResp.data?.phantomData?.equipPhantomList) {
            continue;
        }
        for (const equip of detailResp.data.phantomData.equipPhantomList) {
            if (!equip?.phantomProp) {
                continue;
            }
            const phantom = equip.phantomProp;
            allEchoes.push({
                roleId: role.roleId,
                roleName: role.roleName,
                roleIconUrl: role.roleIconUrl ?? '',
                phantomName: phantom.name ?? '未知',
                phantomIconUrl: phantom.iconUrl ?? '',
                level: equip.level ?? 0,
                cost: equip.cost ?? 0,
                fetterName: equip.fetterDetail?.name ?? '',
                mainProps: equip.mainProps ?? [],
                subProps: equip.subProps ?? []
            });
        }
    }
    allEchoes.sort((a, b) => b.cost - a.cost || b.level - a.level);
    const totalPages = Math.max(1, Math.ceil(allEchoes.length / ECHOES_PER_PAGE));
    const page = 1;
    const pageEchoes = allEchoes.slice((page - 1) * ECHOES_PER_PAGE, page * ECHOES_PER_PAGE);
    const img = await renderComponentIsHtmlToBuffer(EchoListCard, {
        data: {
            uid,
            playerName,
            echoes: pageEchoes,
            page,
            totalPages
        }
    });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] 声骸列表渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};

export { echoList as default };
