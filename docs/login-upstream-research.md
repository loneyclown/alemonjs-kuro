# 登录上游核对

核查日期：2026-11-17（UTC+8）。仅检查公开源码与提交记录，未读取或使用任何账号凭据，也未执行真实登录。

实施更新：本笔记的“本地缺失”描述是修复前的快照。当前项目已在 `src/model/login-server.ts`、
`src/model/login.ts` 和 `src/img/login-page.ts` 补齐专属网页会话、极验短信获取、回传保存与通知，
并修正 `/user/sdkLogin` 请求体中的 `devCode`。已通过本机 HTTP / 浏览器模拟登录回归和真实极验组件初始化；
真实短信及账号登录仍由用户验证。配置和操作见 README 的“登录”章节。

## 结论

- `dsh-plugin-waves` 不是登录实现的唯一来源：它在安装和更新时动态获取 `XutheringWavesUID`，具体登录行为应以该上游仓库的登录模块为准。
- 没有发现 DSH 主仓近期单独替换登录流程的证据。最新提交处理的是配置页；二维码兼容文件自首次提交后没有更新。
- 本项目的二维码编码固定网页地址 `https://www.kurobbs.com/mc`，本地没有对应扫码会话、状态轮询或凭据回传。因此扫码打开网页并不能把网页登录态写入机器人；不能把它当作扫码授权登录实现。
- `XutheringWavesUID` 当前实现实际使用带短期会话的网页登录桥接：二维码指向登录服务的会话页面，页面收集手机号和短信验证码后，再由服务向机器人交付登录结果。本地遗漏了这一整段流程。

## 已确认的 DSH 源码事实

| 项目           | 核查结果                                                                                                                                                                   | 原始来源                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 当前主仓版本   | `main` 为 `c371a8782969160b0dfc217c27476a5de747c3bd`，提交时间 2026-10-23 19:48:57 +08:00，主题为“配置页移至插件页”                                                        | [提交](https://github.com/Loping151/dsh-plugin-waves/commit/c371a8782969160b0dfc217c27476a5de747c3bd)                                                                                                                     |
| 二维码兼容函数 | `get_qrcode_base64(url, path, bot_id)` 仅把调用者传入的 URL 编码为 PNG 字节；不创建登录会话、不轮询授权结果                                                                | [qrlogin.py](https://github.com/Loping151/dsh-plugin-waves/blob/c371a8782969160b0dfc217c27476a5de747c3bd/service/rover/utils/cookie_manager/qrlogin.py)                                                                   |
| 二维码文件历史 | GitHub 文件提交历史仅列出首次提交 `ccc48b069a04e6780f8321d258e147913627de4b`，2026-08-20 00:03:31 +08:00                                                                   | [文件历史](https://github.com/Loping151/dsh-plugin-waves/commits/main/service/rover/utils/cookie_manager/qrlogin.py)                                                                                                      |
| 兼容映射       | `utils.cookie_manager.qrlogin` 映射至 `rover.utils.cookie_manager.qrlogin`，目的是供上游模块调用二维码生成工具                                                             | [compat.py](https://github.com/Loping151/dsh-plugin-waves/blob/c371a8782969160b0dfc217c27476a5de747c3bd/service/rover/compat.py)                                                                                          |
| 运行时补丁     | 当前 `hooks.py` 未发现登录、扫码会话或验证码流程的替换补丁；其历史最近一次为 `8b7821d52fabb9d8089011a44ed86d0b89dbc8d2`，2026-09-01 19:24:46 +08:00                        | [hooks.py](https://github.com/Loping151/dsh-plugin-waves/blob/c371a8782969160b0dfc217c27476a5de747c3bd/service/rover/hooks.py)、[历史](https://github.com/Loping151/dsh-plugin-waves/commits/main/service/rover/hooks.py) |
| 上游获取方式   | 首次通过 `git clone --depth 1` 获取 `XutheringWavesUID`、`RoverSign`、`ScoreEcho`；之后执行 `git pull --ff-only`。GitHub 网络失败时切换 CNB 镜像，未固定登录实现的提交版本 | [update_plugins.py](https://github.com/Loping151/dsh-plugin-waves/blob/c371a8782969160b0dfc217c27476a5de747c3bd/service/tools/update_plugins.py)                                                                          |
| 使用语义       | README 说明 `ww登录` 保存登录态，与库街区登录冲突；仅绑定特征码仍需提供有效库街区 Token。它还明确声明单人使用、没有用户身份概念                                            | [README](https://github.com/Loping151/dsh-plugin-waves/blob/c371a8782969160b0dfc217c27476a5de747c3bd/README.md)                                                                                                           |

## 真正的登录流程来自 XutheringWavesUID

核查快照：`main` 的 `a17e3154a89f63cb8ce2ef176b07880613d33582`。

| 项目             | 源码行为                                                                                                                                                                                                            | 原始来源                                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 登录服务选择     | 读取 `WavesLoginUrl` / `WavesLoginUrlSelf`，区分本地服务和外置登录服务                                                                                                                                              | [login.py](https://github.com/Loping151/XutheringWavesUID/blob/a17e3154a89f63cb8ce2ef176b07880613d33582/XutheringWavesUID/wutheringwaves_login/login.py)                     |
| 本地网页会话     | 创建约 3 分钟有效的随机授权链接 `/waves/i/{auth}`，后台轮询页面提交的手机号和验证码，`/waves/login` 将表单数据回写会话缓存。新请求会撤销该用户的旧会话                                                              | [login.py](https://github.com/Loping151/XutheringWavesUID/blob/a17e3154a89f63cb8ce2ef176b07880613d33582/XutheringWavesUID/wutheringwaves_login/login.py)                     |
| 外置网页会话     | `POST /waves/token` 创建会话，展示 `/waves/i/{token}`，轮询 `/waves/get` 取得 `ck`、`did` 并保存登录态                                                                                                              | [login.py](https://github.com/Loping151/XutheringWavesUID/blob/a17e3154a89f63cb8ce2ef176b07880613d33582/XutheringWavesUID/wutheringwaves_login/login.py)                     |
| 手机验证码接口   | 向库街区 `/user/sdkLogin` 提交 `mobile`、`code`、`devCode`。本项目目前只在请求头设置 `devCode`，表单体缺少该字段                                                                                                    | [requests.py](https://github.com/Loping151/XutheringWavesUID/blob/a17e3154a89f63cb8ce2ef176b07880613d33582/XutheringWavesUID/utils/api/requests.py)、本地 `src/model/api.ts` |
| 页面获取短信     | 页面加载 Geetest V4，用户完成验证后向 `/user/getSmsCodeForH5` 提交 `mobile` 和 `geeTestData`；随后以 JSON `{auth,mobile,code}` 提交到登录服务的 `/waves/login`。这是浏览器中的短信登录桥接，不是库街区 App 扫码授权 | [index.html](https://github.com/Loping151/XutheringWavesUID/blob/a17e3154a89f63cb8ce2ef176b07880613d33582/XutheringWavesUID/templates/index.html)                            |
| 直接短信指令     | 上游指令入口支持逗号分隔手机号和验证码；本地处理器采用空格分隔，需要保留本地指令习惯或显式兼容                                                                                                                      | [登录入口](https://github.com/Loping151/XutheringWavesUID/blob/a17e3154a89f63cb8ce2ef176b07880613d33582/XutheringWavesUID/wutheringwaves_login/__init__.py)                  |
| 最近登录文件修改 | `1163738674ae8a1e084fce1ed4623821009e9a56`，2026-07-10 17:04:29 +08:00，把登录后拉取抽卡、刷新面板等工作移到登录超时范围之外                                                                                        | [提交](https://github.com/Loping151/XutheringWavesUID/commit/1163738674ae8a1e084fce1ed4623821009e9a56)                                                                       |
| 网页路径历史修复 | 2026-05-01 的 `42fdb21`、`557771c` 涉及登录页面 404 修复；说明上游维护的是自身桥接页面，不是直接打开库街区首页                                                                                                      | [文件历史](https://github.com/Loping151/XutheringWavesUID/commits/main/XutheringWavesUID/wutheringwaves_login/login.py)                                                      |

这里能确认的是“当前上游具有完整桥接流程，而本地没有”。由于没有本项目当初参考的上游版本号，不能据此认定所有差异都是本地开发之后才新增，也不能保证公共登录服务当前可达。

配置中的 `WavesQRLogin` 默认关闭，语义是把登录链接改成二维码；`WavesLoginUrl` 默认为空，`WavesLoginUrlSelf` 默认关闭。自建页面必须使用手机能够访问的服务地址，本机 `localhost` 地址在手机上指向手机自身。来源：[config_default.py](https://github.com/Loping151/XutheringWavesUID/blob/a17e3154a89f63cb8ce2ef176b07880613d33582/XutheringWavesUID/wutheringwaves_config/config_default.py)、上表 `get_url()` 的源码。

## 本地对照与移植边界

当前 `src/img/views/LoginHelpCard.tsx` 的 `LOGIN_URL` 是固定库街区网页，`generateQrDataUrl()` 仅生成该地址的二维码。
`src/response/login.ts` 无参数时返回这张说明卡，有参数时才提交手机号与验证码给 `apiLogin()`。
`src/model/api.ts` 的登录接口为 `/user/sdkLogin`；没有扫码会话创建、轮询和自动保存授权结果的链路。

上述差异可从本地源码直接确认。仅凭用户扫码后打不开或无法完成登录，不能进一步断言库街区网页本身故障，或断言手机号验证码接口已经失效；两者需要分别验证。

后续若补真正扫码登录，应参考 `XutheringWavesUID` 的完整流程及其依赖，而非只复制 DSH 的二维码图片函数。账号绑定、Token、DID、BAT 的保存必须继续使用本项目已修复的 `UserKey + UID` 隔离；不要复制 DSH 的单人共享身份语义。
