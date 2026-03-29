import { mihoyoRouteRules } from '@src/constants/mihoyo';
import { defineRouter, lazy } from 'alemonjs';

export default defineRouter([
  {
    // 局部中间件
    // 仅限消息和交互事件处理
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
    handler: lazy(() => import('@src/response/mw')),
    children: [
      {
        regular: mihoyoRouteRules.help,
        handler: lazy(() => import('@src/response/help'))
      }
    ]
  }
]);
