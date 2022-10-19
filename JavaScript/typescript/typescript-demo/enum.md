
```typescript
// [练习](https://www.tslang.cn/play/index.html)
// ts
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