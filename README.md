# 阿柠檬-库洛

必要环境 `nodejs` 、`redis` 、`chrome`

该扩展推荐使用`alemongo`或`alemondesk`作为生产环境

`alemongo` https://github.com/lemonade-lab/alemongo

`alemondesk` https://github.com/lemonade-lab/alemondesk

## 安装方式1: Git

### alemongo/alemondesk

- 地址

```sh
https://github.com/loneyclown/alemonjs-wuwa.git
```

若访问受限，可使用如下加速地址

```sh
https://ghfast.top/https://github.com/loneyclown/alemonjs-wuwa.git
```

- branch

```sh
release
```

### 本地

```sh
git clone -b release --depth=1 https://github.com/loneyclown/alemonjs-wuwa.git ./packages/alemonjs-wuwa
```

```sh
yarn install #开始模块化
```

- alemon.config.yaml

```yaml
apps:
  alemonjs-wuwa: true # 启动扩展
```

## 安装方式2: npm

```sh
yarn add alemonjs-wuwa -W
```

- alemon.config.yaml

```yaml
apps:
  alemonjs-wuwa: true # 启动扩展
```

## 免责声明

- 勿用于以盈利为目的的场景

- 代码开放，无需征得特殊同意，可任意使用。能备注来源最好，但不强求

- 图片与其他素材均来自于网络，仅供交流学习使用，如有侵权请联系，会立即删除

## 引用

|                              Nickname                               | Contribution |
| :-----------------------------------------------------------------: | ------------ |
| [XutheringWavesUID](https://github.com/Loping151/XutheringWavesUID) | API来源      |
