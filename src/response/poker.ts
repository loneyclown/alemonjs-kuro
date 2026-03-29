import PokerCard from '@src/img/views/PokerCard';
import { apiBaseInfo, apiMineV2, apiMoreActivity, getCookie } from '@src/model/api';
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
    md.addText('[鸣潮] 未添加Token或Token已失效');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { cookie } = ckResult;

  const [moreResp, baseResp, mineResp] = await Promise.all([apiMoreActivity(uid, cookie), apiBaseInfo(uid, cookie), apiMineV2(cookie)]);

  if (!moreResp.success || !moreResp.data?.phantomBattle) {
    md.addText('[鸣潮] 激斗数据获取失败或未解锁');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(PokerCard, {
    data: {
      uid,
      battle: moreResp.data.phantomBattle,
      base: baseResp.success ? baseResp.data : null,
      headUrl: mineResp.data?.mine?.headUrl
    }
  });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 激斗卡片渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
};
