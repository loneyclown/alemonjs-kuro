import kuroHelp, { HELP_DATA, MORE_HELP_DATA, MORE_HELP_NOTES } from '@src/img/views/Help';
import { trySendCommandMarkdown } from '@src/model/markdown';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });

  const [message] = useMessage(event);
  const more = event.MessageText.endsWith('更多帮助');
  const isPrivate = event.name.startsWith('private.');
  const categories = more ? MORE_HELP_DATA : HELP_DATA;

  if (
    await trySendCommandMarkdown(event, {
      title: more ? '鸣潮助手 · 更多指令' : '鸣潮助手 · 常用指令',
      sections: categories.map(category => ({
        title: category.title,
        commands: category.items.map(item => ({
          label: `${item.name}${item.private ? '（私聊）' : ''}`,
          command: item.input ?? item.command,
          display: item.private ? undefined : item.command,
          autoEnter: item.input === undefined && (!item.private || isPrivate)
        }))
      })),
      navigation: [
        { label: '私聊登录', command: '#mc登录', autoEnter: isPrivate },
        { label: more ? '返回常用帮助' : '更多指令', command: more ? '#mc帮助' : '#mc更多帮助' }
      ],
      note: more
        ? ['带参数的指令会填入输入框，补齐后发送。凭据请在私聊提交。', ...MORE_HELP_NOTES].join('\n')
        : '点击指令可执行或填入输入框。进阶用法见更多指令。'
    })
  ) {
    return;
  }

  const img = await renderComponentIsHtmlToBuffer(kuroHelp, { more });

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
};
