<template>
  <div v-if="negativeVisaExists">
    <common-head title="负签证信息"></common-head>
    <el-space class="button-row" size="large" v-if="tableEditFlag">
      <el-button type="primary" size="large" @click="onAddRowClick">新增行</el-button>
      <el-button type="primary" size="large" @click="onDeleteRowsClick">删除行</el-button>
    </el-space>

    <common-table
      ref="tableRef"
      :schema="schema"
      :tableSchema="tableObj.tableSchema"
      :table-ui-schema="tableObj.tableUiSchema"
      :tableData="formData.to_FVisa"
      :label-mode="labelMode"
      :rules="tableObj.itemInfoRules"
      :selectable="selectable"
      :selection-type="tableSelectionType"
      rowKey="id"
      valueKey="id"
      labelWidth="auto"
      :show-pagination="false"
      :auto-pagination="false"
    >
      <template #FContractIdTxt="{row, index}">
        <el-input v-model="row.FContractIdTxt" readonly>
          <template #append>
            <el-button :icon="Search" @click="() => openContractDialog(index)"></el-button>
          </template>
        </el-input>
      </template>

      <template #FNolNumTxt="{ row, index }">
        <el-input v-model="row.FNolNumTxt" readonly>
          <template #append>
            <el-button :icon="Search" @click="() => openNotifyDialog(index)"></el-button>
          </template>
        </el-input>
      </template>
    </common-table>

    <!-- 合同选择框弹窗 -->
    <contract-search-dialog ref="contractDialog" @on-contract-selected="onContractSelected"></contract-search-dialog>

    <!-- 责任通知单弹窗 -->
    <notice-search-dialog ref="notifyDialog" @on-notice-selected="onNotifySelected"></notice-search-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import { findIndex, pick, last } from 'lodash'
import { Search } from '@element-plus/icons-vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonTable from '@/components/CommonTable.vue'
import ContractSearchDialog from '@/views/co/contractPerformance/components/ContractSearchDialog.vue'
import NoticeSearchDialog from '@/views/co/contractPerformance/components/NoticeSearchDialog.vue'
import { generateUuid } from '@/utils/odataUtilCommon'
import { showMessageError } from '@/utils/messageUtil'
import { judgeFormVisible } from '../../utils/k2CfgUtil'
import { validateLength, validateRange } from '../../utils/ruleUtil'

const props = defineProps({
  schema: {
    type: Object,
    required: true
  },
  formData: {
    type: Object,
    required: true
  },
  labelMode: {
    type: Boolean,
    default: false
  }
})

const tableRef: any = ref<null | HTMLElement>(null)
const contractDialog: any = ref<null | HTMLElement>(null)
const notifyDialog: any = ref<null | HTMLElement>(null)
const currentRowIndex = ref(0)

const negativeVisaExists = computed(() => props.formData.Iscsfqz === 'X' && tableVisible.value)
const tableSelectionType = computed(() => tableEditFlag.value ? 'checkbox' : '')
const showSlot = computed(() => !props.labelMode)

const tableEditFlag = computed(() => {
  if (props.labelMode) return false

  return tableObj.tableUiSchema.FContractIdTxt.slot ||
    tableObj.tableUiSchema.FNolNumTxt.slot ||
    !tableObj.tableUiSchema.FVisaZrbl['ui:disabled']
})

const tableVisible = computed(() => judgeFormVisible(tableObj.tableSchema, tableObj.tableUiSchema))

// 成本表格
const tableObj = reactive({
  tableSchema: [
    'FVisaNum', // 负签证编码
    'FContractIdTxt', // 责任合同
    'FDwmc', // 责任单位名称
    'FNolNumTxt', // 责任通知单
    'FVisaAmt', // 不含税金额(元)
    'FVisaZrbl', // 责任比例(%)
    'FJxse', // 税金(元)
    'FHsje', // 含税金额(元)
    'FSl', // 税率(%)
    'FConState' // 责任合同状态
  ],
  tableUiSchema: {
    FVisaNum: {
      edit: false,
      width: 200
    },
    FContractIdTxt: {
      slot: computed(() => showSlot.value && props.schema.properties.FContractIdTxt?.creatable),
      width: 200
    },
    FDwmc: {
      width: 200
    },
    FNolNumTxt: {
      slot: computed(() => showSlot.value && props.schema.properties.FNolNumTxt?.creatable),
      width: 200
    },
    FVisaAmt: {
      width: 200
    },
    FVisaZrbl: {
      precision: 2,
      width: 200,
      'ui:disabled': computed(() => !showSlot.value || !props.schema.properties.FVisaZrbl?.creatable)
    },
    FJxse: {
      width: 200
    },
    FHsje: {
      precision: 2,
      width: 200
    },
    FSl: {
      width: 200
    },
    FConState: {
      width: 200
    }
  },
  itemInfoRules: {
    FContractIdTxt: [{ required: props.schema.properties.FContractIdTxt.required, message: '请选择责任合同' }],
    FNolNumTxt: [{ required: props.schema.properties.FNolNumTxt.required, message: '请选择责任通知单' }],
    FVisaZrbl: [
      { required: props.schema.properties.FVisaZrbl.required, message: '请输入责任比例' },
      { validator: validateLength, property: props.schema.properties.FVisaZrbl, trigger: 'blur' },
      { validator: validateRange, min: 0, max: 100, trigger: 'change', message: '责任比例需处于0到100' }
    ]
  }
})

// 更新后的 成本数据
const latestCostItem = computed(() => {
  const notZeroList = props.formData.tableData
    .filter((item) => Number(item.bhs | 0) > 0 || Number(item.hs | 0) > 0)

  const latestItem = notZeroList.length ? last(notZeroList) : props.formData.tableData[0]

  return { ...latestItem }
})

// 更新后的 责任比例列表
const tableZrblList = computed(() => props.formData.to_FVisa.map((item) => pick(item, ['FVisaZrbl'])))

// 责任比例变
watch(() => [tableZrblList, latestCostItem], (newValue) => {
  if (newValue) {
    props.formData.to_FVisa.forEach(item => {
      const FVisaZrbl = Number(item.FVisaZrbl || 0)
      item.FVisaAmt = (FVisaZrbl * Number(latestCostItem.value.bhs) / 100).toFixed(2)
      item.FHsje = (FVisaZrbl * Number(latestCostItem.value.hs) / 100).toFixed(2)
      item.FJxse = (item.FHsje - item.FVisaAmt).toFixed(2)
      item.FSl = Number(latestCostItem.value.sl).toFixed(2)
    })
  }
}, { deep: true })

// 判断行是否可选择
const selectable = (row, index) => {
  return true
}

// 新增行
const onAddRowClick = () => {
  const toFVisa = props.formData.to_FVisa
  // fixme test
  toFVisa.push({ id: generateUuid(), FVisaAmt: 0, FVisaZrbl: 0, FSl: 0, FGuid: '' })
}

// 删除行
const onDeleteRowsClick = () => {
  const selectedList = tableRef.value.selectedList.value
  if (selectedList.length) {
    const toFVisa = props.formData.to_FVisa

    selectedList.forEach(deleteItem => {
      const foundIndex = findIndex(toFVisa, item => item.id === deleteItem.id)
      toFVisa.splice(foundIndex, 1)
    })
    tableRef.value.clearSelection()
  }
}

// 合同弹窗
const openContractDialog = (index) => {
  currentRowIndex.value = index
  contractDialog.value.showDialog()
}

const onContractSelected = (contractInfo) => {
  const currentTarget = props.formData.to_FVisa[currentRowIndex.value]

  // 责任合同
  currentTarget.FContractGuid = contractInfo.HGUID
  currentTarget.FContractId = contractInfo.ZCON_NO
  currentTarget.FContractIdTxt = contractInfo.ZCON_NAME

  // 责任单位名称
  currentTarget.FDw = contractInfo.PROVIDER_NO2
  currentTarget.FDwmc = contractInfo.PROVIDER2

  // 合同状态
  // currentTarget.FConState = contractInfo.ZCON_STATE_NA
}

// 责任通知单弹窗
const openNotifyDialog = (index) => {
  currentRowIndex.value = index
  notifyDialog.value.showDialog()
}

const onNotifySelected = (notifyItem) => {
  const currentTarget = props.formData.to_FVisa[currentRowIndex.value]

  // 责任通知单
  currentTarget.FNolNum = notifyItem.Guid
  currentTarget.FNolNumTxt = notifyItem.NolName
}

// 表格必填校验
const validData = () => {
  if (!negativeVisaExists.value) return true

  const inValidList = props.formData.to_FVisa.filter((item) => !item.FContractIdTxt || !item.FNolNumTxt)
  if (!props.formData.to_FVisa?.length || inValidList.length) {
    showMessageError('负签证表格必填校验失败')
    return false
  }

  return tableRef.value.validateTable()
}

defineExpose({
  validData
})
</script>

<style lang="scss" scoped>
.button-row {
  margin-bottom: 16px;
}

:deep(.el-input-number) {
  display: block;
  width: 100%;
}
</style>
