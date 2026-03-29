# 编程必要原则

## 代码分层

1. 交互层（和框架交互的内容）
2. 应用层（加并发锁，完整的功能和良好的返回值设计）
3. 模型层（游戏模型，如战斗模型，背包模型等）
4. 数据层（数据库模型，不可直接写硬编码）

## 代码原则

1. 所有的数字、字符串等，写成常量。不可直接使用。

```ts
// ✖️
let a = 1;
if (a > 2) {
}
// ✅不能直接用数字
let a = 1;
let b = 2;
if (a > b) {
}
```

2. 定义完整的数据类型提示

3. 除了系统级配置，全部变量都是小驼峰命名。而系统级配置，必须大写下划线命名

```ts
// ✖️
const show_case = 1;
// ✅
const showCase = 2;
// ✅
const SHOW_CASE = 3;
```

4. 能不用class的不用class去写模块

```ts
// ✖️
class a {
  getData() {}
}
// ✅
const getData = () => {};
```

5. 数据库默认删除都不是物理删除，除非特殊说明该数据可丢弃

```ts
// ✖️
modal.destroy({});
// ✅
modal.update({ delete_at: new Date() });
```

6. 关于redis的处理都必须写到 src/model/keys.ts

7. 模型关联不能直接字符串，需要进行引用

```ts
// ✖️
feedbacks.generate({
  categoryId: {
    type: DataTypes.BIGINT,
    field: 'category_id',
    allowNull: false,
    comment: '反馈分类ID',
    references: {
      model: 'feedback_categories',
      key: 'id'
    }
  }
});
// ✅
import feedback_categories from './feedback_categories.ts';
feedbacks.generate({
  categoryId: {
    type: DataTypes.BIGINT,
    field: 'category_id',
    allowNull: false,
    comment: '反馈分类ID',
    references: {
      model: feedback_categories,
      key: 'id'
    }
  }
});
```

8. 关于如何建立关联

```ts
import emails from './emails';
import admins from './admins';
// 使用 belongsTo
emails.belongsTo(admins, {
  foreignKey: 'aid', // emails 的外键
  targetKey: 'id' // admins 的主键
});
```

9. 尽量使用Array.join('\n') 处理换行

```ts
const createActivityMessage = (item: { title: string; intro: string; award: string; limit: number; start: string; end: string; detail: string }) => {
  return [
    `活动名称: ${item.title}`,
    `活动简介: ${item.intro}`,
    `奖励: ${item.award}`,
    `等级限制: ${item.limit}`,
    `活动持续时间: ${item.start}-${item.end}`,
    `活动详情: ${item.detail}`
  ].join('\n');
};
```

10. 时间读取直接 Date.now()

```ts
// ✖️
new Date().getTime();
// ✅
Date.now();
```

11. 一般文件名命名为小驼峰命名，组件使用大驼峰命名

`myEmail/res.ts`

`Email/App.tsx`
