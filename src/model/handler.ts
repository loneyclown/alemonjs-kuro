import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';

type Handler = (e: EventsEnum) => Promise<void>;

/** 包装 handler，确保所有指令都有反馈（即使抛出未捕获异常） */
export function withHandler(fn: Handler): Handler {
  return async (e: EventsEnum) => {
    try {
      await fn(e);
    } catch (err) {
      console.error('[鸣潮] 指令执行出错:', err);
      try {
        const event = createEvent({
          event: e,
          selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
        });
        const [message] = useMessage(event);
        const format = Format.create();
        const md = Format.createMarkdown();

        md.addText(`[鸣潮] 指令执行出错: ${err instanceof Error ? err.message : String(err)}`);
        format.addMarkdown(md);
        void message.send({ format });
      } catch {
        // 反馈发送也失败，忽略
      }
    }
  };
}
