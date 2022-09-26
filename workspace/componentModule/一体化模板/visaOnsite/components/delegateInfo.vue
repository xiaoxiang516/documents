<template>
  <div>
    <div v-if="delegateFormExist">
      <common-head title="委派信息-共享平台"></common-head>
      <common-form
        ref="delegateForm"
        :schema="schema"
        :formSchema="delegateInfoObj.formSchema"
        :form-ui-schema="delegateInfoObj.formUiSchema"
        :formData="formData"
        :label-mode="labelMode"
        labelWidth="auto"
        :rules="delegateInfoObj.itemInfoRules"
      >
      </common-form>
      <div class="tip_container">
        <p class="title">说明：委托流程类型</p>
        <p>
          1、大区平台初审-平台总部复审:区域成本(委托)-大区平台(初审)-大区平台(对数)-平台总部(复审)-平台总部(对数)-平台总部(终审)
        </p>
        <p>
          2、仅大区平台审核:区域成本(委托)-大区平台(审核)-大区平台(对数)-大区平台(终审)
        </p>
        <p>
          3、仅平台总部初审:区域成本(委托)-平台总部(初审)-平台总部(对数)-平台总部(终审)
        </p>
        <p>
          4、仅平台总部复审:区域成本(委托)-平台总部(复审)-平台总部(对数)-平台总部(终审)
        </p>
      </div>
    </div>

    <div v-if="outerDelegateFormExist">
      <common-head title="委派信息-外部咨询"></common-head>
      <common-form
        ref="outerDelegateForm"
        :schema="schema"
        :formSchema="outerDelegateInfoObj.formSchema"
        :form-ui-schema="outerDelegateInfoObj.formUiSchema"
        :formData="formData"
        :label-mode="labelMode"
        labelWidth="auto"
        :rules="outerDelegateInfoObj.itemInfoRules"
      >
        <template #ZxhtIdTxt>
          <el-input :value="formData.ZxhtIdTxt" readonly>
            <template #append>
              <el-button
                :icon="Search"
                @click="() => contractDialog.showDialog(true)"
              ></el-button>
            </template>
          </el-input>
        </template>
      </common-form>
    </div>

    <contract-search-dialog
      ref="contractDialog"
      @on-contract-selected="onContractSelected"
    ></contract-search-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonForm from '@/components/CommonForm.vue'
import { Search } from '@element-plus/icons-vue'
import ContractSearchDialog from '@/views/co/contractPerformance/components/ContractSearchDialog.vue'
import { judgeFormVisible } from '../../utils/k2CfgUtil'
import { getDataNoFilter } from '@/api/common/useRequest'
import {
  validateNumber,
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
  },
  helpList: {
    type: Object,
    required: false,
    default: () => {
      return {}
    }
  }
})

const delegateForm: any = ref<null | HTMLElement>(null)
const outerDelegateForm: any = ref<null | HTMLElement>(null)
const contractDialog: any = ref<null | HTMLElement>(null)

const delegateFormVisible = computed(() =>
  judgeFormVisible(delegateInfoObj.formSchema, delegateInfoObj.formUiSchema)
)
const outerDelegateFormVisible = computed(() =>
  judgeFormVisible(
    outerDelegateInfoObj.formSchema,
    outerDelegateInfoObj.formUiSchema
  )
)

// 委派信息-共享平台
const delegateFormExist = computed(
  () => props.formData.Iswtpt === '02' && delegateFormVisible.value
)
// 委派信息-外部咨询
const outerDelegateFormExist = computed(
  () => props.formData.Iswtpt === '03' && outerDelegateFormVisible.value
)

// 委派信息
const delegateInfoObj = reactive({
  formSchema: [
    'Fbmc', // 分部名称
    'Fbfzr', // 分部负责人
    'Wtfw', // 委托范围
    'Wtlx' // 流程委托类型
  ] as any[],
  formUiSchema: {
    // 分部名称
    Fbmc: {
      'event:change': () => {
        const formData = props.formData

        const findItem = props.helpList.Fbfzr?.find(
          (item) => item.const === formData.Fbmc
        )
        formData.Fbfzr = findItem?.title || ''
      },
      'ui:hidden': () => {
        return props.schema.properties.Fbmc.hidden
      },
      'ui:disabled': computed(() => !props.schema.properties.Fbmc.creatable)
    },
    // 分部负责人
    Fbfzr: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return props.schema.properties.Fbfzr.hidden
      }
    },
    // 委托范围
    Wtfw: {
      'ui:disabled': computed(() => !props.schema.properties.Wtfw.creatable),
      'ui:hidden': () => {
        return props.schema.properties.Wtfw.hidden
      }
    },
    // 流程委托类型
    Wtlx: {
      'ui:disabled': computed(() => !props.schema.properties.Wtlx.creatable),
      'ui:hidden': () => {
        return props.schema.properties.Wtlx.hidden
      }
    }
  },
  itemInfoRules: {
    Fbmc: [{ required: props.schema.properties.Fbmc.required, message: '请选择分部名称', trigger: 'blur' }],
    // Wtlx: [{ required: true, message: '请选择流程委托类型', trigger: 'blur' }],
    Wtfw: [
      { validator: validateLength, property: props.schema.properties.Wtfw }
    ]
  } as any
})

// 外部委派信息
const outerDelegateInfoObj = reactive({
  formSchema: [
    'ZxhtIdTxt', // 咨询合同名称
    'ZxgsIdTxt', // 咨询公司名称
    'ZxgsTel', // 咨询公司电话
    'SDat', // 开始时间
    'WcscYq', // 要求完成时长
    'FDat' // 截至完成日期
  ] as any[],
  formUiSchema: {
    // 咨询合同名称
    ZxhtIdTxt: {
      slot: computed(() => !props.labelMode && props.schema.properties.ZxhtIdTxt.creatable),
      'ui:disabled': true,
      'ui:hidden': () => {
        return props.schema.properties.ZxhtIdTxt.hidden
      }
    },
    // 咨询公司名称
    ZxgsIdTxt: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return props.schema.properties.ZxgsIdTxt.hidden
      }
    },
    // 咨询公司电话
    ZxgsTel: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return props.schema.properties.ZxgsTel.hidden
      }
    },
    // 开始时间
    SDat: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return props.schema.properties.SDat.hidden
      }
    },
    // 要求完成时长
    WcscYq: {
      'ui:disabled': computed(() => !props.schema.properties.WcscYq.creatable),
      'ui:hidden': () => {
        return props.schema.properties.WcscYq.hidden
      }
    },
    // 截至完成日期
    FDat: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return props.schema.properties.FDat.hidden
      }
    }
  },
  itemInfoRules: {
    ZxhtIdTxt: [{ required: props.schema.properties.ZxhtIdTxt.required, message: '请选择咨询合同', trigger: 'blur' }],
    WcscYq: [
      { required: props.schema.properties.WcscYq.required, message: '请输入要求完成时长', trigger: 'blur' },
      {
        validator: validateLength,
        property: props.schema.properties.WcscYq,
        trigger: 'blur'
      }
    ]
  } as any
})

// 表格必填校验
const validData = () => {
  if (delegateFormExist.value) {
    return delegateForm.value.validateForm()
  }

  if (outerDelegateFormExist.value) {
    return outerDelegateForm.value.validateForm()
  }

  return true
}

const onContractSelected = async (contractInfo) => {
  const formData = props.formData

  // 咨询合同名称
  formData.ZxhtId = contractInfo.ZCON_NO
  formData.ZxhtIdTxt = contractInfo.ZCON_NAME

  // // 咨询公司名称
  // formData.ZxgsId = contractInfo.PROVIDER_NO2
  // formData.ZxgsIdTxt = contractInfo.PROVIDER2

  // 咨询公司电话
  // formData.ZxgsTel = contractInfo.PROVIDER2

  await getDataNoFilter(
    'ZFLY_COMMON_SRV',
    `GetZxhtInfo?Hguid='${contractInfo.HGUID}'&$format=json`
  ).then((res) => {
    // console.log('获取乙方电话号码:', res)
    formData.ZxgsId = res.d.Lifnr
    formData.ZxgsIdTxt = res.d.LifnrName
    formData.ZxgsTel = res.d.Zgsdh
  })

  outerDelegateForm.value.validateForm()
}

defineExpose({
  validData
})
</script>

<style lang="scss" scoped>
.tip_container {
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;

  .title {
    font-size: 16px;
    color: #a30014;
  }
}
</style>
