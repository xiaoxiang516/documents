<template>
  <div v-if="formVisible || tableVisible">
    <common-head title="成本基本信息"></common-head>
    <common-form
      ref="costInfoForm"
      v-if="formVisible"
      :schema="schema"
      :formSchema="costInfoObj.formSchema"
      :form-ui-schema="costInfoObj.formUiSchema"
      :formData="formData"
      :label-mode="labelMode"
      labelWidth="auto"
      :rules="costInfoObj.itemInfoRules"
      >
    </common-form>

    <common-table
        ref="tableRef"
        v-if="tableVisible"
        :schema="schema"
        :tableSchema="tableObj.tableSchema"
        :table-ui-schema="tableObj.tableUiSchema"
        :tableData="showTableData"
        :label-mode="!tableEditFlag"
        :rules="tableObj.itemInfoRules"
        :span-method="objectSpanMethod"
        rowKey="name"
        valueKey="name">
        <template #stage="slotProps">
          <span>{{slotProps.row.stage}}</span>
        </template>
    </common-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import { reduce, pick, last } from 'lodash'
import { judgeFormVisible } from '../../utils/k2CfgUtil'
import {
  validateYesOrNo,
  validateLength
} from '../../utils/ruleUtil'

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

const costInfoForm: any = ref<null | HTMLElement>(null)
const tableRef: any = ref<null | HTMLElement>(null)

// 签证变更 最新的成本数据
const visaTableNotZero = computed(() => props.formData.tableData
  .filter((item) => item.stage === '签证变更申报' && (Number(item.hs | 0) > 0 || Number(item.bhs | 0) > 0))
)

// Isqd='' 手动录入
// Isqd='X' 自动获取
const tableEditFlag = computed(() => !props.labelMode && props.formData.Isqd === '')

const formVisible = computed(() => judgeFormVisible(costInfoObj.formSchema, costInfoObj.formUiSchema))
const tableVisible = computed(() => judgeFormVisible(tableObj.tableSchema, tableObj.tableUiSchema))

const showTableData = computed(() => {
  const tableList: any[] = []
  if (!props.schema.properties.VisaAmtSgdw?.hidden) {
    tableList.push(props.formData.tableData[0])
  }

  if (!props.schema.properties.VisaAmtZjys?.hidden) {
    tableList.push(props.formData.tableData[1])
  }

  if (!props.schema.properties.VisaAmtZjes?.hidden) {
    tableList.push(props.formData.tableData[2])
  }

  if (!props.schema.properties.VisaAmt?.hidden) {
    tableList.push(props.formData.tableData[3])
  }

  return tableList
})

// 成本基本信息
const costInfoObj = reactive({
  formSchema: [
    'Iswtpt', // 委托方式
    'Isqd', // 是否使用清单系统
    'Iswxcb', // 是否存在无效成本
    'Sumje', // 合同累计申报审核金额
    'Qzbgl' // 签证变更率
  ] as any [],
  formUiSchema: {
    // 委托方式
    Iswtpt: {
      'ui:hidden': () => {
        return props.schema.properties.Iswtpt.hidden
      },
      'ui:disabled': computed(() => !props.schema.properties.Iswtpt.creatable),
      'event:change':() => {
        KStarForm.vmFormData.vmFormContent.JS_Entrustedunit =  props.formData.Iswtpt
      }
    },
    // 是否使用清单系统
    Isqd: {
      'ui:hidden': () => {
        return props.schema.properties.Isqd.hidden
      },
      'ui:disabled': computed(() => !props.schema.properties.Isqd.creatable)
    },
    // 是否存在无效成本
    Iswxcb: {
      'ui:hidden': () => {
        return props.schema.properties.Iswxcb.hidden
      },
      'ui:disabled': computed(() => !props.schema.properties.Iswxcb.creatable)
    },
    // 合同累计申报审核金额
    Sumje: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return props.schema.properties.Sumje.hidden
      }
    },

    // 签证变更率
    Qzbgl: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return props.schema.properties.Qzbgl.hidden
      }
    }
  },
  itemInfoRules: {
    Iswtpt: [
      { required: props.schema.properties.Iswtpt.required, message: '请选择委托方式', trigger: 'blur' }
    ],
    Isqd: [
      {
        required: props.schema.properties.Isqd.required,
        message: '请选择是否使用清单系统',
        validator: validateYesOrNo,
        trigger: 'blur'
      }
    ],
    Iswxcb: [
      {
        required: props.schema.properties.Iswxcb.required,
        message: '请选择是否存在无效成本',
        validator: validateYesOrNo,
        trigger: 'blur'
      }
    ]
  } as any
})

// 成本表格
const tableObj = reactive({
  tableSchema: [
    'stage', // 发生阶段
    'name', // 金额类型
    'bhs', // 不含税金额
    'hs', // 含税金额
    'sj', // 税金
    'sl' // 税率
  ],
  tableUiSchema: {
    bhs: {
      precision: 2,
      align: 'right',
      'ui:disabled': (row) => {
        if (props.labelMode) return true

        if (row.name === '施工单位送审金额' && !props.schema.properties.VisaAmtSgdw.creatable) {
          return true
        }

        if (row.name === '造价一审金额' && !props.schema.properties.VisaAmtZjys.creatable) {
          return true
        }

        if (row.name === '造价二审金额' && !props.schema.properties.VisaAmtZjes.creatable) {
          return true
        }

        if (row.name === '申报审核金额' && !props.schema.properties.VisaAmt.creatable) {
          return true
        }

        return false
      }
    },
    hs: {
      precision: 2,
      align: 'right',
      'ui:disabled': (row) => {
        if (props.labelMode) return true

        if (row.name === '施工单位送审金额' && !props.schema.properties.VisaAmtSgdwHs.creatable) {
          return true
        }

        if (row.name === '造价一审金额' && !props.schema.properties.VisaAmtZjysHs.creatable) {
          return true
        }

        if (row.name === '造价二审金额' && !props.schema.properties.VisaAmtZjesHs.creatable) {
          return true
        }

        if (row.name === '申报审核金额' && !props.schema.properties.VisaAmtHs.creatable) {
          return true
        }

        return false
      },
      'event:change': () => {
        KStarForm.vmFormData.vmFormContent.JS_Amount = props.formData.tableData[0].hs
      }
    },
    sj: {
      precision: 2,
      align: 'right'
    },
    sl: {
      precision: 2,
      align: 'right',
      'ui:disabled': true
    }
  },
  itemInfoRules: {
    bhs: [
      {
        validator: validateLength,
        property: props.schema.properties.bhs,
        trigger: 'blur'
      }
    ],
    hs: [
      {
        validator: validateLength,
        property: props.schema.properties.hs,
        trigger: 'blur'
      }
    ],
    sl: [
      {
        validator: validateLength,
        property: props.schema.properties.sl,
        trigger: 'change'
      }
    ]
  }
})

// 计算最新的签证变更金额
watch(visaTableNotZero, (newValue: null | any[]) => {
  const formData = props.formData
  if (newValue && newValue.length) {
    formData.extraInfo.latestHsMoney = Number(last(newValue).hs).toFixed(2)
  } else {
    formData.extraInfo.latestHsMoney = '0.00'
  }
}, { deep: true, immediate: true })

// 计算税金及含税金额
watch(() => props.formData.tableData.map((item) => pick(item, ['bhs', 'hs'])), (newValue) => {
  if (newValue) {
    const formData = props.formData
    formData.tableData.forEach(item => {
      const sj = item.hs - item.bhs

      item.sj = sj.toFixed(2)
      if (item.bhs === 0) {
        item.sl = '0.00'
      } else {
        item.sl = (sj / item.bhs * 100).toFixed(2)
      }
    })
  }
}, { deep: true })

const tableSpanInfo = computed(() => reduce(props.formData.tableData || [], function(result, item, index) {
  if (!result[item.stage]) {
    result[item.stage] = 0
  }
  result[item.stage]++

  return result
}, {}))

// 发生阶段相同的归到同一类
const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex
}) => {
  if (columnIndex === 0) {
    const allTableData = props.formData.tableData || []
    if (rowIndex === 0 || allTableData[rowIndex].stage !== allTableData[rowIndex - 1].stage) {
      return { rowspan: tableSpanInfo.value[row.stage] || 0, colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
}

// 表格必填校验
const validData = () => {
  return costInfoForm.value.validateForm() && tableRef.value.validateTable()
}

defineExpose({
  validData
})
</script>

<style lang="scss" scoped>
:deep(.el-input-number) {
  display: block;
  width: 100%;
}
</style>
