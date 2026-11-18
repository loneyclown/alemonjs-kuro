# 鸣潮助手 · alemonjs-kuro

基于 AlemonJS 的鸣潮机器人插件，提供库街区登录、实时便笺、角色练度与面板、探索度及游戏资讯查询。当前主要联调平台为 **QQ 官方机器人**，游戏数据来自库街区接口。

帮助页、练度总览、角色面板、体力便笺与探索度已重构；其余页面继续逐步优化。

## 安装到已有机器人

在 ALX 或其他支持 Git 应用的 AlemonJS 宿主中，填写：

| 项目          | 值                                                |
| ------------- | ------------------------------------------------- |
| 仓库          | `https://github.com/loneyclown/alemonjs-kuro.git` |
| 分支          | `release`                                         |
| 应用名        | `alemonjs-kuro`                                   |
| AlemonJS 宿主 | `^2.1.124`                                        |

`release` 是包含 `lib/` 和静态资源的可安装产物分支，`main` 用于源码开发。安装后在宿主启用应用，并使用宿主的 QQ、Redis 和截图浏览器配置。

通过包管理器安装时，在宿主机器人目录执行：

```sh
npm install "git+https://github.com/loneyclown/alemonjs-kuro.git#release"
```

如果宿主没有通过插件管理器自动启用应用，可在其 `alemon.config.yaml` 中合并：

```yaml
apps:
  alemonjs-kuro:
    enabled: true
    order: 10
```

保留宿主已有配置，重启后发送 `#mc帮助` 检查入口。

## 独立启动与本地开发

本机已在 Node.js **26.13.1**、Yarn **1.22.22**、AlemonJS **2.1.124** 下验证安装、构建和回归测试。图片渲染需要可用的 Chrome / Chromium / Edge，账号绑定和登录凭据需要 Redis。

```sh
git clone --branch main https://github.com/loneyclown/alemonjs-kuro.git
cd alemonjs-kuro
npm install -g yarn@1.22.22
yarn install
cp config.example.yaml alemon.config.yaml
```

编辑 `alemon.config.yaml`，填写自己的 QQ 应用和 Redis 配置。最小示例：

```yaml
login: qq-bot

qq-bot:
  app_id: '你的 QQ 机器人 AppID'
  secret: '你的 QQ 机器人 AppSecret'
  markdownToText: true

db:
  redis:
    host: '127.0.0.1'
    port: 6379
    db: 0
    password: ''

alemonjs-kuro:
  markdown:
    enabled: false
  login:
    host: '0.0.0.0'
    port: 8130
    # 手机无法访问自动选取的地址时再指定：
    # publicUrl: 'http://192.168.1.100:8130'
```

启动 Redis，确认 QQ 应用已具备所需消息权限，再执行：

```sh
yarn run dev
```

这个命令会独立启动机器人，不需要同时运行另一个宿主。接入已有宿主时，由宿主启动插件即可。

`alemon.config.yaml`、本地日志和构建产物已加入 Git 忽略规则。请勿把真实 AppSecret、验证码、Token 或专属登录链接提交到仓库。

## 登录与账号管理

1. 私聊机器人发送 `#mc登录`。
2. 在电脑打开消息中的链接，或用手机扫描二维码。
3. 输入手机号，完成滑块验证，获取并提交短信验证码。
4. 收到登录成功提示后，发送 `#mc查看`、`#mc体力` 或 `#mc练度`。

登录成功会绑定并激活该游戏账号。专属链接 **3 分钟有效**，重新获取会使旧链接失效；机器人重启后也需要重新获取链接。

登录页在第一次请求时启动，默认监听 `0.0.0.0:8130`，自动选择本机局域网地址。手机必须能访问这台电脑；二维码中的 `127.0.0.1` 或 `localhost` 只能在电脑本机使用。

自动地址不正确时，设置 `alemonjs-kuro.login.publicUrl` 为手机可访问的电脑地址或自己的 HTTPS 域名。该值只填写协议、主机和端口，不附加路径。域名反向代理需要把 `/kuro/login/` 转发到登录服务。

| 指令                         | 用途                         |
| ---------------------------- | ---------------------------- |
| `#mc查看`                    | 查看本人已绑定账号及当前账号 |
| `#mc绑定 123456789`          | 绑定 9 位特征码              |
| `#mc切换 123456789`          | 切换当前账号                 |
| `#mc解绑 123456789`          | 解绑本人账号                 |
| `#mc添加token <Token>,<DID>` | 私聊手动添加当前账号凭据     |
| `#mc删除token 123456789`     | 私聊删除本人指定账号凭据     |

也兼容私聊发送 `#mc登录 手机号 验证码`。通常直接使用网页登录即可。

凭据按 AlemonJS 的 `UserKey + UID` 隔离；仅绑定别人的 UID 不会获得其查询权限。旧版共享凭据不会自动迁移，升级后如提示无凭据，请重新登录。

## 常用功能

以下统一用 `#mc` 举例，也接受 `/mc`、`!mc` 等前缀。QQ 群聊中请按平台要求先 @机器人。

| 指令           | 内容                                                             |
| -------------- | ---------------------------------------------------------------- |
| `#mc帮助`      | 常用指令入口                                                     |
| `#mc更多帮助`  | 账号管理和补充指令                                               |
| `#mc体力`      | 波片、结晶单质、活跃度、电台等级与经验、周常及挑战进度、当前活动 |
| `#mc练度`      | 账号角色列表、等级、属性、星级与共鸣链                           |
| `#mc查询 今汐` | 指定角色的核心属性、武器、技能、声骸结算贡献及完整主副词条       |
| `#mc探索度`    | 各地区及子区域探索进度                                           |
| `#mc深塔`      | 逆境深塔数据                                                     |
| `#mc星声`      | 资源统计 / 月报                                                  |
| `#mc库洛币`    | 库街区积分信息                                                   |
| `#mc签到日历`  | 只读签到记录                                                     |
| `#mc公告`      | 游戏公告                                                         |
| `#mc卡池`      | 当前卡池信息                                                     |
| `#mc刷新面板`  | 请求刷新账号展示数据                                             |

`#mc卡片` 和不带角色名的 `#mc查询` 都是 `#mc练度` 的别名。带角色名时进入角色详情；完整角色名优先匹配，模糊匹配有多个结果时会列出候选。

角色核心属性直接使用库街区返回的最终结算值，包含角色自身、武器与声骸贡献，不重复叠加。当前版本不提供评分或伤害评估。

探索页顶部为已返回地区的**等权平均探索度**，不是官方全地图加权总进度。缺失、未公开或暂无数据的项目会明确标记，不自动填成 0。

### 尚待完善

- `#mc数据坞` 保留在更多帮助中，但数据映射仍有问题。
- 库洛币、深塔、星声、签到日历、公告、卡池的 UI 待统一。
- 签到执行、获取 Token 状态已关闭；签到日历及手动添加、删除凭据仍可用。
- 抽卡记录、兑换码、声骸列表、活动日历、全息战略、冥歌海墟、终焉矩阵、排行、培养、攻略和激斗牌局的独立入口暂未开放。体力便笺可以展示接口已返回的对应挑战摘要。

逐项状态见[维护清单](https://github.com/loneyclown/alemonjs-kuro/blob/main/docs/maintenance-backlog.md)。

## 可点击 Markdown 帮助

默认使用图片帮助。QQ 机器人开通自定义 Markdown 消息权限后，在运行目录的配置中修改：

```yaml
alemonjs-kuro:
  markdown:
    enabled: true

qq-bot:
  markdownToText: false
```

重启后，`#mc帮助` 和 `#mc更多帮助` 会发送带可点击指令的 Markdown。带角色名、UID 或 Token 的指令先填入输入框，补齐参数后再发送；群聊点击行为取决于 QQ 客户端。登录和凭据操作仍只允许私聊。

Markdown 发送失败时回退图片；其他平台继续使用图片帮助。将 `enabled` 改回 `false` 即恢复图片模式。

## Expose 插件能力

插件启用后会自动注册 AlemonJS Expose，供同一运行实例中的社区插件发现和调用，无需指定调用插件或配置白名单。

- 协议：`kuro.waves`
- 默认提供者：`alemonjs-kuro`（以宿主实际加载的应用名为准）
- 契约版本：`1`
- 展示名称：`鸣潮助手`；入门指令：`#mc帮助`

| 动作          | 输入                      | 返回内容                               |
| ------------- | ------------------------- | -------------------------------------- |
| `help`        | `null`                    | 当前开放指令及私聊标记；无需用户上下文 |
| `accounts`    | `{}`                      | 当前聊天用户的绑定账号列表与激活账号   |
| `base`        | `{}`                      | 当前账号基础信息                       |
| `daily`       | `{}`                      | 资源、电台、周常与活动摘要             |
| `roles`       | `{}`                      | 当前账号角色列表与练度                 |
| `character`   | `{ "character": "今汐" }` | 指定角色属性、武器、技能和声骸词条     |
| `exploration` | `{}`                      | 地区、子区域及收集项目进度             |
| `tower`       | `{}`                      | 逆境深塔难度、区域与楼层星数           |

`base`、`daily`、`roles`、`character`、`exploration`、`tower` 可额外传入 9 位字符串 `uid`，但仅能查询当前用户本人已绑定且拥有凭据的账号；不传则使用当前激活账号。`accounts` 的 `activeUid` 为空字符串时表示没有可用的激活账号。

在调用插件的消息或交互处理链中执行，例如：

```ts
import { Expose } from 'alemonjs';

export async function readMyDaily() {
  const client = Expose.create();
  const provider = client.list('kuro.waves').find(item => item.name === 'alemonjs-kuro');

  if (!provider || provider.version !== '1') {
    throw new Error('鸣潮助手未加载或契约版本不匹配');
  }

  return client.call(
    'kuro.waves',
    provider.name,
    'daily',
    {},
    {
      timeoutMs: 30000
    }
  );
}
```

完整输入、输出契约可通过 `Expose.create().schema()` 获取。查询返回结构化 JSON，不发送聊天消息或启动截图。框架结果 `ok: true` 后，还需要检查业务结果的 `status`：`ok`、`not_bound`、`not_logged_in` 或 `error`；成功时数据位于 `result.data.data`。

账号身份来自框架当前事件的 `UserKey`，不接受调用方传入的 `UserKey`、Token 或其他凭据。账号动作要求真实的应用调用上下文及聊天用户上下文；后台任务没有聊天用户时返回 `FORBIDDEN`，不会猜测账号。帮助和能力发现仍可在无用户上下文时使用。

所有动作均标记为 `effect: 'read'`，有输入输出运行时校验，不产生写动作监听通知。超时、取消或卸载后会停止等待，并在后续请求前检查取消状态；已经发出的底层请求仍沿用现有 HTTP 超时。接口不开放登录、短信、凭据、绑定/解绑、签到或发送消息等操作。

## 调试与检查

```sh
yarn run view          # 仅启动卡片预览服务
yarn run dev           # 启动实际机器人
yarn run lint          # 代码规范检查
yarn run build         # 构建至 lib/
yarn run test:security # 使用模拟凭据和本机临时 HTTP 服务，不发送真实短信
yarn run test:help     # 帮助入口及 Markdown
yarn run test:panel    # 角色面板及名字匹配
yarn run test:stamina  # 体力便笺
yarn run test:explore  # 探索度
yarn run test:expose   # Expose 注册、契约、账号隔离、超时与卸载
```

卡片预览地址：`http://localhost:8127/wuwa-help`。其他预览路由定义在 `jsxp.config.tsx`；预览使用示例数据，不能替代 QQ 联调。查看框架日志及终端异常时，不要转发带有账号凭据或登录链接的内容。

| 现象                  | 检查项                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------- |
| 找不到截图浏览器      | 安装 Chrome / Chromium / Edge；必要时设置 `JSXP_EXECUTABLE_PATH` 为浏览器可执行文件路径 |
| Redis 连接失败        | 检查服务、地址、端口及密码，保留原 Redis 数据以维持账号绑定                             |
| 手机打不开登录页      | 检查电脑 IP、网络连通、防火墙、8130 端口及 `publicUrl`                                  |
| 账号提示未登录        | 私聊重新发送 `#mc登录`，不要只绑定 UID                                                  |
| 角色或探索数据不完整  | 确认库街区已开放对应展示数据，再发送 `#mc刷新面板`                                      |
| Markdown 变成普通文本 | 检查开关、`qq-bot.markdownToText: false` 和 QQ 自定义 Markdown 权限                     |

## 构建与发布

日常修改在 `main`，安装与更新使用 `release`。源码中的版本字段不决定自动发布版本；`alemonc publish` 按已有正式 Git 标签计算下一个版本。

```sh
npm install -g alemonjs yarn@1.22.22

git add <本次要发布的文件>
git commit -m "描述本次修改"
alemonc publish --dry-run
alemonc publish
git push origin main
```

发布工具会从**当前源码 commit** 创建临时隔离空间、安装依赖、执行构建，按打包白名单生成产物，再原子推送 `release` 分支和 `vX.Y.Z` 标签。未提交、暂存中和未跟踪的修改都不会参加构建。

该命令发布到 **GitHub 分支与标签，不上传 npm，也不自动推送 main**。发布前完成检查和源码提交，发布后再推送源码。当前打包范围为 `lib/`、`package.json` 和 README；真实运行配置及日志不进入发布包。

## 来源与素材

项目参考了 [dsh-plugin-waves](https://github.com/Loping151/dsh-plugin-waves) 和 [XutheringWavesUID](https://github.com/Loping151/XutheringWavesUID)。游戏名称、官方图片及其他素材的权利归相关权利人所有；部分背景与图标由 imagegen 生成，详见[素材记录](https://github.com/loneyclown/alemonjs-kuro/blob/main/docs/help-art-assets.md)。

沿用原项目的交流学习用途约定，不用于以盈利为目的的场景。引用上游代码或素材时，请遵守各自的授权条件；如有素材权利问题，请联系维护者处理。
