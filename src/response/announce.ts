import AnnCard from '@src/img/views/AnnCard';
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

  // 同时拉活动/公告两种
  const [actResp, newsResp] = await Promise.all([apiAnnList('1', 5), apiAnnList('3', 5)]);

  const activities = actResp.success && actResp.data ? actResp.data.list : [];
  const notices = newsResp.success && newsResp.data ? newsResp.data.list : [];

  if (activities.length === 0 && notices.length === 0) {
    md.addText('[鸣潮] 暂无公告信息');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(AnnCard, {
    data: { activities, notices }
  });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 公告卡片渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
});
