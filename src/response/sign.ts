import SignCard from '@src/img/views/SignCard';
import { routeRules } from '@src/constants/kuro';
import { apiMineV2, apiSignIn, apiSignInit, getCookie } from '@src/model/api';
import type { SignInitResp } from '@src/model/types';
import { getActiveUid } from '@src/model/db';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

// 同一进程内避免同一角色因并发指令重复提交。
const signing = new Set<string>();

async function signToday(uid: string, cookie: string, owner: string, calendar: SignInitResp) {
  const signed = calendar.isSigIn ?? calendar.hasSignIn;

  if (signed === true) {
    return '今日已签到。';
  }
  const month = calendar.nowServerTimes?.match(/^\d{4}-(0[1-9]|1[0-2])-\d{2}/)?.[1];

  if (signed !== false || !month) {
    return '库街区未返回完整的签到状态，请稍后再试。';
  }
  const mine = await apiMineV2(cookie);
  const communityId = String(mine.data?.mine?.userId ?? '');

  if (!mine.success || !/^\d+$/.test(communityId)) {
    return '未能获取库街区账号，请检查登录状态后重试。';
  }
  if ((await getCookie(uid, owner))?.cookie !== cookie) {
    return '登录状态已变更，请重新发送签到指令。';
  }
  const result = await apiSignIn(uid, cookie, owner, month, communityId);
  const confirmed = await apiSignInit(uid, cookie, owner);

  if (confirmed.success && (confirmed.data?.isSigIn ?? confirmed.data?.hasSignIn) === true) {
    if (result.success) {
      return '签到成功，发送 #mc签到日历 查看记录。';
    }

    return '今日已签到，发送 #mc签到日历 查看记录。';
  }
  if (result.success || result.code === -999 || result.code === 1511) {
    return '暂未确认签到结果，请发送 #mc签到日历 核对。';
  }

  return `库街区拒绝了签到请求（${result.code}），请在库街区检查签到和登录状态。`;
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });
  const [message] = useMessage(event);
  const userId = event.UserKey;
  const format = Format.create();
  const md = Format.createMarkdown();

  const command = routeRules.sign.exec(event.MessageText)?.[1];

  if (!command) {
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

  if (command === '签到' || command === 'qd') {
    const send = (text: string) => {
      format.addText(`[鸣潮] ${text}`);

      return message.send({ format });
    };

    if (signing.has(uid)) {
      await send('签到处理中，请稍候。');

      return;
    }
    signing.add(uid);
    try {
      const calendar = await apiSignInit(uid, ckResult.cookie, userId);
      const result =
        calendar.success && calendar.data ? await signToday(uid, ckResult.cookie, userId, calendar.data) : '未能获取签到状态，请检查登录状态后重试。';

      await send(result);
    } finally {
      signing.delete(uid);
    }

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
