import counterClaimIndex from './counterClaimIndex.vue'
import { reactive, provide } from 'vue'
import { getDetailDataRes } from '@/api/common/useRequest'
import { getSchemaByEntityIdArray } from '@/utils/odataUtilCommon'

import type { IPageCtl, IPageObj } from './types'

const pageControl = reactive<IPageCtl>({
  tabName: '01',
  pageLoading: true
})

const pageObj = reactive<IPageObj>({
  schemas: [],
  entityIds: [
    'CzfaHead',
    'Czfa2Rycz', // 人员处置
    'Czfa2Clcz', // 材料处置
    'Czfa2Jxcz', // 机械处置
    'Czfa2Lscz', // 临设处置
    'Czfa2Qtcz', // 其他处置措施
    'Czfa2Czhz', // 方案总览
    'Czfa2Bzcs' // 保障措施
  ],
  domainList: [],
  formData: {}
})

const Fn = {
  /**
   * 初始化 schema
   */
  initSchema: async () => {
    const schemas = await getSchemaByEntityIdArray(
      'ZFLY_ZYSP_SRV',
      pageObj.entityIds
    )
    pageObj.schemas = schemas
    const czhzSchema = schemas[pageObj.entityIds.indexOf('Czfa2Czhz')]
    czhzSchema.properties.ggfw = { title: '赶工范围' }
    czhzSchema.properties.yjhgq = { title: ' 原计划工期' }
    czhzSchema.properties.jhgggq = { title: ' 计划赶工工期' }
    czhzSchema.properties.sjgqys = { title: ' 实际工期压缩' }
    console.log(schemas)
  },
  /**
   * 初始化详情
   * @param guid 唯一 id
   */
  initDetail: async (guid: string) => {
    const { d } = await getDetailDataRes(
      'ZFLY_ZYSP_SRV',
      'Czfa2HeadSet',
      `('${guid}')?$expand=to_Czfa2CzhzSet,to_Czfa2RyczSet,to_Czfa2ClczSet,to_Czfa2JxczSet,to_Czfa2LsczSet,to_Czfa2QtczSet,to_Czfa2BzcsSet,RetMsgSet&$format=json`
    )
    pageObj.formData = d
    pageObj.formData.to_Czfa2BzcsSet = d.to_Czfa2BzcsSet.results
    pageObj.formData.to_Czfa2ClczSet = d.to_Czfa2ClczSet.results
    pageObj.formData.to_Czfa2CzhzSet = d.to_Czfa2CzhzSet.results
    pageObj.formData.to_Czfa2JxczSet = d.to_Czfa2JxczSet.results
    pageObj.formData.to_Czfa2LsczSet = d.to_Czfa2LsczSet.results
    pageObj.formData.to_Czfa2QtczSet = d.to_Czfa2QtczSet.results
    pageObj.formData.to_Czfa2RyczSet = d.to_Czfa2RyczSet.results
    console.log('详情返回据', d)
    pageControl.pageLoading = false
  },
  save: () => {
    console.log('save')
  },
  cancel: () => {
    console.log('cancel')
  }
}

export { pageControl, Fn, pageObj }

export default counterClaimIndex
