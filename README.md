# 阿柠檬-库洛

## 本地开发

项目原开发环境为 Node.js 22、Yarn 1.22.22。已在 Node.js 26.13.1 验证依赖安装、构建、
类型检查、Lint 和安全回归。用户已完成登录和主要查询的 QQ 实测，详见下方功能范围。

```sh
yarn install
yarn run view          # 卡片预览：http://localhost:8127/wuwa-help
yarn run dev           # 独立机器人，需要配置 QQ 等平台和 Redis
yarn run test:security # 凭据隔离、删除权限和日志回归检查，无需连接 QQ 或 Redis
yarn run lint
yarn run build
```

凭据及 UID 绑定按 AlemonJS 的跨平台用户标识 `UserKey` 隔离。旧版本的绑定需要重新绑定，
旧的共享凭据不自动迁移，请私聊机器人重新登录或添加自己的 Token。
登录参数和 Token 操作仅在私聊中接受；获取 Token 状态的指令入口已关闭。

## 登录

启动机器人后，私聊发送 `#mc登录`，扫描专属二维码或在电脑打开同一条消息里的链接。
在网页输入手机号，完成滑块验证、获取短信，再提交登录；保存成功后网页和机器人会提示，
随后可发送 `#mc体力`、`#mc查询 今汐`。登录链接 3 分钟有效，重新发送登录指令会撤销旧链接。
也支持在私聊提交已有验证码：`#mc登录 手机号 验证码`，兼容逗号分隔。

登录 HTTP 服务在第一次请求登录链接时启动，默认监听 `0.0.0.0:8130`，自动选取本机局域网 IPv4。
手机扫码需与电脑网络互通；二维码地址中的 `127.0.0.1` / `localhost` 无法用于另一台手机。
如果自动选到了虚拟网卡，或使用域名 / 内网穿透，在 `alemon.config.yaml` 中指定：

```yaml
alemonjs-kuro:
  login:
    host: '0.0.0.0'
    port: 8130
    publicUrl: 'http://192.168.1.100:8130' # 替换为手机能访问的电脑IP，或自己的HTTPS域名
```

修改配置后重启机器人。`publicUrl` 只填地址，不附加路径；反向代理需转发 `/kuro/login/` 到该端口。
Windows 防火墙需允许该服务在所用网络接收连接。公网部署使用 HTTPS，并由自己托管登录页。
验证码和 Token 不写入插件日志；专属链接本身是临时凭证，请勿转发。

登录会话仅保存在当前进程，重启后需重新获取链接；长期凭据仍按 `UserKey + UID` 保存至 Redis。
回归检查使用模拟库街区响应和本机临时 HTTP 端口，不发送真实短信、不使用真实账号。

## Markdown 帮助

公共模块 `src/model/markdown.ts` 使用 AlemonJS 原生 Markdown 指令组件。
默认仍发送图片帮助；在机器人运行目录的 `alemon.config.yaml` 中合并以下配置即可启用：

```yaml
alemonjs-kuro:
  markdown:
    enabled: true

qq-bot:
  markdownToText: false
```

保留已有 QQ 凭据、Redis 和登录页配置；完整开关示例见 [config.example.yaml](config.example.yaml)。
QQ 机器人需要自定义 Markdown 消息权限。若 `markdownToText` 仍为 `true`，机器人会提示修正配置。
开启后 `#mc帮助` 与 `#mc更多帮助` 使用同一份指令清单生成可点击的 Markdown，不启动图片渲染。
普通查询在单聊可点击直接发送；带角色名、UID、Token 的指令只填入输入框，补齐参数后发送。
群聊的内联指令依 QQ 客户端行为填入输入框。登录和凭据相关操作仍仅限私聊。
Markdown 发送失败时回退到图片帮助；其他平台目前继续使用图片。
将 `enabled` 改回 `false` 即恢复图片模式，不影响登录或其他查询卡片。

## 当前功能范围

`#mc帮助` 展示 12 个常用入口，`#mc更多帮助` 展示账号管理和补充指令。
使用 `yarn run test:help` 构建并检查帮助示例与路由是否一致。
用户已实测登录、账号列表、体力、卡片、练度、角色面板、探索度、库洛币、深塔、月报、签到日历、刷新面板、公告、卡池。
`#mc卡片`、`#mc查询`（无角色名）已统一为 `#mc练度` 的别名，共用角色练度总览，UI 与帮助页保持一致。带角色名的 `#mc查询 今汐` 仍查看详细面板。
数据坞有响应但数据有误；其他业务卡片 UI 继续待优化。
签到执行和 Token 状态查询已关闭，签到日历仍开放。详细结果及后续工作见 [待优化清单](docs/maintenance-backlog.md)。

下列入口已暂停或关闭，修复并验证后再决定是否开放：

| 暂停功能                     | 核对结果 / 恢复条件                                                 |
| ---------------------------- | ------------------------------------------------------------------- |
| 签到执行                     | 用户实测存在问题，当前仅保留只读签到日历                            |
| 获取 Token 状态              | 功能意义不大，入口关闭；保留添加和删除凭据                          |
| 抽卡记录                     | 仅用 UID 查询；需补齐记录凭证接入、正确游标和分页终止保护           |
| 兑换码                       | 从整页正则猜测字符串，无法保证是有效兑换码                          |
| 声骸列表                     | 固定第一页；需补齐分页及避免全角色串行请求                          |
| 活动日历                     | 挑战周期依赖固定日期和 28 天推算；需核对实时周期                    |
| 全息战略、冥歌海墟、终焉矩阵 | 共用深塔响应类型和渲染器；需分别核对真实响应并适配                  |
| 群练度排行                   | 实际只计算当前账号角色的简易分数，没有群排行                        |
| 角色培养                     | 所有角色目标固定 90 级，技能起点固定 1 级，没有读取指令中的目标参数 |
| Wiki / 攻略                  | 实际读取自己的角色详情，没有攻略数据；机制查询分支没有对应展示      |
| 激斗牌局                     | 活动数据映射尚未经过真实账号验证，暂收起实验入口                    |

`alemonx` https://github.com/lemonade-lab/alemonx/releases

`alemongo` https://github.com/lemonade-lab/alemongo

`alemondesk` https://github.com/lemonade-lab/alemondesk

### alemongo/alemondesk

- 地址

```sh
https://github.com/loneyclown/alemonjs-kuro.git
```

- branch

```sh
release
```

## 免责声明

- 勿用于以盈利为目的的场景

- 代码开放，无需征得特殊同意，可任意使用。能备注来源最好，但不强求

- 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系，会立即删除

## 引用

|                              Nickname                               | Contribution |
| :-----------------------------------------------------------------: | ------------ |
| [XutheringWavesUID](https://github.com/Loping151/XutheringWavesUID) | API来源      |
