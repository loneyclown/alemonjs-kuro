const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../lily-background-BSj5IvTm.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
