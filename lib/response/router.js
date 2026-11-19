import { routeRules } from '../constants/kuro.js';
import { defineRouter, lazy } from 'alemonjs';
import { processingLazy } from '../model/processing.js';

var router = defineRouter([
    {
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create'],
        handler: lazy(() => import('./mw.js')),
        children: [
            {
                regular: routeRules.help,
                handler: processingLazy(() => import('./help.js'))
            },
            {
                regular: routeRules.login,
                handler: processingLazy(() => import('./login.js'), '正在准备登录，请稍候…')
            },
            {
                regular: routeRules.token,
                handler: processingLazy(() => import('./token.js'))
            },
            {
                regular: routeRules.bind,
                handler: processingLazy(() => import('./user.js'))
            },
            {
                regular: routeRules.stamina,
                handler: processingLazy(() => import('./stamina.js'))
            },
            {
                regular: routeRules.chardetail,
                handler: processingLazy(() => import('./chardetail.js'))
            },
            {
                regular: routeRules.explore,
                handler: processingLazy(() => import('./explore.js'))
            },
            {
                regular: routeRules.sign,
                handler: processingLazy(() => import('./sign.js'))
            },
            {
                regular: routeRules.tower,
                handler: processingLazy(() => import('./tower.js'))
            },
            {
                regular: routeRules.matrix,
                handler: processingLazy(() => import('./matrix.js'))
            },
            {
                regular: routeRules.charlist,
                handler: processingLazy(() => import('./charlist.js'))
            },
            {
                regular: routeRules.coin,
                handler: processingLazy(() => import('./coin.js'))
            },
            {
                regular: routeRules.announce,
                handler: processingLazy(() => import('./announce.js'))
            },
            {
                regular: routeRules.calabash,
                handler: processingLazy(() => import('./calabash.js'))
            },
            {
                regular: routeRules.period,
                handler: processingLazy(() => import('./period.js'))
            },
            {
                regular: routeRules.pool,
                handler: processingLazy(() => import('./pool.js'))
            },
            {
                regular: routeRules.refresh,
                handler: processingLazy(() => import('./refresh.js'))
            }
        ]
    }
]);

export { router as default };
