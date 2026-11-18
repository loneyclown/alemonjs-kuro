import router from './response/router';
import { closeLoginServer } from './model/login-server';
import { wavesExpose } from './model/expose';

export default defineChildren({
  register() {
    return {
      responseRouter: router,
      expose: wavesExpose
    };
  },
  onCreated() {
    logger.info('鸣潮助手 Server Done');
  },
  unMounted: closeLoginServer
});
