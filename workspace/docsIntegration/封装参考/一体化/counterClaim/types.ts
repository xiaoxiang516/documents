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
}

interface IPageObjFormData {
  /**
   * 保障措施
   */
  to_Czfa2BzcsSet: any[]
  /**
   * 材料处置
   */
  to_Czfa2ClczSet: any[]
  /**
   * 方案总览
   */
  to_Czfa2CzhzSet: any[]
  /**
   * 机械处置
   */
  to_Czfa2JxczSet: any[]
  /**
   * 临设处置
   */
  to_Czfa2LsczSet: any[]
  /**
   * 其他处置措施
   */
  to_Czfa2QtczSet: any[]
  /**
   * 人员处置
   */
  to_Czfa2RyczSet: any[]
}

export interface IPageObj {
  schemas: Record<'properties' | 'title', any>[]
  entityIds: string[]
  domainList: any[]
  formData: Partial<IPageObjFormData>
}
