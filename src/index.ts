import router from './response/router';

export default defineChildren({
  register() {
    return {
      responseRouter: router
    };
  },
  onCreated() {
    logger.info('鸣潮助手 Server Done');
  }
});
