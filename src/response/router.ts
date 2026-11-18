import { routeRules } from '@src/constants/kuro';
import { defineRouter, lazy } from 'alemonjs';
import { processingLazy } from '@src/model/processing';

export default defineRouter([
  {
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
    handler: lazy(() => import('@src/response/mw')),
    children: [
      {
        regular: routeRules.help,
        handler: processingLazy(() => import('@src/response/help'))
      },
      {
        regular: routeRules.login,
        handler: processingLazy(() => import('@src/response/login'), '正在准备登录，请稍候…')
      },
      {
        regular: routeRules.token,
        handler: processingLazy(() => import('@src/response/token'))
      },
      {
        regular: routeRules.bind,
        handler: processingLazy(() => import('@src/response/user'))
      },
      {
        regular: routeRules.stamina,
        handler: processingLazy(() => import('@src/response/stamina'))
      },
      {
        regular: routeRules.chardetail,
        handler: processingLazy(() => import('@src/response/chardetail'))
      },
      {
        regular: routeRules.explore,
        handler: processingLazy(() => import('@src/response/explore'))
      },
      {
        regular: routeRules.sign,
        handler: processingLazy(() => import('@src/response/sign'))
      },
      {
        regular: routeRules.tower,
        handler: processingLazy(() => import('@src/response/tower'))
      },
      // 暂停：全息战略尚未完成独立数据结构适配。
      // {
      //   regular: routeRules.challenge,
      //   handler: lazy(() => import('@src/response/challenge'))
      // },
      // 暂停：冥歌海墟尚未完成独立数据结构适配。
      // {
      //   regular: routeRules.slash,
      //   handler: lazy(() => import('@src/response/slash'))
      // },
      // 暂停：终焉矩阵尚未完成独立数据结构适配。
      // {
      //   regular: routeRules.matrix,
      //   handler: lazy(() => import('@src/response/matrix'))
      // },
      {
        regular: routeRules.charlist,
        handler: processingLazy(() => import('@src/response/charlist'))
      },
      {
        regular: routeRules.coin,
        handler: processingLazy(() => import('@src/response/coin'))
      },
      {
        regular: routeRules.announce,
        handler: processingLazy(() => import('@src/response/announce'))
      },
      // 暂停：兑换码仅靠网页正则猜测，不能保证有效。
      // {
      //   regular: routeRules.code,
      //   handler: lazy(() => import('@src/response/code'))
      // },
      // 暂停：抽卡缺少记录凭证接入，分页游标及终止保护不完整。
      // {
      //   regular: routeRules.gacha,
      //   handler: lazy(() => import('@src/response/gacha'))
      // },
      // 暂停：声骸列表固定第一页，没有翻页入口。
      // {
      //   regular: routeRules.echoList,
      //   handler: lazy(() => import('@src/response/echoList'))
      // },
      {
        regular: routeRules.calabash,
        handler: processingLazy(() => import('@src/response/calabash'))
      },
      {
        regular: routeRules.period,
        handler: processingLazy(() => import('@src/response/period'))
      },
      // 暂停：活动周期由固定日期推算，尚未对齐实时数据。
      // {
      //   regular: routeRules.calendar,
      //   handler: lazy(() => import('@src/response/calendar'))
      // },
      {
        regular: routeRules.pool,
        handler: processingLazy(() => import('@src/response/pool'))
      },
      {
        regular: routeRules.refresh,
        handler: processingLazy(() => import('@src/response/refresh'))
      }
      // 暂停：培养目标和技能起点写死，尚未支持实际养成参数。
      // {
      //   regular: routeRules.develop,
      //   handler: lazy(() => import('@src/response/develop'))
      // },
      // 暂停：激斗活动的数据映射尚未实测，先收起实验入口。
      // {
      //   regular: routeRules.poker,
      //   handler: lazy(() => import('@src/response/poker'))
      // },
      // 暂停：目前仅个人角色简易评分，没有群排行。
      // {
      //   regular: routeRules.rank,
      //   handler: lazy(() => import('@src/response/rank'))
      // },
      // 暂停：没有攻略来源，机制分支也没有对应内容。
      // {
      //   regular: routeRules.wiki,
      //   handler: lazy(() => import('@src/response/wiki'))
      // }
    ]
  }
]);
