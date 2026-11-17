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
                regular: routeRules.chardetail,
                handler: lazy(() => import('./chardetail.js'))
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
                regular: routeRules.calabash,
                handler: lazy(() => import('./calabash.js'))
            },
            {
                regular: routeRules.period,
                handler: lazy(() => import('./period.js'))
            },
            {
                regular: routeRules.pool,
                handler: lazy(() => import('./pool.js'))
            },
            {
                regular: routeRules.refresh,
                handler: lazy(() => import('./refresh.js'))
            }
        ]
    }
]);

export { router as default };
