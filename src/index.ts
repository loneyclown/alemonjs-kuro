import router from './response/router';

export default defineChildren({
  register() {
    return {
      responseRouter: router
    };
  },
  onCreated() {
    logger.info('Mihoyo API Server Done');
  }
});
