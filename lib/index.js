import router from './response/router.js';
import { closeLoginServer } from './model/login-server.js';

var index = defineChildren({
    register() {
        return {
            responseRouter: router
        };
    },
    onCreated() {
        logger.info('鸣潮助手 Server Done');
    },
    unMounted: closeLoginServer
});

export { index as default };
