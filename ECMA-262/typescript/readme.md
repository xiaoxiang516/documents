### 实验 搭建typescript环境
粘贴typescript编译为javascript
- [官网 ts练习示例](https://www.tslang.cn/play/index.html)
```ts
// https://www.tslang.cn/play/index.html
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());


```

```ts

```

编译typescript代码拿到实时效果


### [Getting Started](https://www.w3schools.com/typescript/index.php)
人物 安德斯·海尔斯伯格（Anders Hejlsberg）


[](https://www.typescriptlang.org/zh/docs/)
[](https://www.typescriptlang.org/)

[](https://github.com/microsoft/TypeScript.git)
[](https://github.com/microsoft/TypeScript)


[介绍](https://www.sohu.com/na/433426213_298038)



- [TypeScript中文网](https://www.tslang.cn/docs/home.html)
- [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)

- [TypeScript 快速上手学习系列](https://blog.csdn.net/hh18700418030/category_11716049.html)

- [TypeScript 教程](https://www.w3cschool.cn/typescript/)

- [TypeScript 全面进阶指南](https://zhuanlan.zhihu.com/p/538934048)
- 
## webpack vue typescript教程


TypeScript 与组合式 API

- 运行时声明



```TypeScript
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```
```ts
// 还能写中文？？？
export enum TabsEnum {
  '基础信息' = 1,
  '扣罚信息' = 2,
  '附件' = 3
}
```



```typescript
// [练习](https://www.tslang.cn/play/index.html)
// ts
// 给一个对象添加属性
enum api {
  '01' = 'a',
  '02' = 'b',
  '03' = 'c',
}
// enum 上面相当于一个对象定义了三个属性，等同下面的js代码 
// js
var api;
(function (api) {
    api["01"] = "a";
    api["02"] = "b";
    api["03"] = "c";
})(api || (api = {}));
```

## 例子2
```typescript
// /counterClaim/index.ts
import type { ComputedRef } from 'vue'
/* eslint-disable camelcase */
export enum ITabName {
  '01' = '人员处置',
  '02' = '材料处置'
}

export type TITabName = keyof typeof ITabName

// 
export interface IPageCtl {
  pageLoading: boolean
  tabName: TITabName
  btnAll: ComputedRef<boolean>
}

// /counterClaim/types.ts 
import type {
  IPageCtl
} from './types'

const pageControl = reactive<IPageCtl>({
  tabName: '01',
  pageLoading: true,
  btnAll: computed(() => true )
})
```


```typescript
type NameOrNameArray = string | string[];
// 
export type Group = {
  Fzbm: string;
  buildData: any[],
  checked?: boolean,
  Fzmc?: string,
  JmbmObj: any
}

type Contrast = {
  groups: Group[];
  Bguid?: string;
  title?: string,
  isEdit?: boolean
}

type mxType <T> = {
  [key: string]: T
}
export interface dataType {
  tableData: any[];
  expandList: string[];
  maxLevel: number;
  checkedList: mxType<string>[];
  buildVisible: boolean;
  disabledArr: any[];
  checkedArr: any[];
  currentGroup: any;
  editVisible: boolean;
  contrastList: Contrast[];
  currentIndex: number,
  jmVisible: boolean,
  sourceList: any[],
  checkArr: any[],
  currentLevel: number
}

```