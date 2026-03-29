import { routeRules } from '../constants/kuro.js';
import { defineRouter, lazy } from 'alemonjs';

var router = defineRouter([
    {
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
        handler: lazy(() => import('./mw.js')),
        children: [
            {
                regular: routeRules.help,
                handler: lazy(() => import('./help.js'))
            },
            {
                regular: routeRules.login,
                handler: lazy(() => import('./login.js'))
            },
            {
                regular: routeRules.token,
                handler: lazy(() => import('./token.js'))
            },
            {
                regular: routeRules.bind,
                handler: lazy(() => import('./user.js'))
            },
            {
                regular: routeRules.stamina,
                handler: lazy(() => import('./stamina.js'))
            },
            {
                regular: routeRules.roleinfo,
                handler: lazy(() => import('./roleinfo.js'))
            },
            {
                regular: routeRules.explore,
                handler: lazy(() => import('./explore.js'))
            },
            {
                regular: routeRules.sign,
                handler: lazy(() => import('./sign.js'))
            },
            {
                regular: routeRules.tower,
                handler: lazy(() => import('./tower.js'))
            },
            {
                regular: routeRules.challenge,
                handler: lazy(() => import('./challenge.js'))
            },
            {
                regular: routeRules.slash,
                handler: lazy(() => import('./slash.js'))
            },
            {
                regular: routeRules.matrix,
                handler: lazy(() => import('./matrix.js'))
            },
            {
                regular: routeRules.charlist,
                handler: lazy(() => import('./charlist.js'))
            },
            {
                regular: routeRules.coin,
                handler: lazy(() => import('./coin.js'))
            },
            {
                regular: routeRules.announce,
                handler: lazy(() => import('./announce.js'))
            },
            {
                regular: routeRules.code,
                handler: lazy(() => import('./code.js'))
            },
            {
                regular: routeRules.gacha,
                handler: lazy(() => import('./gacha.js'))
            },
            {
                regular: routeRules.echoList,
                handler: lazy(() => import('./echoList.js'))
            },
            {
                regular: routeRules.calabash,
                handler: lazy(() => import('./calabash.js'))
            },
            {
                regular: routeRules.period,
                handler: lazy(() => import('./period.js'))
            },
            {
                regular: routeRules.calendar,
                handler: lazy(() => import('./calendar.js'))
            },
            {
                regular: routeRules.pool,
                handler: lazy(() => import('./pool.js'))
            },
            {
                regular: routeRules.refresh,
                handler: lazy(() => import('./refresh.js'))
            },
            {
                regular: routeRules.develop,
                handler: lazy(() => import('./develop.js'))
            },
            {
                regular: routeRules.poker,
                handler: lazy(() => import('./poker.js'))
            },
            {
                regular: routeRules.rank,
                handler: lazy(() => import('./rank.js'))
            },
            {
                regular: routeRules.wiki,
                handler: lazy(() => import('./wiki.js'))
            }
        ]
    }
]);

export { router as default };
