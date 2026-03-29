import CoinCard from '@src/img/views/CoinCard';
import { apiMineV2, getCookie } from '@src/model/api';
import { getActiveUid } from '@src/model/db';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
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

  const ckResult = await getCookie(uid, userId);

  if (!ckResult) {
    md.addText('[鸣潮] 未添加Token或Token已失效\n请使用 #mc登录 手机号,验证码 重新登录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { cookie } = ckResult;

  const resp = await apiMineV2(cookie);

  if (!resp.success || !resp.data) {
    md.addText(`[鸣潮] 库洛币查询失败: ${resp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(CoinCard, {
    data: { uid, mine: resp.data.mine }
  });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 库洛币卡片渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
};
