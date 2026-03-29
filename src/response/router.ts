import { routeRules } from '@src/constants/kuro';
import { defineRouter, lazy } from 'alemonjs';

export default defineRouter([
  {
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
    handler: lazy(() => import('@src/response/mw')),
    children: [
      {
        regular: routeRules.help,
        handler: lazy(() => import('@src/response/help'))
      },
      {
        regular: routeRules.login,
        handler: lazy(() => import('@src/response/login'))
      },
      {
        regular: routeRules.token,
        handler: lazy(() => import('@src/response/token'))
      },
      {
        regular: routeRules.bind,
        handler: lazy(() => import('@src/response/user'))
      },
      {
        regular: routeRules.stamina,
        handler: lazy(() => import('@src/response/stamina'))
      },
      {
        regular: routeRules.chardetail,
        handler: lazy(() => import('@src/response/chardetail'))
      },
      {
        regular: routeRules.roleinfo,
        handler: lazy(() => import('@src/response/roleinfo'))
      },
      {
        regular: routeRules.explore,
        handler: lazy(() => import('@src/response/explore'))
      },
      {
        regular: routeRules.sign,
        handler: lazy(() => import('@src/response/sign'))
      },
      {
        regular: routeRules.tower,
        handler: lazy(() => import('@src/response/tower'))
      },
      {
        regular: routeRules.challenge,
        handler: lazy(() => import('@src/response/challenge'))
      },
      {
        regular: routeRules.slash,
        handler: lazy(() => import('@src/response/slash'))
      },
      {
        regular: routeRules.matrix,
        handler: lazy(() => import('@src/response/matrix'))
      },
      {
        regular: routeRules.charlist,
        handler: lazy(() => import('@src/response/charlist'))
      },
      {
        regular: routeRules.coin,
        handler: lazy(() => import('@src/response/coin'))
      },
      {
        regular: routeRules.announce,
        handler: lazy(() => import('@src/response/announce'))
      },
      {
        regular: routeRules.code,
        handler: lazy(() => import('@src/response/code'))
      },
      {
        regular: routeRules.gacha,
        handler: lazy(() => import('@src/response/gacha'))
      },
      {
        regular: routeRules.echoList,
        handler: lazy(() => import('@src/response/echoList'))
      },
      {
        regular: routeRules.calabash,
        handler: lazy(() => import('@src/response/calabash'))
      },
      {
        regular: routeRules.period,
        handler: lazy(() => import('@src/response/period'))
      },
      {
        regular: routeRules.calendar,
        handler: lazy(() => import('@src/response/calendar'))
      },
      {
        regular: routeRules.pool,
        handler: lazy(() => import('@src/response/pool'))
      },
      {
        regular: routeRules.refresh,
        handler: lazy(() => import('@src/response/refresh'))
      },
      {
        regular: routeRules.develop,
        handler: lazy(() => import('@src/response/develop'))
      },
      {
        regular: routeRules.poker,
        handler: lazy(() => import('@src/response/poker'))
      },
      {
        regular: routeRules.rank,
        handler: lazy(() => import('@src/response/rank'))
      },
      {
        regular: routeRules.wiki,
        handler: lazy(() => import('@src/response/wiki'))
      }
    ]
  }
]);
