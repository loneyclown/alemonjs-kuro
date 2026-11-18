# 帮助页插画素材

基于用户提供的视觉参考，使用内置 imagegen 工具生成。指令、标题、分区、边框和胶囊由 HTML / CSS / SVG 绘制，不烘焙进插画。

- 背景：`src/assets/img/help/rover-background.png`
- 透明 2×2 图标图集：`src/assets/img/help/command-icons.png`，依次为练度、公告、刷新、账号。
- 其他图标复用仓库已有 PNG。生成原图已复制进项目，不依赖临时目录。
- 保留 `#mc` 指令前缀及 `#mc更多帮助` 导航，与当前已测试路由一致。

## 背景生成提示词

Create ONE production bitmap BACKGROUND ART asset for an editable Wuthering Waves chatbot help card, using the attached screenshot ONLY as a visual style and composition reference. Portrait near-square aspect 1.06:1, approximately 1600x1500. This is clean background art, NOT a completed UI screenshot. ABSOLUTELY NO TEXT, no lettering, no numbers, no logos, no interface panels, no buttons, no icons, no grid.
Match the reference's elegant charcoal slate / silver-blue / pale champagne gold anime game aesthetic closely. Upper 24%: atmospheric ruined futuristic Chinese city silhouettes, distant spires and pale silver sky. A beautiful adult female Wuthering Waves Rover-like anime adventurer, shoulder-length flowing BLACK hair, GOLDEN eyes, black and ivory outfit, subtle golden ornaments, chest-up profile on the TOP RIGHT facing left; her face near x80% y10%, shoulder ending y28%. Upper left is dark unobstructed negative space intended for editable title.
Middle 60% (y25%-85%): an extremely subdued dark charcoal, faintly textured smoky / brushed fabric field, almost flat, no subject or bright detail, deliberately empty for a legible command menu. NO hard rectangular shapes and NO artificial UI borders.
Bottom 16%: a cinematic silver-blue still lake, a few distant ruined towers and soft reflections, white lilies with delicate gold stamens framing the bottom RIGHT, subtle white petals at the bottom left. Keep the lower middle / lower left fairly dark for a small text footer. Crisp polished anime illustration, delicate paper grain and engraving textures, detailed but restrained, dramatic moonlit atmosphere. No red or teal color cast. The visual should look like the clean text-free artwork underlying the supplied reference, with no copied UI whatsoever.

## 图标图集生成提示词

Create ONE transparent-background icon ATLAS asset, SQUARE canvas with FOUR equal quadrants in a strict 2x2 grid. The attached reference is STYLE reference only. Each quadrant contains exactly one centered isolated premium fantasy game inventory icon with generous transparent margins, consistent scale, no overlap, no text, no letters, no numbers, no panel, no colored background. Genuine alpha transparency.
Top LEFT: a faceted champagne-gold crystalline twenty-sided polyhedral die / geometric crystal, thin gold edges, warm luminous core.
Top RIGHT: a small elegant ivory and slate-blue megaphone with champagne-gold metal rim and handle, facing left.
Bottom LEFT: a gold astronomical compass with an open dark-slate book at its base and a small luminous needle, representing data refresh.
Bottom RIGHT: a charcoal rectangular identity card tilted slightly, ornate thin gold frame with two pale gray human bust silhouettes, no writing.
Match the attached reference icons' hand-painted anime RPG polished gold metal and smoky glass style, delicate highlights, dimensional objects, restrained ivory/antique gold/blue-gray palette. All four icons must be completely within their quadrant, centered at 25%/25%,75%/25%,25%/75%,75%/75% of the full canvas. No shadows outside quadrant, no UI label. This is one reusable sprite atlas, not four independent outputs.

## 体力便笺背景（2026-11-17）

- 使用内置 imagegen 工具生成，项目素材保存为 `src/assets/img/stamina/lily-background.png`。
- 仅生成无文字插画背景；头像、标题、数值、边框、进度条和全部数据项由 HTML/CSS 渲染，资源图标优先使用接口返回的官方图片。
- 便笺按真实接口字段展示 `energyData`、`storeEnergyData`、`livenessData`、`battlePassData`、六项周常/挑战数据及 `activityData.title/endTime`、`serverTime`。
- `total=0` 不画进度条或显示为分母；`status!=0` 优先展示接口的 `value`，否则标记暂无数据；恢复时间缺失、倒计时过期均不能推断资源已满。删除了原先演示用的假周常/电台数值。
- `activityData.coreRewards` 的本次数值均为 `0/0`，不解读成活动已完成；内部用户编号、服务器标识、主题颜色和下载链接不放入便笺。

### 生成提示词

Create a single clean production background illustration for an editable Wuthering Waves bot DAILY STATUS card, landscape 4:3. NO TEXT, NO NUMBERS, NO LOGOS, NO CHARACTERS, NO UI, NO PANELS, NO BUTTONS. Elegant anime fantasy game visual style: midnight slate blue and charcoal at the top, delicate champagne gold fine ornamental arcs, atmospheric ruined towers far in the upper RIGHT, a cluster of beautiful WHITE LILIES with fine golden stamens in upper RIGHT at x80% y18%, white translucent silk ribbons and petals flowing delicately around outer edges. Upper LEFT third is dark uncluttered space for a user avatar and name to be overlaid in HTML. Entire middle and lower 70% is very subdued pale silver-lavender brushed texture, intentionally low contrast and empty for editable data cards. Outer corners have restrained white silk and thin golden light accents. Richly detailed edges and elegant fine texture but extremely calm central region. Harmonizes with the supplied existing bot aesthetic, cinematic moonlight, premium polished Chinese anime RPG UI background art. The actual content and all frames will be added in code. No gems, no square icons.

## 探索度卡片素材与数据口径（2026-11-17）

- 背景复用 `src/assets/img/stamina/lily-background.png`，本轮未生成新图片。
- 国家徽记使用实时接口的 `country.detailPageImage/homePageIcon`，子区域标记使用 `country.detailPageAreaPic`；地区侧边风景使用该地区首个带 `areaPic` 的真实子区域图片，并显示相应子区域名，避免把官方横幅 `detailPagePic` 误当风景。
- 真实响应当前为 4 个地区、51 个子区域，全部按接口顺序展示；不采用参考图中的示例名称或虚构进度。
- 接口未返回全地图总体进度。顶部明确显示“地区平均探索度”，为各地区 `countryProgress` 的等权算术均值，不宣称是按地图规模加权的官方总探索度。有地区进度缺失时不显示均值，真实 0% 则正常显示。
- `open=false` 不渲染响应里可能残留的地区；空槽跳过，异常或缺失百分比显示未知，不默认补零。子区域不截断，也不把已完成区域折叠隐藏。
