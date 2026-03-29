const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../角色-CEbsr8Ue.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
