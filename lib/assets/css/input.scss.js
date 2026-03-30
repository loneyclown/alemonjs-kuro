const reg = ['win32'].includes(process.platform) ? /^file:\/\/\// : /^file:\/\// ;
const fileUrl = new URL('../input.scss-D06e9gqf.css', import.meta.url).href.replace(reg, '');

export { fileUrl as default };
