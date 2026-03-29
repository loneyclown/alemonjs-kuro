import CalendarCard from '@src/img/views/CalendarCard';
import { apiAnnList } from '@src/model/api';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';
import { withHandler } from '@src/model/handler';

export default withHandler(async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });
  const [message] = useMessage(event);

  const format = Format.create();
  const md = Format.createMarkdown();

  // 获取活动公告 (eventType=1)
  const actResp = await apiAnnList('1', 20);

  if (!actResp.success || !actResp.data) {
    md.addText(`[鸣潮] 活动日历获取失败: ${actResp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const now = Date.now();
  const events = (actResp.data.list ?? []).map(ann => {
    // 简化解析：将公告视为活动进行中
    const pubTime = new Date(ann.publishTime).getTime();
    const isActive = pubTime <= now;
    const isGacha = /调谐|唤取|卡池/.test(ann.title);
    const isTower = /深塔|海墟|矩阵|战略/.test(ann.title);

    return {
      title: ann.title,
      startTime: ann.publishTime,
      endTime: '—',
      type: isGacha ? 'gacha' : isTower ? 'tower' : 'activity',
      isActive
    };
  });

  const img = await renderComponentIsHtmlToBuffer(CalendarCard, { data: { events } });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 日历渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
});
