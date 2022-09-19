import { cloneDeep } from 'lodash'
import { postData } from '@/api/common/useRequest'
import { ElMessageBox } from 'bgy-plus'

// SAP 数据目录的编辑权限
// StatusDj: [jdbh]
export const dataDirectoryAuthJson = {
  20: ['010', '011'],
  30: ['020'],
  40: ['000'],
  50: ['030'],
  90: ['090'],
  100: ['100'],
  110: ['110'],
  120: ['120'],
  150: ['130']
}

// ISP 数据目录的编辑权限
// StatusDj: [jdbh]
// export const dataDirectoryAuthJson = {
//   10:['000']
//   30: ['010'],
//   50: ['020','021'],
//   90: ['090'],
//   100: ['100'],
//   110: ['050'],
//   120: ['110'],
//   150: ['120']
// }

// 初始化页面数据，新建时使用
export const defaultFormData = {
  VisaBilltype: '01',
  SubmPltfm: '03',
  Iswtpt: '02',
  Iswxcb: '',
  Iscsfqz: '',
  Status: '10',
  StatusDj: '40', // sap项目工程师草稿=40 sip施工单位草稿=10
  tableData: [
    { stage: '签证变更申报', name: '施工单位送审金额', bhs: 0, hs: 0, sj: '0.00', sl: '0.00' },
    { stage: '签证变更申报', name: '造价一审金额', bhs: 0, hs: 0, sj: '0.00', sl: '0.00' },
    { stage: '签证变更申报', name: '造价二审金额', bhs: 0, hs: 0, sj: '0.00', sl: '0.00' },
    { stage: '签证变更申报', name: '申报审核金额', bhs: 0, hs: 0, sj: '0.00', sl: '0.00' }
  ],
  to_FVisa: [] as any[],
  extraInfo: {
    latestHsMoney: '0.00'
  } // 额外信息，提交时不需要
} as any

// 默认的页签权限
export const defaultAuthData = {
  jbxx: true,
  sgjm: true,
  zlml: true,
  qdxx: true,
  wxcb: true,
  cbcf: true,
  djzt: true,
  wlxmx: true
} as any

/**
 * 处理 schema 数据，适应页面显示
 * @param schema
 * @returns
 */
export const dealSchema = (schema) => {
  schema.properties.VisaJhkgXm.type = 'date'
  schema.properties.VisaJhwgXm.type = 'date'

  // 自定义成本信息表格的数据
  schema.properties.stage = { title: '发生阶段', quickinfo: '', creatable: false }
  schema.properties.name = { title: '金额类型', quickinfo: '', creatable: false }
  schema.properties.bhs = { title: '不含税金额（元）', quickinfo: '', creatable: true, type: 'number', format: 'price', precision: 22, scale: 2 }
  schema.properties.hs = { title: '含税金额（元）', quickinfo: '', creatable: true, type: 'number', format: 'price', precision: 22, scale: 2 }
  schema.properties.sj = { title: '税金（元）', quickinfo: '', creatable: false, format: 'price', precision: 22, scale: 2 }
  schema.properties.sl = { title: '税率（%）', quickinfo: '', creatable: true, type: 'number', precision: 6, scale: 2 }

  return schema
}

export const dealVisaSchema = (schema, isK2Page) => {
  schema.properties.FVisaZrbl.type = 'number'
  schema.properties.FJxse.format = 'price'

  return schema
}

/**
 * 获取页面数据
 * @param guid
 * @returns
 */
export const delGetData = (res: any) => {
  const result = res?.d || cloneDeep(defaultFormData)

  result.VisaBilltype = '01'
  result.SubmPltfm = '03'
  result.tableData = [
    { stage: '签证变更申报', name: '施工单位送审金额', bhs: Number(result.VisaAmtSgdw), hs: Number(result.VisaAmtSgdwHs), sj: '0.00', sl: '0.00' },
    { stage: '签证变更申报', name: '造价一审金额', bhs: Number(result.VisaAmtZjys), hs: Number(result.VisaAmtZjysHs), sj: '0.00', sl: '0.00' },
    { stage: '签证变更申报', name: '造价二审金额', bhs: Number(result.VisaAmtZjes), hs: Number(result.VisaAmtZjesHs), sj: '0.00', sl: '0.00' },
    { stage: '签证变更申报', name: '申报审核金额', bhs: Number(result.VisaAmt), hs: Number(result.VisaAmtHs), sj: '0.00', sl: '0.00' }
  ]

  result.to_FVisa = result.to_FVisa?.results || []

  return result
}

/**
 * 校验数据
 * @param Operation 操作类型
 * @returns
 */
export const validData = async (baseInfoRef, dataDirectoryRef, pageObj, Operation) => {
  return new Promise((resolve) => {
    if (!baseInfoRef.value?.validFormData()) {
      resolve({
        isSuccess: false,
        message: '请先完善基本信息',
        activeTab: 'jbxx'
      })
      return
    }

    if (!dataDirectoryRef.value?.validTable()) {
      resolve({
        isSuccess: false,
        message: '请完善资料目录信息',
        activeTab: 'zlml'
      })
      return
    }

    // 无效成本为否时，检查标题信息
    if (!pageObj.formData.Iswxcb) {
      postData('ZFLY_IDL_COST_SRV', 'IdlCheckSet', {
        // Csly: pageObj.formData.VisaReasonId,
        Csly: '03',
        Content: pageObj.formData.VisaBgyy
      })
        .then((res) => {
          if (res?.d?.Sfsbwx === 'X') {
            ElMessageBox.confirm(
              '通过系统检索，识别可能存在无效成本事项，请确认是否继续发生该事项并制定无效成本降低方案！',
              '请确认',
              {
                confirmButtonText: '确 认',
                cancelButtonText: '取 消'
              }
            )
              .then(() => {
                resolve({ Sfsbwx: res.d.Sfsbwx, isSuccess: true })
              })
              .catch(() => {
                resolve({ Sfsbwx: res.d.Sfsbwx, isSuccess: false })
              })
          } else {
            resolve({ isSuccess: true })
          }
        })
        .catch(() => {
          resolve({ isSuccess: false })
        })

      return
    }

    resolve({ isSuccess: true })
  })
}

/**
 * 处理待提交的数据
 * @returns
 */
export const dealPostData = (dataDirectoryRef, pageObj, Operation) => {
  const data = cloneDeep(pageObj.formData)
  delete data.extraInfo

  if (data.tableData && data.tableData.length === 4) {
    data.VisaAmtSgdw = `${data.tableData[0].bhs}`
    data.VisaAmtZjys = `${data.tableData[1].bhs}`
    data.VisaAmtZjes = `${data.tableData[2].bhs}`
    data.VisaAmt = `${data.tableData[3].bhs}`

    data.VisaAmtSgdwHs = `${data.tableData[0].hs}`
    data.VisaAmtZjysHs = `${data.tableData[1].hs}`
    data.VisaAmtZjesHs = `${data.tableData[2].hs}`
    data.VisaAmtHs = `${data.tableData[3].hs}`
    delete data.tableData
  }

  data.to_FVisa = data.to_FVisa.map((item) => {
    delete item.id
    return {
      ...item,
      FSl: `${item.FSl}`,
      FHsje: `${item.FHsje}`,
      FVisaAmt: `${item.FVisaAmt}`,
      FVisaZrbl: `${item.FVisaZrbl}`
    }
  })

  data.to_Item = dataDirectoryRef.value?.getDateDirectory()

  return {
    ...data,
    Operation
  }
}
