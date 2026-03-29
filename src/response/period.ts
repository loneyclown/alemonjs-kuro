import PeriodCard from '@src/img/views/PeriodCard';
import { apiPeriodDetail, apiPeriodList, getCookie } from '@src/model/api';
import { getActiveUid } from '@src/model/db';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';
import { withHandler } from '@src/model/handler';

export default withHandler(async (e: EventsEnum) => {
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
    md.addText('[鸣潮] 未添加Token或Token已失效\n请使用 #登录 手机号,验证码 重新登录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { cookie } = ckResult;

  // 获取可用周期列表
  const listResp = await apiPeriodList(uid, cookie);

  if (!listResp.success || !listResp.data) {
    md.addText(`[鸣潮] 资源统计周期获取失败: ${listResp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // 默认查询本月
  const months = listResp.data.months ?? [];
  const latestMonth = months.length > 0 ? months[0] : null;

  if (!latestMonth) {
    md.addText('[鸣潮] 暂无可用的资源统计数据');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const detailResp = await apiPeriodDetail(uid, cookie, 'month', latestMonth.index);

  if (!detailResp.success || !detailResp.data) {
    md.addText(`[鸣潮] 资源统计详情获取失败: ${detailResp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(PeriodCard, {
    data: {
      uid,
      periodType: 'month',
      periodTitle: latestMonth.title || `月报 #${latestMonth.index}`,
      detail: detailResp.data
    }
  });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 资源统计卡片渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
});
