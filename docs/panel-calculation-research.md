# 角色面板数据核对

核对日期：2026-11-17。范围：角色属性和声骸汇总；本版按用户要求不做伤害计算、评分与排行榜。

## 上游实现

参考项目是 [Loping151/XutheringWavesUID](https://github.com/Loping151/XutheringWavesUID)。其[角色面板渲染器](https://github.com/Loping151/XutheringWavesUID/blob/main/XutheringWavesUID/wutheringwaves_charinfo/draw_char_card.py)分别使用 `calc.phantom_card` 展示声骸贡献、`calc.role_card` 展示角色总属性；二者不是同一层数据，不能重复累加。

当前 [`utils/calc/__init__.py`](https://github.com/Loping151/XutheringWavesUID/blob/main/XutheringWavesUID/utils/calc/__init__.py) 和 [`utils/calculate.py`](https://github.com/Loping151/XutheringWavesUID/blob/main/XutheringWavesUID/utils/calculate.py) 是代理，实际计算及评分从平台对应的 `waves_build` 加载。[资源下载器](https://github.com/Loping151/XutheringWavesUID/blob/main/XutheringWavesUID/utils/resource/download_all_resource.py)下载 `resource/build/{PLATFORM}/waves_build` 和 `resource/map/detail_json`。本项目无需为已由库街区返回的最终属性引入这套二进制和资源下载机制。

上游[武器升级代码](https://github.com/Loping151/XutheringWavesUID/blob/main/XutheringWavesUID/utils/ascension/weapon.py)使用 `weapon.stats[突破阶段][等级]`，按武器的 `isPercent` / `isRatio` 格式化；不是简单用 90 级数值按等级线性缩放。

## 本次真实接口核对及采用规则

数据来源：本地 `apiRoleDetail` 调用返回值，已核对真实角色响应，未把凭据或完整账号响应写入本文件。以下字段是本次实际响应提供，超过现有上游 Python 类型声明覆盖范围，不能仅凭旧类型断定不存在：

| 字段                                                | 语义                                                     | 展示及计算规则                                                                    |
| --------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `roleAttributeList`                                 | 角色最终面板属性                                         | 直接作为核心面板，不再叠加武器、声骸、套装或基础暴击/共鸣效率                     |
| `weaponData.mainPropList`                           | 当前等级武器主、副属性                                   | 直接展示，避免另拉成长表                                                          |
| `equipPhantomAddPropList`                           | 声骸对角色最终面板的实际贡献                             | 优先作为声骸属性汇总，已含百分比转为实际生命/攻击/防御后的结果及相关效果          |
| `equipPhantomAttributeList`                         | 声骸原始词条汇总，区分固定值和百分比，含 `key` / `valid` | 可作词条补充和官方有效属性提示，不能与最终贡献重复相加；不要把 `valid` 解释成评分 |
| `phantomData.equipPhantomList[].mainProps/subProps` | 单个声骸主、副词条                                       | 分别保留完整内容，合计同名词条时还必须区分固定值和百分比                          |

本次响应中，声骸原始生命是固定值 4560 和 80.5%，而最终生命贡献为 18004；这证明两组列表含义不同，直接将原始数值相加不能得到声骸实际面板贡献。原始治疗词条为 26.4%，最终声骸贡献为 36.4%，也不能把两者再次累加。

缺失最终列表时：只能展示可确认的原始声骸词条合计，并注明来源；角色核心面板显示未返回/待刷新，不能凭默认基础值拼出假面板。缺失百分比伤害属性也不能自动推断为官方确认的 0%。

## 本版边界

不接入上游评分模板、声骸等级字母、每声骸分数、伤害评估或排行。后续如需完全复现上游评分，应单独确认数据/算法授权、维护来源与版本兼容，不能用通用双暴分替代却标称上游一致。
