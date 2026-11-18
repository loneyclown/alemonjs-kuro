import PeriodCard from '@src/img/views/PeriodCard';
import { routeRules } from '@src/constants/kuro';
import { apiPeriodDetail, apiPeriodList, getCookie } from '@src/model/api';
import { getActiveUid } from '@src/model/db';
import { selectMonth } from '@src/model/period';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });
  const [message] = useMessage(event);
  const userId = event.UserKey;

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
    md.addText('[鸣潮] 未添加Token或Token已失效\n请私聊发送 #mc登录 重新登录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { cookie } = ckResult;

  // 获取可用周期列表
  const listResp = await apiPeriodList(uid, cookie, userId);

  if (!listResp.success || !listResp.data) {
    md.addText(`[鸣潮] 资源统计周期获取失败: ${listResp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const months = listResp.data.months ?? [];
  const query = routeRules.period.exec(event.MessageText)?.[2]?.trim() ?? '';
  const selected = selectMonth(months, query);

  if (!selected) {
    const latest = selectMonth(months);
    const available = months
      .filter(month => month && Number.isSafeInteger(month.index))
      .map(month => `${month.title}（${month.index}）`)
      .join('、');

    md.addText(available && latest ? `[鸣潮] 未找到对应月报，可用月份：${available}\n例如：#mc星声 ${latest.index}` : '[鸣潮] 暂无可用的资源统计数据');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const detailResp = await apiPeriodDetail(uid, cookie, userId, 'month', selected.index);

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
      periodTitle: selected.title || `月报 #${selected.index}`,
      periodIndex: selected.index,
      availableMonths: months,
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
};
