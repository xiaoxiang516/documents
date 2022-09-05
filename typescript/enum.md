## 例子1：
```typescript
/* eslint-disable*/
import request from '../request/index';

enum Api {
  fetchAccptBill = '/system/acpt/fetchAcptBill',
  pushAccptBill = '/system/acpt/pushAcptBill',
  exportAcptBill = '/system/acpt/exportAcptBill',
}
function FetchAccptBill(params: any) {
  return request({
    url: Api.fetchAccptBill,
    method: 'post',
    data: params,
  });
}
function PushAccptBill(params: any) {
  return request({
    url: Api.pushAccptBill,
    method: 'post',
    data: params,
  });
}
function ExportAcptBill(params: any) {
  return request({
    url: Api.exportAcptBill,
    method: 'post',
    data: params,
    responseType: 'blob',
  });
}
export default {
  FetchAccptBill,
  PushAccptBill,
  ExportAcptBill,
};

```

## 例子2
```typescript
import type { ComputedRef } from 'vue'
/* eslint-disable camelcase */
export enum ITabName {
  '01' = '人员处置',
  '02' = '材料处置',
  '03' = '机械处置',
  '04' = '临设处置',
  '05' = '其他处置措施',
  '06' = '方案总览',
  '07' = '保障措施',
  '08' = '附件目录'
}

export type TITabName = keyof typeof ITabName

export interface IPageCtl {
  pageLoading: boolean
  tabName: TITabName
  /**
   * 是否显示初始化按钮
   */
  initialBtn: boolean
  btnAll: ComputedRef<boolean>
}
```