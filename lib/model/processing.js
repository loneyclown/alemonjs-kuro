import { createEvent, useMessage, Format } from 'alemonjs';

async function withProcessingFeedback(work, notify, delayMs = 2000) {
    const timer = setTimeout(() => {
        void Promise.resolve()
            .then(notify)
            .catch(() => { });
    }, delayMs);
    try {
        return await work();
    }
    finally {
        clearTimeout(timer);
    }
}
function processingLazy(loader, text = '正在查询数据并生成图片，请稍候…') {
    return () => {
        return Promise.resolve(async (e) => {
            const event = createEvent({
                event: e,
                selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
            });
            const [message] = useMessage(event);
            return await withProcessingFeedback(async () => (await loader()).default(e), async () => {
                const format = Format.create();
                format.addText(`[鸣潮] ${text}`);
                await message.send({ format });
            });
        });
    };
}

export { processingLazy, withProcessingFeedback };
