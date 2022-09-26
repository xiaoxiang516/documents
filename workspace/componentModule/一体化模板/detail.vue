<template>
  <div class="common-app">
    <common-head title="基本信息">
    </common-head>
    <common-form
      ref="formTestRef"
      :schema="formObj.schema"
      :formSchema="formObj.formSchema"
      :form-ui-schema="formObj.formUiSchema"
      :formData="formObj.formData"
      :label-mode="formObj.labelMode"
      :rules="formObj.itemInfoRules"
      labelWidth="110px"
      :loading="isLoading">
      <template v-slot:ZconName>
        <span>{{formObj.formData.ZconName}}</span>
      </template>
    </common-form>
    <common-head title="合同分部分项信息">
    </common-head>
    <tree-table
    v-if="isShowTable"
    :domains="domainList"
    ref="treeTableRef"
    :treeTableData="tableObj.tableTreeData"
    :tableListData="tableObj.tableData"
    :treeData="tableObj.treeData"
    :ldParams="ldParams"
    labelMode="true"
    :Hguid="num"
    :tabsData="tabsData"
    :resultGuid="resultGuid"
    ></tree-table>

    <!-----------------------------------------    分割线 搜索帮助弹框     ----------------------------------------->
    <el-row class="button-style">
      <el-col :span="24" align="right">
        <el-button type="primary" @click="handleNext">展开到楼层</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, reactive, ref, watch } from 'vue'
import { getDataRes, getDataNoFilter, postData } from '@/api/common/useRequest'
import { ElMessage, ElMessageBox } from 'bgy-plus/es'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Search } from '@element-plus/icons-vue'
import ActionBar from '@/components/ActionBar.vue'
// 引入schema table 组件
import CommonTable from '@/components/CommonTable.vue'
import CommonForm from '@/components/CommonForm.vue'
import CommonHead from '@/components/CommonHead.vue'
import TreeTable from '../components/costTreeTable.vue'
import { getCurrentDate, handleText } from '@/utils'
import { importExcelData, exportDataToExcel } from '@/utils/excelAndData/index'
import type { ElInput, ElTable } from 'bgy-plus'
// import contractSearch from '@/views/co/contractRequestPayout/components/contractSearch.vue'
// import MaZyyq from './components/maZyyq.vue'
import { k2InitDetail, K2Form, onReK2Submit, onK2Repeal, k2Init, onK2Submit, k2InitAuto } from '@/utils/k2Util'

// *** 引入功能工具类
import {
  getDomains,
  mergeDomainsInSchema,
  getSchemaByEntityId,
  handlerOdataRes
} from '@/utils/odataUtilCommon'
import _ from 'lodash'
import { listToTree } from '@/api/co/common'
import { Console } from 'console'
const router = useRouter()
const route = useRoute()
const useStore_ = useStore()
const ZdocumentNo = ref('') // 合同号
const ZconClass = ref('') // 合同分类编码
const resultGuid = ref('') // 分部分项ID获取
const maZyyqData = ref([]) // 分部分项ID获取
const fMultipleSelect = ref([]) // 获取维护专业页签数据默认选中

const serviceID = 'ZFCO_QK_FBFXJEWH_SRV'
const entitySet = 'HeaderSet'
const contractSearchRef: any = ref<null | HTMLElement>(null)
const maMajorRef: any = ref<null | HTMLElement>(null)

// k2相关配置
const processTitle = '成本产值-分部分项金额维护'
const processCode = 'CMCZ001'
const opType = ref('L')// 页面状态

const treeTableRef = ref()

// 搜索帮助弹框
const innerIsShow = ref(false) // 是否显示弹框
const searchTitle = ref('') // 弹框标题
const searchKey = ref('') // 弹框需要调用的搜索帮助关键字
const srvtype = ref('') // 关联入参
const isShowTable = ref(false)
// 搜索帮助弹框end
interface ISelectItem {
  Code: string,
  Text: string,
  row: {}
}
const selectHandleData = ref<ISelectItem>({
  Code: '',
  Text: '',
  row: {}
})

const props = defineProps({
  labelMode: Boolean,
  ruleForm: Object,
  initStatus: String,
  reviewType: String,
  Hguid: String
})
const tabsData = ref([])

const ldParams = ref({
  Zhtlsh: '',
  Zylxbm: ''
}) // 弹框需要调用的搜索帮助关键字

const state = reactive({
  AppItemSet: {
  } as any,
  multipleSelection: [] as any [],
  // 导出excel的字段
  fields: {
    // Operation	业务识别类型
    // Zsqdjh	单据编号
    // Zitem	行项目号
    Zsqlx: '申请类型',
    Zsymk: '适用模块',
    Zsydj: '适用单据',
    Zcjms: '场景描述',
    Ztzjtnr: '调整具体内容',
    Ztzyy: '调整原因',
    Ztzrq: '调整生效日期',
    Zmbbm: '调整凭证模板',
    Zgzbm: '调整凭证规则',
    // Zhsbm: '调整函数',
    Ztzpz: '调整配置表',
    Zywhd: '业务活动',
    // Zsydj: '单据类型', // 后台接口无此字段
    // Zywhdms: '业务活动描述',
    Zkosar: '成本中心类型',
    Mwskz: '税码',
    Zywlx: '业务类型',
    FlgDf: '是否代付',
    Shkzg: '借/贷标识',
    Zdlpbs: '跨楼盘抵楼款标识',
    FlgXyfp: '是否需要发票',
    Zsaknr: '总账科目编号',
    // ZsaknrTxt: '总账科目描述',
    Fkcbxm: '付款成本项目'
    // Zyxys8: '因子8'
  }
})
const importFile = ref<InstanceType<typeof ElInput>>()
// const importFlag = ref(true)
const num = ref(route.query.Zsqdjh || '') // 单据编号
const OperationKey = ref(route.query.OperationKey || '') // 操作类型 查看 编辑
const labelMode = ref(props.labelMode)

const totalCount = ref(0)
const ZdjlxOption = ref([] as any []) // 单据类型下拉阈值
const ZywlxOption = ref([] as any []) // 业务类型下拉阈值
const tableObj = reactive({
  schema: {} as any,
  tableSchema: [] as any [],
  tableUiSchema: {},
  tableData: [] as any [],
  tableTreeData: [] as any [],
  treeData: [] as any [], // 新增行时需要根据专业展示下面所有的分部分项树形数据
  itemInfoRules: {} as any,
  isLoading: true
})

const formObj = reactive({
  schema: {} as any,
  formSchema: [] as any [],
  formUiSchema: {},
  formData: {},
  labelMode: props.labelMode,
  itemInfoRules: {} as any
})

const formTestRef:any = ref<null | HTMLElement>(null)
const isLoading = ref(false)

const handleSearch = async () => {
  const result = await getDataNoFilter(
    serviceID,
    entitySet +
        "('" +
        num.value +
        "')?$expand=Item,Glzy,Item/Jewhmx,Item/Jewhmx/Jetzmx&$format=json"
  )
  if (result.d) {
    handleDataGroup(result.d)
  }
}

const handleDataGroup = async (data: any) => {
  // 表格平铺数据
  tableObj.tableData = data.Item.results
  // 给tab页签复制
  tabsData.value = data.Glzy.results
  // 默认晒选出第一个tab页数据 转换成树行
  // const items = tableObj.tableData.filter((ob: any) => ob.Zzybm === tabsData.value[0].Zzybm)
  // tableObj.tableTreeData = listToTree(items, 'Zbm', 'Zfjbm')
  formObj.formData = data
  delete formObj.formData.__metadata

  ZdocumentNo.value = formObj.formData.Zhtlsh
  ldParams.value.Zhtlsh = ZdocumentNo.value
  // ldParams.value.Zhtlsh = '2000' // 测试写死
  await getMaData() // 获取维护专业页签数据
  fMultipleSelect.value = tabsData.value // 获取维护专业页签数据默认的选中项
  const treeRows = await getTableData(tabsData.value) // 获取专业下可选择的分部分项树形数据
  tableObj.treeData = _.cloneDeep(treeRows?.d?.results)
  isShowTable.value = true // 合同选择之后加载表格
}

const initQueryData = async () => {
  // 选择合同带出合同信息
  const paramsA = `HtxxSet?$filter=Zhtlsh eq '${ZdocumentNo.value}'&$format=json`
  const resultA = await getDataNoFilter('ZFCO_QK_COMMON_SHP_SRV', paramsA)
  const obj = resultA?.d?.results[0]
  formObj.formData.PhaseTx = obj.PhaseTx
  formObj.formData.ProjTx = obj.ProjTx
  formObj.formData.QyName = obj.QyName
  formObj.formData.ZconClass = obj.ZconClass
  formObj.formData.ZconClassNo3 = obj.ZconClassNo3
  formObj.formData.ZconName = obj.ZconName
  formObj.formData.Zfqbm = obj.Zfqbm
  formObj.formData.Zhtlsh = obj.Zhtlsh
  formObj.formData.Zhtzxjj = obj.Zhtzxjj
  formObj.formData.Zssqy = obj.Zssqy
  formObj.formData.Zssxm = obj.Zssxm
  formObj.formData.Zdjly = '02'
  await getMaData()
}
const getMaData = async () => {
  // 获取分部分项GUID，赋值到分部分项版本ID ， 根据这个GUID到  编码：BMset接口中获取层级结构数据
  const resultNewId = await getDataNoFilter('ZFCO_QK_FBFXJEWH_SRV', 'NewId')
  resultGuid.value = resultNewId?.d?.Hguid
  if (resultGuid.value) {
    // 新增 - 分部分项ID获取
    // 获取层级结构数据
    const paramsB = `WhzySet?$filter=Zfbfxbbid eq '${resultGuid.value}'and ZconClass eq '${ZconClass.value}'&$format=json`
    const resultB = await getDataNoFilter('ZFCO_QK_COMMON_SHP_SRV', paramsB)
    // 维护专业页签弹框数据
    maZyyqData.value = resultB?.d?.results
  }
}

const initUserInfo = async () => {
  const username = useStore_.state.user.username
  const userInfo = await getDataNoFilter('ZFFI_GD_COMMON_SRV', `BipInfoSet('${username}')?$format=json`)
  return userInfo?.d
}
/**
 * 获取页面数据
 */
const getPageData = async () => {
  if (!OperationKey.value) {
    const userInfo = await initUserInfo()
    formObj.formData.Zjbr = userInfo.Zpernr // 经办人员工号
    formObj.formData.ZjbrName = userInfo.Znachn
    formObj.formData.Zjbbm = userInfo.Zorgid // 经办部门
    formObj.formData.ZjbbmName = userInfo.Zorgname // 经办部门
    // formObj.formData.Erchn = userInfo.Znachn
    const date = await getCurrentDate()
    formObj.formData.Zjbrq = date // 经办日期
    // formObj.formData.Zsxrq = date
    // [ 'Zfbr', 'Ernam', 'Erdat', 'Zsxrq', 'Zbbsm']
  }
}

// 复制
function copyRow(row) {
  tableObj.tableData.push(_.cloneDeep(row))
}

const saveData = async(flag) => {
  ElMessageBox.confirm('请确认是否需要按层调整分部分项金额:<br>若需调整，请点击【下一步】进行维护；<br>若无需调整，请点击【提交】按钮进行审批。', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    dangerouslyUseHTMLString: true
  })
    .then(async() => {
      const res = await handleSave()
      const messageType = res?.d?.Message?.results[0].Type
      if (messageType === 'S') {
        if (flag === 'fb') {
          handleFb()
        } else {
          ElMessage({
            type: 'success',
            showClose: true,
            message: res?.d?.Message?.results[0].MessageText
          })
        }
        handleReturn()
      } else {
        ElMessage({
          type: 'error',
          showClose: true,
          message: res?.d?.Message?.results[0].MessageText
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消提交'
      })
    })
}

/**
 * 保存表单数据
 */
const handleSave = async() => {
  // 调用post接口
  // 定义请求报文
  // 调用post接口
  // 定义请求报文
  // const { Zhth, Yhtmc } = pageObj.formData

  const ItemSet = await beforeSubmit()
  ItemSet?.forEach((item) => {
    delete item.children
    if (item.Operation !== 'D') {
      if (item.Hguid) {
        item.Operation = 'U'
      } else {
        item.Operation = 'C'
      }
    }
  })

  tabsData.value?.forEach((op) => {
    delete op.Htzyguid
    delete op.ZconClass
    delete op.Zfbfxbbid
    delete op.__metadata
  })

  // const baseInfoValidate = treeTableRef.value.validateTable()
  // console.log(baseInfoValidate)
  // if (!baseInfoValidate) {
  //   return false
  // }
  const postJson: any = {
    ...formObj.formData,
    Hguid: num.value,
    Operation: num.value ? 'U' : 'C',
    Item: ItemSet,
    Glzy: tabsData.value,
    Message: []
  }
  delete postJson.Xh
  const res = await postData(serviceID, entitySet, postJson)
  return res
}
// 发布
const handleFb = async () => {
  const queryS = 'StatusChange' + '?Hguid=' + `'${formObj.formData.Hguid}'` + '&Zspzt=\'20\'' + '&$format=json'
  const res = await getDataNoFilter('ZFCO_QK_FBFXJEWH_SRV', queryS)
  const messageType = res?.d?.Type
  if (messageType === 'S') {
    handleReturn()
    ElMessage({
      type: 'success',
      showClose: true,
      message: res.d.MessageText
    })
  } else {
    ElMessage({
      type: 'error',
      showClose: true,
      message: res.d.MessageText
    })
  }
}
// 提交时校验数据 start
const beforeSubmit = async() => {
  const pageData = await treeTableRef.value.saveTableData()
  // const pageData = _.cloneDeep(tableObj.tableData)
  pageData.forEach(row => {
    delete row.__metadata
    delete row.Zsfmj
    delete row.Xh
    delete row.Zfxje
    if (row.Jewhmx) {
      row.Jewhmx.forEach(item => {
        if (item.Operation !== 'D') {
          if (item.Hguid) {
            item.Operation = 'U'
          } else {
            item.Operation = 'C'
          }
        }
        // item.custom = JSON.parse(item.custom)
        if (!item.Jetzmx) {
          item.Jetzmx = []
        }
        Object.keys(item.custom).forEach(key => {
          // 判断是否是删除的数据，是的话将状态改为新增
          // const items = item.Jetzmx.filter((ob: any) => ob.Zlch === item.custom[key])
          // if (items.length !== 0) {
          //   items[0].Operation = 'U'
          //   items[0].Zlch = key
          //   items[0].Ztzhje = item.custom[key]
          // } else {
          //
          const index = item.Jetzmx.findIndex((e) => { return e.Zlch == key })
          if (index !== -1) {
            if (item.Jetzmx[index].Hguid) {
              item.Jetzmx[index].Operation = 'U'
            } else {
              item.Jetzmx[index].Operation = 'C'
            }

            item.Jetzmx[index].Zlch = key
            item.Jetzmx[index].Ztzhje = item.custom[key]
            delete item.Jetzmx[index].__metadata
          } else {
            item.Jetzmx.push({
              Operation: 'C',
              Zlch: key,
              Ztzhje: item.custom[key]
            })
          }

          // }
        })
        delete item.custom
        delete item.Floor
        delete item.__metadata
        delete item.Zzybm
      })
    }
  })
  return pageData
}

// 提交时校验数据 end

async function k2InitData() {
  init()
  tableObj.isLoading = false
  opType.value = route.query.opType
  if (route.query.OperationKey === 'view' || props.labelMode) {
    labelMode.value = true
    formObj.labelMode = true
  } else {
    // initK2()
    labelMode.value = false
    formObj.labelMode = false
  }
  // num.value = route.query.userId
}
async function init() {
  num.value = route.query.Hguid || props.Hguid
  await getSchema()
  if (route.query.Hguid || props.Hguid) {
    await handleSearch()
  } else {
    // 获取当前登陆人已经当前日期 新增时
    await getPageData()
    // chooseContract()
  }
}

const queryDetailK2 = () => {
  if (!num.value) {
    num.value = K2Form.formData.vmFormContent.integrationId
  }
}

async function initK2() {
  // K2初始化
  if (opType.value === 'U') {
    // k2Init(processCode, processTitle, submitBefore, after)
    k2Init(processCode, processTitle, before, after)
  }

  // 重新提交页面
  if (opType.value === 'V') {
    // k2InitAuto(queryDetailK2, reSubmitBefore, after, nowGuid)
    k2InitAuto(queryDetailK2, before, after, num.value)
  }
}
function chooseContract() {
  isShowTable.value = false
  contractSearchRef.value.showDialog()
}
const getSchema = async () => {
  const schema = await getSchemaByEntityId(serviceID, 'Header')
  tableObj.schema = schema // 设置schema
  const schemaF = await getSchemaByEntityId(serviceID, 'Header')
  formObj.schema = schemaF
  // 合并domainList
  const domainList = await getDomains(serviceID, 'DomainListSet')
  // tableObj.schema.properties = await mergeDomainsInSchema(tableObj.schema, domainList)
  formObj.schema.properties = mergeDomainsInSchema(formObj.schema, domainList)
  // ZdjlxOption.value = domainList.Zdjlx
  // 设置table 校验规则
  tableObj.itemInfoRules = {
  }
  // 设置屏幕显示字段
  // 序号、上级部门编码、上级部门描述、预算部门编码、预算部门名称、预算部门说明、是否承载、是否执行、预算部门负责人、预算部门负责人姓名、甲乙丙方、
  // 对应人力组织编码、对应人力组织描述、核算单位编码、核算单位描述、核算部门编码、核算部门描述、操作
  tableObj.tableSchema =
  [{
    title: '序号',
    key: 'Xh',
    fixed: 'left',
    type: 'index'
  }, 'Zsqlx', 'Zsymk', 'Zsydj', 'Zcjms', 'Ztzjtnr', 'Ztzyy', 'Ztzrq', 'Zmbbm', 'Zgzbm', 'Ztzpz', 'Zywhd', 'Zkosar', 'Mwskz', 'Zywlx', 'FlgDf', 'Shkzg', 'Zdlpbs', 'FlgXyfp', 'Zsaknr', 'Fkcbxm']

  tableObj.tableUiSchema = {
    Zsydj: {
      width: '180',
      slot: true
    },
    Zywhd: {
      slot: true
    },
    Zywlx: {
      slot: true
    },
    Zsaknr: {
      slot: true
    },
    Zcjms: {
      width: '250',
      slot: true
    },
    Ztzjtnr: {
      width: '250',
      slot: true
    },
    Ztzyy: {
      width: '250',
      slot: true
    },
    Zmbbm: {
      width: '250',
      slot: true
    },
    Zgzbm: {
      width: '250',
      slot: true
    },
    Ztzpz: {
      width: '250',
      slot: true
    }
  }
  formObj.itemInfoRules = {
  }
  //   Hguid	GUID 16
  // QyName	区域名称
  // Zdjbh	单据编号
  // Zhtlsh	合同流水号
  // Zssqy	所属区域
  // Zssxm	所属项目
  // Zfqbm	分期编码
  // Zbz	备注
  // Zdjlx	单据类型
  // Zspzt	审批状态
  // Zyfdw	乙方单位
  // Zfbfxbbid	分部分项版本ID
  // Zhtzxjj	合同最新金额
  // Zdjly	单据来源
  // Zscbs	删除标识
  // Zjbr	经办人
  // Zjbrq	经办日期
  // Zjbbm	经办部门
  // Erdat	创建日期
  // Ertim	创建时间
  // Ernam	创建人
  // Erchn	姓名
  // Ertsm	时戳
  // Aedat	更改日期
  // Aetim	更新时间
  // Aenam	更改人
  // Aetsm	时戳
  // Aechn	姓名
  // PassDat	审批通过日期
  // PassTim	审批通过时间
  // SubmDat	审批提交日期
  // SubmTim	审批提交时间
  // Approver	审批通过人BIP
  // Sumbitname	提交人BIP
  // FormId	表单唯一标识
  // Operation	业务识别类型
  // ZconName	合同名称
  // ZconClassNo3	三级合同分类CODE
  // ZconClass	合同分类名称
  // ProjTx	项目名称
  // PhaseTx	分期名称
  // QyName	区域名称
  // YfdwName	乙方单位名称

  formObj.formSchema = ['ZconName', 'Zhtlsh', 'Zssqy', 'ProjTx', 'PhaseTx', 'ZconClass', 'Zhtzxjj',
    'Zdjbh', 'ZjbrName', 'ZjbbmName', 'Zjbrq', 'SubmDat', 'PassDat', 'Zspzt', 'Zbz']

  formObj.formData = {}

  formObj.formUiSchema = {
    ZconName: {
      span: 16,
      slot: true
    },
    Zhtlsh: {
      span: 8,
      'ui:disabled': true
    },
    Zssqy: {
      // 'ui:widget': 'textarea',
      // 'ui:rowspan': 3,
      span: 8,
      'ui:disabled': true
    },
    ProjTx: {
      span: 8,
      'ui:disabled': true
    },
    PhaseTx: {
      span: 8,
      'ui:disabled': true
    },
    ZconClass: {
      span: 8,
      'ui:disabled': true
    },
    Zhtzxjj: {
      span: 8,
      'ui:disabled': true
    },
    Zdjbh: {
      span: 8,
      'ui:disabled': true
    },
    ZjbrName: {
      span: 8,
      'ui:disabled': true
    },
    ZjbbmName: {
      span: 8,
      'ui:disabled': true
    },
    Zjbrq: {
      span: 8,
      'ui:disabled': true
    },
    SubmDat: {
      span: 8,
      'ui:disabled': true
    },
    PassDat: {
      span: 8,
      'ui:disabled': true
    },
    Zspzt: {
      span: 8,
      'ui:disabled': true
    },

    Zbz: {
      'ui:widget': 'textarea',
      'ui:rowspan': 3,
      span: 24
    }
  }
}

const tableRef:any = ref<null | HTMLElement>(null)

// 提交K2审批
const onSubmit = async () => {
  // 先检查
  // const result = formCheck()
  // if (!result) {
  //   return
  // }
  ElMessageBox.confirm('请确认是否需要按层调整分部分项金额:<br>若需调整，请点击【下一步】进行维护；<br>若无需调整，请点击【提交】按钮进行审批。', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    dangerouslyUseHTMLString: true
  })
    .then(async() => {
      ElMessageBox.confirm(
        '是否要提交K2审批?',
        '请确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }
      )
        .then(() => {
          onK2Submit()
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消提交'
      })
    })
}

// const { d } = await postData(SERVICE_ID, HEADER, entity)
const before = async () => {
  const res = await handleSave()
  const { d } = res
  if (d.Hguid) {
    // K2Form.entity.Hguid = d.Zsqdjh // 单据编号 可以不存
    K2Form.entity.Hguid = d.Hguid
    K2Form.entity.BizId = d.Hguid // 单据编号 可以不存
    // 将业务主键id 存放在此获取id代码为K2Form.formData.vmFormContent.integrationId
    K2Form.formData.vmFormContent.integrationId = d.Hguid
    d.MessageSet = d.Message
  }
  return d
}
// * 提交后事件 大部分需求为标准逻辑如下,如果特殊需求自定义发开
const after = async(data, accessUrl, resultData) => {
  if (resultData && resultData.data.Item1 === true) {
    // 自定义开发逻辑
    ElMessage.success('提交成功')
    router.push('/co/output-config-fbfx-cost')
    // router.go(-1)
    // emit('closeDialogCostBudget')
  }
  return true // 一定编写return true 否则页面会被关闭
}
const handleReSubmit = () => {
  onReK2Submit()
}
// 提交K2审批end
/**
 * 返回按钮事件
 */
function handleReturn() {
  // router.go(-1)
  router.push('/co/output-config-fbfx-cost')
}

// 打开搜索帮助弹框
const selectionOption = async(title, key, keydes, val, row) => {
  innerIsShow.value = true
  searchTitle.value = '请选择' + title
  searchKey.value = key
  srvtype.value = val
  selectHandleData.value.Code = key
  selectHandleData.value.Text = keydes
  selectHandleData.value.row = row
}
// 搜索帮助弹框选中事件
const handleSelected = (selected) => {
  if (_.isEmpty(selected)) {
    return
  }
  const handleKey = selectHandleData.value.Code
  const handleDes = selectHandleData.value.Text
  selectHandleData.value.row[handleKey] = selected.Code
  selectHandleData.value.row[handleDes] = selected.Text
  innerIsShow.value = false
}

const handleSelectedClose = () => {
  innerIsShow.value = false
}

const handleFormInputChange = async(selected) => {
  if (_.isEmpty(selected)) {
    return
  }
  let params = ''
  params += ` Fieldname eq 'Zywlx' and Srvtype eq '${selected}' and `
  if (params !== '') {
    params = params.substring(0, params.length - 4)
  }
  const res = await getDataRes('ZFFI_DOC_ENGINE_CHANGE_SRV', 'SearchHelpSet', params)
  ZywlxOption.value = res?.d?.results
}

// 维护专业页签弹框功能 start
const maMajorTab = () => {
  maMajorRef.value.showDialog(tabsData.value)
}
// 选择专业后
const selectedMajor = (rows) => {
  // 如果已有在编辑的专业，表格数据已经加载，调用treetable的方法新增专业数据
  if (isShowTable.value) {
    treeTableRef.value.changeZy(rows)
  } else {
    // 初始化页面选择专业后调用
    handleTableData(rows)
  }
  tabsData.value = rows // 获取tab页签数据
  maMajorRef.value.closeDialog()
}

const getTableData = async(rows) => {
  // 获取层级结构数据
  let queryS = ''
  if (rows.length !== 0) {
    queryS += '('
    rows.forEach((key, index) => {
      if (rows.length - 1 === index) {
        queryS += 'Zbm eq \'' + key.Zzybm + '\' ' + ')'
      } else {
        queryS += ' Zbm eq  \'' + key.Zzybm + '\' or '
      }
    })
  }
  const paramsB = `BmSet?$filter=Hguid eq '${resultGuid.value}' and ${queryS} and Zlx eq '01' &$format=json`
  const resultB = await getDataNoFilter('ZFCO_QK_COMMON_SHP_SRV', paramsB)
  return resultB
}
const handleTableData = async(rows) => {
  // 获取层级结构数据
  const resultB = await getTableData(rows)
  const resultTable = _.cloneDeep(resultB?.d?.results)
  // tableObj.tableData = resultTable
  resultTable?.forEach((item) => {
    item.Operation = 'C'
    // item.Jewhmx = [] // 金额维护明细
  })
  tableObj.tableData = _.concat(tableObj.tableData, resultTable)
  // 新增行时加载的树弹框数据
  tableObj.treeData = tableObj.tableData
  // 将数据转换成树形
  const items = tableObj.tableData.filter((ob: any) => ob.Zzybm === tabsData.value[0].Zzybm)
  tableObj.tableTreeData = listToTree(items, 'Zbm', 'Zfjbm')
  isShowTable.value = true // 合同选择之后加载表格
}

// 维护专业页签弹框功能 end

const handleNext = () => {
  formObj.formData.Zdjlx = '02' // 单据类型
  treeTableRef.value.expendFloor()
}

// 监听k2组件的初始化
/* 电子签章逻辑 */
watch(
  () => props.initStatus,
  (newVal: any) => {
    // 审批页面的k2是否初始化完成
    if (newVal === 'READY') {
      num.value = props.Hguid
      k2InitData()
    }
  },
  {
    immediate: true,
    deep: true
  }
)

</script>
<style scoped>
.common-app{
  height: calc(100% - 60px) !important;
}
</style>
