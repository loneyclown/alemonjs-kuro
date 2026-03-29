import { bindUid, switchUid, unbindUid, viewUids } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';

var user = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
    console.log('[鸣潮][绑定] handler invoked, text:', text, 'userId:', userId);
    const format = Format.create();
    const md = Format.createMarkdown();
    try {
        let result = '';
        const bindMatch = text.match(/绑定(?:特征码|uid)?\s*(\d+)/i);
        if (bindMatch) {
            console.log('[鸣潮][绑定] matched uid:', bindMatch[1], '- calling bindUid...');
            result = await bindUid(userId, bindMatch[1]);
            console.log('[鸣潮][绑定] bindUid result:', result);
            md.addText(`[鸣潮] ${result}`);
            format.addMarkdown(md);
            await message.send({ format });
            console.log('[鸣潮][绑定] message sent');
            return;
        }
        const switchMatch = text.match(/切换(?:特征码|uid)?\s*(\d+)/i);
        if (switchMatch) {
            result = await switchUid(userId, switchMatch[1]);
            md.addText(`[鸣潮] ${result}`);
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        const unbindMatch = text.match(/(?:解绑|删除)(?:特征码|uid)?\s*(\d+)/i);
        if (unbindMatch) {
            result = await unbindUid(userId, unbindMatch[1]);
            md.addText(`[鸣潮] ${result}`);
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        if (/(?:查看|我的)(?:特征码|uid)?/i.test(text)) {
            result = await viewUids(userId);
            md.addText(`[鸣潮] ${result}`);
            format.addMarkdown(md);
            void message.send({ format });
            return;
        }
        md.addText('[鸣潮] 绑定指令用法:\n#mc绑定123456789\n#mc切换123456789\n#mc解绑123456789\n#mc查看');
        format.addMarkdown(md);
        void message.send({ format });
    }
    catch (err) {
        console.error('[鸣潮][绑定] error:', err);
        md.addText(`[鸣潮] 绑定操作出错: ${err instanceof Error ? err.message : String(err)}`);
        format.addMarkdown(md);
        void message.send({ format });
    }
};

export { user as default };
