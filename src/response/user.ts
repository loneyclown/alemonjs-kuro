import { bindUid, switchUid, unbindUid, viewUids } from '@src/model/db';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['message.create', 'private.message.create']
  });
  const [message] = useMessage(event);
  const userId = event.UserId;
  const text = e.MessageText;

  const format = Format.create();
  const md = Format.createMarkdown();
  let result = '';

  // 绑定特征码
  const bindMatch = text.match(/绑定(?:特征码|uid)\s*(\d+)/i);

  if (bindMatch) {
    result = await bindUid(userId, bindMatch[1]);
    md.addText(`[鸣潮] ${result}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 切换特征码
  const switchMatch = text.match(/切换(?:特征码|uid)\s*(\d+)/i);

  if (switchMatch) {
    result = await switchUid(userId, switchMatch[1]);
    md.addText(`[鸣潮] ${result}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 解绑/删除特征码
  const unbindMatch = text.match(/(?:解绑|删除)(?:特征码|uid)\s*(\d+)/i);

  if (unbindMatch) {
    result = await unbindUid(userId, unbindMatch[1]);
    md.addText(`[鸣潮] ${result}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 查看/我的特征码
  if (/(?:查看|我的)(?:特征码|uid)/i.test(text)) {
    result = await viewUids(userId);
    md.addText(`[鸣潮] ${result}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 默认提示
  md.addText('[鸣潮] 绑定指令用法:\n#绑定特征码123456789\n#切换特征码123456789\n#解绑特征码123456789\n#查看特征码');
  format.addMarkdown(md);
  void message.send({ format });
};
