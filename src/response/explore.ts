import ExploreCard from '@src/img/views/ExploreCard';
import { apiBaseInfo, apiExploreData, apiMineV2, getCookie } from '@src/model/api';
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
    md.addText('[鸣潮] 未添加Token或Token已失效\n请使用 #mc登录 手机号 验证码 重新登录');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const { cookie } = ckResult;

  const [exploreResp, baseResp, mineResp] = await Promise.all([apiExploreData(uid, cookie), apiBaseInfo(uid, cookie), apiMineV2(cookie)]);

  if (!exploreResp.success || !exploreResp.data) {
    md.addText(`[鸣潮] 探索度查询失败: ${exploreResp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  if (!baseResp.success || !baseResp.data) {
    md.addText(`[鸣潮] 基础信息查询失败: ${baseResp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(ExploreCard, {
    data: {
      uid,
      base: baseResp.data,
      explore: exploreResp.data,
      headUrl: mineResp.data?.mine?.headUrl
    }
  });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 探索度卡片渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
};
