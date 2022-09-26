<template>
  <div class="common-app">
    <common-search-page
      ref="searchRef"
      :schema="pageObj.schema"
      :tableSchema="pageObj.tableSchema"
      :table-ui-schema="pageObj.tableUiSchema"
      :getRowButton="getRowButton"
      :tableRules="pageObj.tableRules"
      :pageSize="10"
      :is-auto-search="false"
      :show-pagination="true"
      :auto-pagination="false"
      :customRequest="customRequest"
      :loading="pageObj.isLoading"
      :formSchema="pageObj.formSchema"
      :form-ui-schema="pageObj.formUiSchema"
      :formData="pageObj.formData"
      :conditionRules="pageObj.conditionRules"
      :url="pageObj.url"
      :exportButton="false"
      :labelMode="true"
      formLabelWidth="auto"
      labelWidth="150px"
      rowKey="Guid"
      valueKey="Guid"
      @on-reset-sucess="onResetSucess"
      @row-control-button-click="onRowControlButtonClick">

      <template #condition_Zbukrs>
        <el-input :value="pageObj.formData.Zbukrs" readonly>
            <template #append>
              <el-button :icon="Search" @click="() => orgDiaRef?.open()"></el-button>
            </template>
        </el-input>
      </template>

      <template #condition_PhaseTx>
        <el-input :value="pageObj.formData.PhaseTx" clearable readonly>
            <template #append>
              <el-button :icon="Search" @click="() => fenQiDiaRef?.showDialog(getFenQiParam())"></el-button>
            </template>
        </el-input>
      </template>

      <template #condition_Zerdat>
        <el-date-picker
          v-model="pageObj.formData.Zerdat"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYYMMDD"
        >
        </el-date-picker>
      </template>

      <template v-slot:batchControl>
        <el-tabs v-model="activeName" @tab-click="onTabHandleClick">
            <el-tab-pane v-for="item in tabPaneList" :key="item.name" v-bind="item">
                <template v-slot:label>
                    {{item.label}} ({{item.number||0}})
                </template>
            </el-tab-pane>
        </el-tabs>
        <el-button type="primary" @click="addSignButton">新增现场签证</el-button>
      </template>
    </common-search-page>

    <ibpm-toolbarbtn :ibpmformdata="K2Form.formData"></ibpm-toolbarbtn>

    <open-close-dialog
      v-if="dialogFlag"
      ref="openCloseDialogRef"
      @handle-publish-k2="publishK2"
      ></open-close-dialog>

    <!-- 区域弹窗 -->
    <organization-tree-dialog :lazy="true" ref="orgDiaRef" @save="handleOrgSelectSave"></organization-tree-dialog>

    <!-- 分期弹窗 -->
    <fen-qi-search-dialog ref="fenQiDiaRef" @selectedRow="handleFenQiRow"></fen-qi-search-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeMount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { cloneDeep, merge, debounce, last, pick } from 'lodash'
import { ODATA } from '@/constant/common'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'
import CommonSearchPage from '@/components/CommonSearchPage.vue'
import OrganizationTreeDialog from '@/components/OrganizationTreeDialog.vue'
import FenQiSearchDialog from '@/components/FenQiSearchDialog.vue'
import { Search } from '@element-plus/icons-vue'
import { showMessageSuccess, showMessageError } from '@/utils/messageUtil'
import { getDataRes, postDataWithRetMsg } from '@/api/common/useRequest'
import {
  getDomains,
  mergeDomainsInSchema,
  getSchemaByEntityId,
  getFilterStringByObjectAndSchema
} from '@/utils/odataUtilCommon'
import moment from 'moment'
import OpenCloseDialog from '../components/OpenCloseDialog.vue'
import {
  k2Init,
  K2Form,
  onK2Submit
} from '@/utils/k2Util'

const props = defineProps({
  router: Object
})

const SEARCH_CONDITION_KEY = 'visa-onsite-list-key-condition'
const PANE_TAB = {
  ALL: 'ALL',
  UNSUBMIT: '10',
  PENDING: '20',
  PASSED: '50'
}
const ROW_BUTTON_KEY = {
  VIEW: 0,
  MODIFY: 1,
  DELETE: 2,
  VIEW_K2: 3,
  OPEN_CLOSE: 4
}

const store = useStore()
const router = useRouter() || props.router

const openCloseDialogRef = ref()
const orgDiaRef = ref<typeof OrganizationTreeDialog | null>(null)
const fenQiDiaRef = ref<typeof FenQiSearchDialog | null>(null)
const dialogFlag = ref(false)

const activeName = ref(PANE_TAB.ALL)
const tabPaneList = reactive([
  { label: '全部', name: PANE_TAB.ALL, number: 0 },
  { label: '未提交', name: PANE_TAB.UNSUBMIT, number: 0 },
  { label: '审批中', name: PANE_TAB.PENDING, number: 0 },
  { label: '审批通过', name: PANE_TAB.PASSED, number: 0 }
])

// 待提交开完工流程的guid
const openCloseGuid = ref('')

const pageObj = reactive({
  schema: {} as any,
  tableSchema: [
    'Zbukrs', // 所属区域
    'ProjTx', // 项目名称
    'PhaseTx', // 分期名称
    'ContractId', // 合同编号
    'ZconName', // 合同名称
    'VisaNum', // 签证变更申报编号
    'VisaName', // 签证变更申报主题
    'Isfqz', // 是否为负签证
    'VisaReasonId', // 签证变更类型
    'StatusDj', // 单据状态
    'Status', // 审批状态
    'OrderNum', // 指令单编号
    'StatusCf', // 变更申报拆分状态
    'Sbje', // 施工单位申报金额(含增值税)
    'VisaAmtSgdw', // 施工单位申报金额(不含增值税)
    'Zsje', // 签证变更终审金额(含增值税)
    'VisaAmt', // 签证变更终审金额(不含增值税)
    'Operator', // 经办人
    'Zerdat' // 经办时间
  ] as any[],
  tableUiSchema: {
    operation: {
      width: 200
    }
  },
  tableRules: {} as any,
  tableData: [] as object[],

  formSchema: [
    'Zbukrs', // 所属区域
    'ProjTx', // 项目名称
    'PhaseTx', // 分期名称
    'ZconName', // 合同名称
    'ContractId', // 合同编号
    'Lifnr', // 施工单位名称
    'VisaName', // 签证变更申报主题
    'VisaReasonId', // 签证变更类型
    'VisaNum', // 签证变更申报编号
    'StatusDj', // 单据状态
    'Zerdat' // 经办日期
  ],
  formUiSchema: {
    Zbukrs: {
      slot: true,
      span: 6
    },
    ProjTx: {
      span: 6
    },
    PhaseTx: {
      slot: true,
      span: 6
    },
    ContractId: {
      span: 6
    },
    ZconName: {
      span: 6
    },
    Lifnr: {
      span: 6
    },
    VisaName: {
      span: 6
    },
    VisaReasonId: {
      span: 6
    },
    VisaNum: {
      span: 6
    },
    StatusDj: {
      span: 6
    },
    Zerdat: {
      span: 6,
      slot: true
    }
  },
  formData: {
    VisaBilltype: '01'
  } as any,
  conditionRules: {},
  url: 'ZFLY_VISA_DESIGN_SRV/VisaHeadSet',
  isLoading: false
})

onBeforeMount(() => {
  const lastSearchCondition = JSON.parse(getLocalStorage(SEARCH_CONDITION_KEY) || '{}')
  if (lastSearchCondition.Status) {
    activeName.value = lastSearchCondition.Status
  }

  merge(pageObj.formData, lastSearchCondition)
})

onMounted(async () => {
  await k2Init('LY0002', '开完工管理审批', beforeK2, afterK2)
  await getSchema()
})

const getSchema = async () => {
  const schema = await getSchemaByEntityId('ZFLY_VISA_DESIGN_SRV', 'VisaHeadList')
  schema.properties.Lifnr.title = '供应商名称'
  schema.properties.VisaReasonId.title = '签证变更类型'
  schema.properties.Zerdat.title = '经办日期'

  schema.properties.OrderNum.title = '指令单编号'
  schema.properties.Sbje.title = '施工单位送审金额\n(含增值税)'
  schema.properties.VisaAmtSgdw.title = '施工单位送审金额\n(不含增值税)'
  schema.properties.Zsje.title = '签证变更审核金额\n(含增值税)'
  schema.properties.VisaAmt.title = '签证变更审核金额\n(不含增值税)'

  schema.properties.Sbje.format = 'price'
  schema.properties.VisaAmtSgdw.format = 'price'
  schema.properties.Zsje.format = 'price'
  schema.properties.VisaAmt.format = 'price'

  schema.properties.Zerdat.type = 'date'
  pageObj.schema = schema

  const domainList = await getDomains('ZFLY_COMMON_SRV', 'DomainListSet')
  pageObj.schema.properties = mergeDomainsInSchema(pageObj.schema, domainList)

  // 拿到 schema 数据，刷新表格数据
  reloadData()
}

const getRowButton = (row) => {
  const username = store.state.user.username
  const { Status, StatusDj, FormId, KwgGuid, Operator } = row

  const viewButton = { key: ROW_BUTTON_KEY.VIEW, label: '查看' }
  const modifyButton = { key: ROW_BUTTON_KEY.MODIFY, label: '修改' }
  const deleteButton = { key: ROW_BUTTON_KEY.DELETE, label: '删除', tip: '是否确定删除当前数据' }
  const viewK2Button = { key: ROW_BUTTON_KEY.VIEW_K2, label: '查看审批' }
  const openCloseButton = { key: ROW_BUTTON_KEY.OPEN_CLOSE, label: '开/完工' }

  const buttons = [viewButton]

  if (Operator === username) {
    if (Status === '10') { // 草稿中
      buttons.push(modifyButton, deleteButton)
    }

    if (Status === '40' || Status === '41') { // 审批驳回 及 驳回重走
      buttons.push(modifyButton)
    }
  }

  if (FormId) {
    buttons.push(viewK2Button)
  }

  if (StatusDj === '140' && KwgGuid) {
    buttons.push(openCloseButton)
  }

  return buttons
}

const onRowControlButtonClick = (key, scope) => {
  if (key === ROW_BUTTON_KEY.VIEW) {
    router.push({
      path: 'visa-onsite-detail',
      query: {
        guid: scope.row.Guid,
        modeType: 'view'
      }
    })
  }

  if (key === ROW_BUTTON_KEY.MODIFY) {
    const query = {
      guid: scope.row.Guid,
      modeType: 'edit'
    } as any

    if (scope.row.FormId) {
      query.formId = scope.row.FormId
    }

    router.push({
      path: 'visa-onsite-detail',
      query
    })
  }

  if (key === ROW_BUTTON_KEY.DELETE) {
    postDataWithRetMsg('ZFLY_VISA_DESIGN_SRV', 'VisaHeadSet', {
      BatchGuid: [
        { Guid: scope.row.Guid }
      ],
      Operation: 'DELETE'
    }).then((res:any) => {
      const results = res?.d?.RetMsgSet?.results || []

      if (results.length === 0 || results[0].Type === 'S') {
        showMessageSuccess('数据删除成功')
        reloadData()
      } else {
        showMessageError(results[0].MessageTxt || '数据删除失败')
      }
    }).catch(() => {
      showMessageError('数据删除失败')
    })
  }

  if (key === ROW_BUTTON_KEY.VIEW_K2) {
    const url = router.resolve({
      name: 'k2VisaOnsiteReview',
      query: {
        FormId: scope.row.FormId
      }
    })
    window.open(url.href, '_blank')
  }

  if (key === ROW_BUTTON_KEY.OPEN_CLOSE) {
    dialogFlag.value = true
    nextTick(() => {
      const { KwgGuid, KwgTy = 'K' } = scope.row
      openCloseDialogRef.value.showDialog(KwgGuid, KwgTy)
    })
  }
}

const searchRef: any = ref<null | HTMLElement>(null)

const getFenQiParam = () => {
  const param = {
    Zbukrs: pageObj.formData.ZbukrsID,
    AoxmDesc: pageObj.formData.ProjTx
  }

  return param
}

// 组织区域选择
const handleOrgSelectSave = (currentData, id, name) => {
  Object.assign(pageObj.formData, {
    Zbukrs: last(name),
    ZbukrsID: last(id)
  })
}

// 分期选择
const handleFenQiRow = (row) => {
  if (row.length) {
    pageObj.formData.PhaseTx = row[0].AofqDesc
  }
}

// 重置
const onResetSucess = () => {
  pageObj.formData = {
    VisaBilltype: '01'
  }
}

// 新增签证信息
const addSignButton = () => {
  router.push({
    path: 'visa-onsite-detail'
  })
}

// 页签切换
const onTabHandleClick = () => reloadData()

const reloadData = debounce(() => searchRef.value?.searchData(), 300)

// 自定义请求
const customRequest = () => {
  pageObj.isLoading = true

  // 请求参数
  const queryForm = cloneDeep(pageObj.formData)
  if (activeName.value !== PANE_TAB.ALL) {
    queryForm.Status = activeName.value
  } else {
    queryForm.Status = null
  }

  // 保存当前的请求参数，用于下次回到该页面时带出查询条件
  setLocalStorage(SEARCH_CONDITION_KEY, JSON.stringify(queryForm))

  let currentSearchFilter = getFilterStringByObjectAndSchema(
    pick(queryForm, [...pageObj.formSchema, 'Status', 'VisaBilltype']),
    pageObj.schema.properties || {},
    false,
    null
  )
  // 后端分页情况
  const skip = (searchRef.value.innerPageNum - 1) * searchRef.value.innerPageSize
  const top = searchRef.value.innerPageSize
  currentSearchFilter += ODATA.WITH + ODATA.SKIP_EQ + skip + ODATA.WITH + ODATA.TOP_EQ + top

  return getDataRes('ZFLY_VISA_DESIGN_SRV', 'VisaHeadListSet', currentSearchFilter).then((res) => {
    const countObj = res?.d?.countobj || {}
    tabPaneList.forEach(element => {
      element.number = Number(countObj[element.name]) || 0
    })
    res.d.count = countObj[activeName.value]

    res.d.results = res.d.results.map((item) => ({
      ...item,
      Zerdat: (!item.Zerdat || item.Zerdat === '00000000') ? '' : moment(item.Zerdat, 'YYYYMMDD').format('YYYY-MM-DD')
    }))

    return res
  }).finally(() => { pageObj.isLoading = false })
}

const publishK2 = (title, guid) => {
  if (guid) {
    openCloseGuid.value = guid
    onK2Submit(title)
  }
}

const beforeK2 = async () => {
  if (openCloseGuid.value) {
    Object.assign(K2Form.entity, {
      Hguid: openCloseGuid.value,
      MessageSet: []
    })

    K2Form.formData.vmFormContent.integrationId = openCloseGuid.value
  }
  return K2Form.entity
}

const afterK2 = async (data, accessUrl, resultData) => {
  if (resultData && resultData.data.Item1 === true) {
    // if (resultData.data.Item2) {
    //   const url = router.resolve({
    //     name: 'k2OpenCloseReview',
    //     query: {
    //       FormId: resultData.data.Item2
    //     }
    //   })
    //   window.open(url.href, '_blank')
    // }
    showMessageSuccess('K2 审批提交成功')
    openCloseDialogRef.value?.closeDialog()
  }
  return true
}
</script>

<style lang="scss" scoped>
</style>
