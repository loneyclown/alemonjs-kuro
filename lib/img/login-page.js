import { GEETEST_CAPTCHA_ID } from '../constants/kuro.js';

const LOGIN_PAGE = String.raw `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="referrer" content="no-referrer"><title>鸣潮助手 · 登录</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#111d23;color:#eef3f1;font-family:system-ui,"Microsoft YaHei",sans-serif;min-height:100vh;padding:36px 20px}
main{max-width:430px;margin:5vh auto;border-top:3px solid #e5c78b;padding-top:24px}.eyebrow{color:#e5c78b;font-size:12px;letter-spacing:3px}
h1{font-size:30px;margin:12px 0}p{color:#a8b6bc;font-size:14px;line-height:1.8}label{display:block;margin-top:24px;font-size:14px}
input{width:100%;margin-top:9px;background:#1b2b33;color:#fff;border:1px solid #48606b;border-radius:6px;padding:14px;font:inherit;min-width:0}
input:focus{outline:2px solid #e5c78b;outline-offset:2px}.code{display:flex;gap:10px}.code input{flex:1}
button{border:0;border-radius:6px;background:#e5c78b;color:#152329;padding:14px 16px;font:inherit;font-weight:700;cursor:pointer}
button:disabled{opacity:.5;cursor:wait}.code button{margin-top:9px;min-width:125px;font-size:14px}#submit{width:100%;margin-top:24px}
#status{min-height:50px;margin:18px 0;color:#e5c78b}#status[data-tone="error"]{color:#ffb2a5}small{display:block;color:#91a3aa;line-height:1.9}
</style></head><body><main>
<div class="eyebrow">WUTHERING WAVES</div><h1>登录鸣潮助手</h1>
<p>完成短信验证后，账号将绑定到发起登录的聊天用户。</p>
<form id="form">
<label for="mobile">手机号</label>
<input id="mobile" name="mobile" type="tel" inputmode="numeric" autocomplete="tel" maxlength="11"
pattern="1[3-9][0-9]{9}" placeholder="请输入中国大陆手机号" required>
<label for="code">短信验证码</label><div class="code">
<input id="code" name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" placeholder="6 位验证码" required>
<button id="sms" type="button" disabled>验证组件加载中</button></div>
<button id="submit" type="submit">登录并绑定账号</button>
</form><p id="status" role="status" aria-live="polite">链接 3 分钟有效，请勿转发给他人。</p>
<small>验证码仅用于当前机器人登录库街区。提交成功后返回聊天发送 #mc体力。<br>链接失效或打不开？请私聊机器人重新发送 #mc登录。</small>
</main><script>
const phone = document.getElementById('mobile');
const sms = document.getElementById('sms');
const submit = document.getElementById('submit');
const statusText = document.getElementById('status');
const form = document.getElementById('form');
let captcha, sending = false, submitting = false, done = false, countdown = 0, captchaPhone = '';
function show(message, error) { statusText.textContent = message; statusText.dataset.tone = error ? 'error' : ''; }
function updateSms() {
  sms.disabled = !captcha || sending || submitting || done || countdown > 0;
  sms.textContent = countdown > 0 ? countdown + '秒后重试' : '获取验证码';
}
async function post(action, body) {
  const response = await fetch(location.pathname.replace(/\/$/, '') + '/' + action, {
    method:'POST', cache:'no-store', credentials:'omit', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.msg || '请求失败，请重试');
  return data;
}
sms.addEventListener('click', function () {
  if (!/^1[3-9][0-9]{9}$/.test(phone.value)) { show('请输入正确的手机号', true); phone.focus(); return; }
  captchaPhone = phone.value;
  captcha.showBox();
});
form.addEventListener('submit', async function (event) {
  event.preventDefault();
  if (submitting || done) return;
  submitting = true; submit.disabled = true; updateSms(); show('正在登录并保存账号，请稍候…');
  try {
    const result = await post('submit', { mobile:phone.value, code:document.getElementById('code').value });
    done = true; form.hidden = true; show('登录成功！特征码：' + result.uid + '。请返回聊天发送 #mc体力。');
  } catch (error) { show(error.message, true); }
  finally { submitting = false; submit.disabled = done; updateSms(); }
});
function initialize() {
  window.initGeetest4({ captchaId:'${GEETEST_CAPTCHA_ID}', product:'bind' }, function (instance) {
    instance.onReady(function () { captcha = instance; updateSms(); });
    instance.onError(function () { show('滑块验证未能加载，请刷新页面重试', true); });
    instance.onSuccess(async function () {
      const result = instance.getValidate();
      if (!result || sending) return;
      sending = true; updateSms(); show('正在发送验证码…');
      try {
        await post('sms', { mobile:captchaPhone, captcha:result });
        countdown = 60; show('验证码已发送，请使用刚才的手机号完成登录。');
        const timer = setInterval(function () { countdown--; updateSms(); if (countdown <= 0) clearInterval(timer); }, 1000);
      } catch (error) { show(error.message, true); }
      finally { sending = false; instance.reset(); updateSms(); }
    });
  });
}
function loadCaptcha(index) {
  const sources = ['https://static.geetest.com/v4/gt4.js','https://static.geevisit.com/v4/gt4.js'];
  if (index >= sources.length) { show('验证服务暂不可用，请检查网络后刷新页面', true); return; }
  const script = document.createElement('script'); script.src = sources[index];
  script.onload = function () { if (window.initGeetest4) initialize(); else loadCaptcha(index + 1); };
  script.onerror = function () { loadCaptcha(index + 1); }; document.head.appendChild(script);
}
loadCaptcha(0);
</script></body></html>`;

export { LOGIN_PAGE };
