import SignCard from '@src/img/views/SignCard';
import { apiSignIn, apiSignInit, getCookie } from '@src/model/api';
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
  const text = e.MessageText;

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
    md.addText('[鸣潮] 未添加Token或Token已失效\n请使用 #mc登录 手机号 验证码 重新登录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { cookie } = ckResult;

  // 是否执行签到（非日历/记录）
  const isDoSign = /签到$|qd$/i.test(text) && !/日历|记录|jl/i.test(text);

  // 1. 先获取签到初始化数据（日历）
  const initResp = await apiSignInit(uid, cookie);

  // 2. 如果是签到指令，尝试执行签到
  let signMsg = '';

  if (isDoSign) {
    const signResp = await apiSignIn(uid, cookie);

    if (signResp.success) {
      signMsg = '签到成功！';
      // 签到成功后重新获取最新状态
      const refreshResp = await apiSignInit(uid, cookie);

      if (refreshResp.success && refreshResp.data) {
        // 使用刷新后的数据
        Object.assign(initResp, refreshResp);
      }
    } else {
      signMsg = `签到失败: ${signResp.msg || '未知错误'}`;
    }
  }

  // 3. 渲染签到日历卡片
  if (!initResp.success || !initResp.data) {
    // init 也失败了，只能发文本
    if (signMsg) {
      md.addText(`[鸣潮] ${signMsg}`);
    } else {
      md.addText(`[鸣潮] 签到信息获取失败: ${initResp.msg || '未知错误'}`);
    }
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(SignCard, {
    data: {
      uid,
      sign: initResp.data,
      signMsg
    }
  });

  if (typeof img === 'boolean') {
    if (signMsg) {
      md.addText(`[鸣潮] ${signMsg}`);
    } else {
      md.addText('[鸣潮] 签到卡片渲染失败');
    }
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
};
