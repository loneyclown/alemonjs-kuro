import router from './response/router';
import { closeLoginServer } from './model/login-server';

export default defineChildren({
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
