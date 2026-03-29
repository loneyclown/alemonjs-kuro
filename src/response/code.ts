import type { RedeemCode } from '@src/model/types';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { withHandler } from '@src/model/handler';

const CODE_URL = 'https://wiki.kurobbs.com/mc/home/activity';

export default withHandler(async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });
  const [message] = useMessage(event);

  const format = Format.create();
  const md = Format.createMarkdown();

  let codes: RedeemCode[] = [];

  try {
    const resp = await fetch(CODE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15'
      }
    });
    const html = await resp.text();

    // 从页面提取兑换码 (简单正则匹配)
    const codeMatches = html.match(/[A-Z0-9]{10,20}/g);

    if (codeMatches) {
      codes = [...new Set(codeMatches)].map(code => ({
        code,
        rewards: '游戏兑换码'
      }));
    }
  } catch {
    // 网络异常时返回空
  }

  if (codes.length === 0) {
    md.addText('[鸣潮] 当前暂无可用兑换码\n请访问库街区查看最新活动');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  let text = '[鸣潮] 可用兑换码:\n';

  for (const c of codes) {
    text += `\n${c.code}`;
  }

  text += '\n\n前往游戏内兑换或访问官网兑换';

  md.addText(text);
  format.addMarkdown(md);
  void message.send({ format });
});
