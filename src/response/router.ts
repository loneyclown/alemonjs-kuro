import { wuwaRouteRules } from '@src/constants/wuwa';
import { defineRouter, lazy } from 'alemonjs';

export default defineRouter([
  {
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
    handler: lazy(() => import('@src/response/mw')),
    children: [
      {
        regular: wuwaRouteRules.help,
        handler: lazy(() => import('@src/response/help'))
      },
      {
        regular: wuwaRouteRules.login,
        handler: lazy(() => import('@src/response/login'))
      },
      {
        regular: wuwaRouteRules.bind,
        handler: lazy(() => import('@src/response/user'))
      },
      {
        regular: wuwaRouteRules.token,
        handler: lazy(() => import('@src/response/token'))
      },
      {
        regular: wuwaRouteRules.stamina,
        handler: lazy(() => import('@src/response/stamina'))
      },
      {
        regular: wuwaRouteRules.roleinfo,
        handler: lazy(() => import('@src/response/roleinfo'))
      },
      {
        regular: wuwaRouteRules.explore,
        handler: lazy(() => import('@src/response/explore'))
      },
      {
        regular: wuwaRouteRules.sign,
        handler: lazy(() => import('@src/response/sign'))
      },
      {
        regular: wuwaRouteRules.tower,
        handler: lazy(() => import('@src/response/tower'))
      },
      {
        regular: wuwaRouteRules.refresh,
        handler: lazy(() => import('@src/response/refresh'))
      }
    ]
  }
]);
