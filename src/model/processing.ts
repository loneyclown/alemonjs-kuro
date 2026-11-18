import { createEvent, type EventsEnum, Format, useMessage } from 'alemonjs';

export async function withProcessingFeedback<T>(work: () => Promise<T>, notify: () => Promise<unknown>, delayMs = 2000) {
  const timer = setTimeout(() => {
    // 提示发送失败不能中断原指令，也不输出可能含账号数据的异常。
    void Promise.resolve()
      .then(notify)
      .catch(() => {});
  }, delayMs);

  try {
    return await work();
  } finally {
    clearTimeout(timer);
  }
}

export function processingLazy(loader: () => Promise<{ default: (event: EventsEnum) => unknown }>, text = '正在查询数据并生成图片，请稍候…') {
  return () => {
    return Promise.resolve(async (e: EventsEnum) => {
      const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
      });
      const [message] = useMessage(event);

      return await withProcessingFeedback(
        async () => (await loader()).default(e),
        async () => {
          const format = Format.create();

          format.addText(`[鸣潮] ${text}`);

          await message.send({ format });
        }
      );
    });
  };
}
