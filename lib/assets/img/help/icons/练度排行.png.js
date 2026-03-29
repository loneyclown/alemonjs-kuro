const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../../../练度排行-Ksy-Z1Nb.png', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
