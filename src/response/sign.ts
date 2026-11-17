import SignCard from '@src/img/views/SignCard';
import { routeRules } from '@src/constants/kuro';
import { apiSignInit, getCookie } from '@src/model/api';
import { getActiveUid } from '@src/model/db';
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

  // 执行签到存在问题，当前处理器只读日历，不调用 apiSignIn。
  if (!routeRules.sign.test(event.MessageText)) {
    md.addText('[鸣潮] 签到执行暂未开放，请使用 #mc签到日历 查看记录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const uid = await getActiveUid(userId);

  if (!uid) {
    md.addText('[鸣潮] 请先登录：#mc登录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const ckResult = await getCookie(uid, userId);

  if (!ckResult) {
    md.addText('[鸣潮] 未添加Token或Token已失效，请私聊发送 #mc登录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const initResp = await apiSignInit(uid, ckResult.cookie, userId);

  if (!initResp.success || !initResp.data) {
    md.addText(`[鸣潮] 签到日历获取失败：${initResp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(SignCard, { data: { uid, sign: initResp.data, signMsg: '' } });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 签到日历渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
};
