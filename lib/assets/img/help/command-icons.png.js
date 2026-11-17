const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../command-icons-C0YuU6ka.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
