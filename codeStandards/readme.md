

组件prop用到接口调用的数据，组件使用加渲染条件v-if

## `代码规范`

任何代码改了都要测一下,从头走一遍流程

## 梳理流程
- 是否已有参考的页面或代码
- 逻辑流程
postman造数据,熟悉业务流程，熟悉组件参数定义明确传值
接口暴露
测试工具、开发测试工具

## 怎样造数据
数据重复利用
产品造数据
测试造数据
自己造数据
- 可以造
- 无法造
## 代码验证及走流程
```
在写代码时，或在写完后要对数组的使用和对象的使用进行默认值或存在性的检查,包括其属性的默认值或存在性的检查
```

`表达式：存在性校验`：row.Rldays， row.Rqdays
row.Yfdays = row.Rldays - row.Rqdays - row.Fyfdays
  row.Yfdays = isNaN(row.Yfdays) ? '' : row.Yfdays
  row.Sfmzyq = row.Yfdays > 0 ? "" : "X"

  