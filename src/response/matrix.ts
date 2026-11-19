import { routeRules } from '@src/constants/kuro';
import MatrixCard from '@src/img/views/MatrixCard';
import { apiMatrixDetail, getCookie } from '@src/model/api';
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
  const reply = (text: string) => {
    const format = Format.create();
    const md = Format.createMarkdown();

    md.addText(text);
    format.addMarkdown(md);

    return message.send({ format });
  };

  const uid = await getActiveUid(userId);

  if (!uid) {
    await reply('[鸣潮] 请私聊发送 #mc登录 绑定游戏账号');

    return;
  }

  const ckResult = await getCookie(uid, userId);

  if (!ckResult) {
    await reply('[鸣潮] 未找到有效凭据，请私聊发送 #mc登录');

    return;
  }

  const resp = await apiMatrixDetail(uid, ckResult.cookie, userId);

  if (!resp.success) {
    await reply('[鸣潮] 库街区矩阵查询失败，请稍后重试，或私聊发送 #mc登录 更新凭据');

    return;
  }
  if (!resp.data) {
    await reply('[鸣潮] 库街区暂未返回终焉矩阵数据');

    return;
  }

  const command = routeRules.matrix.exec(event.MessageText.trim())?.[1];
  const modeId = command === '奇点扩张' ? 1 : command === '稳态协议' ? 0 : undefined;
  const img = await renderComponentIsHtmlToBuffer(MatrixCard, { data: { uid, matrix: resp.data, modeId } });

  if (typeof img === 'boolean') {
    await reply('[鸣潮] 终焉矩阵卡片渲染失败');

    return;
  }

  const format = Format.create();

  format.addImage(img);
  await message.send({ format });
};
