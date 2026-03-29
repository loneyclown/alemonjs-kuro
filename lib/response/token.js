import { getActiveUid, addToken, deleteToken, getUserByUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';

var token = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
    const format = Format.create();
    const md = Format.createMarkdown();
    if (/添加/i.test(text)) {
        const tokenText = text.replace(/^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(?:添加)(?:token|Token|TOKEN|ck|CK)\s*/i, '').trim();
        if (!tokenText) {
            md.addText('[鸣潮] 请输入Token\n格式: #mc添加token <token> 或 #mc添加token <token>,<did>');
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        let cookie = tokenText;
        let did = '';
        const normalized = tokenText.replace('，', ',');
        if (normalized.includes(',')) {
            const parts = normalized.split(',');
            cookie = parts[0].trim();
            did = parts[1]?.trim() ?? '';
        }
        if (did && ![32, 36, 40].includes(did.length)) {
            md.addText('[鸣潮] DID位数不正确(需32/36/40位)，如无DID则不需要加逗号');
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
        await addToken(userId, uid, cookie, did);
        md.addText(`[鸣潮] Token添加成功 (UID: ${uid})`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    if (/删除/i.test(text)) {
        const uidMatch = text.match(/(\d{9})/);
        if (!uidMatch) {
            md.addText('[鸣潮] 请指定特征码: #mc删除token123456789');
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        await deleteToken(uidMatch[1]);
        md.addText(`[鸣潮] UID ${uidMatch[1]} 的Token已删除`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    if (/获取/i.test(text)) {
        const uid = await getActiveUid(userId);
        if (!uid) {
            md.addText('[鸣潮] 未绑定特征码');
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        const user = await getUserByUid(uid);
        if (!user?.cookie) {
            md.addText(`[鸣潮] UID ${uid} 未添加Token`);
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        md.addText(`[鸣潮] UID: ${uid}\nToken: ${user.cookie.substring(0, 20)}...`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    md.addText('[鸣潮] Token指令:\n#mc添加token <token>\n#mc删除token <uid>\n#mc获取token');
    format.addMarkdown(md);
    void message.send({ format });
};

export { token as default };
