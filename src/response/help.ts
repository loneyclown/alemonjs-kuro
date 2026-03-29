import kuroHelp from '@src/img/views/Help';
import { withHandler } from '@src/model/handler';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default withHandler(async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);

  const img = await renderComponentIsHtmlToBuffer(kuroHelp, {});

  if (typeof img === 'boolean') {
    const format = Format.create();
    const md = Format.createMarkdown();

    md.addText('[鸣潮] 帮助图片加载失败，请稍后重试');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const format = Format.create();

  format.addImage(img);
  void message.send({ format });
});
