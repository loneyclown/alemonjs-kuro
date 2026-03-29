const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../声骸介绍-3YqAT8XG.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
