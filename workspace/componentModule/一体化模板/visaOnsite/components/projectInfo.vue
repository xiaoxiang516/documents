 <template>
  <div v-if="formVisible">
    <common-head title="工程基本信息"></common-head>
    <common-form
      ref="basicForm"
      :schema="schema"
      :formSchema="projectInfoObj.formSchema"
      :form-ui-schema="projectInfoObj.formUiSchema"
      :formData="formData"
      :label-mode="labelMode"
      labelWidth="auto"
      :rules="projectInfoObj.itemInfoRules"
      >

      <template v-slot:OrderNum>
        <el-link type="primary" @click="onOrderNumClick">{{formData.OrderNum}}</el-link>
      </template>

      <template v-slot:ContractIdTxt>
        <el-input :value="formData.ContractIdTxt" readonly>
          <template #append>
            <el-button :icon="Search" @click="() => contractDialog.showDialog()"></el-button>
          </template>
        </el-input>
      </template>
    </common-form>

    <contract-search-dialog ref="contractDialog" @on-contract-selected="onContractSelected"></contract-search-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonForm from '@/components/CommonForm.vue'
import { judgeFormVisible } from '../../utils/k2CfgUtil'
import {
  validateLength,
  validateYesOrNo
} from '../../utils/ruleUtil'
import ContractSearchDialog from '../../components/ContractSearchDialog.vue'
import { showMessageError } from '@/utils/messageUtil'

const prop = defineProps({
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

const basicForm: any = ref<null | HTMLElement>(null)
const contractDialog: any = ref<null | HTMLElement>(null)

const formVisible = computed(() => judgeFormVisible(projectInfoObj.formSchema, projectInfoObj.formUiSchema))

const validateDateRange = (rule: any, value: any, callback: any) => {
  const { message } = rule
  const { VisaJhkgXm, VisaJhwgXm } = prop.formData
  if (VisaJhkgXm && VisaJhwgXm) {
    VisaJhkgXm <= VisaJhwgXm ? callback() : callback(new Error(message))
  } else {
    callback()
  }
}

// 工程基本信息
const projectInfoObj = reactive({
  formSchema: [
    'ContractIdTxt', // 合同名称
    'ContractId', // 合同编号
    'YfdwIdTxt', // 施工单位名称
    'ZbukrsTxt', // 所属区域
    'PosidTxt', // 项目名称
    'FqnumTxt', // 分期名称
    'VisaMajors', // 专业类型（流程类型）
    'VisaBilltype', // 单据类型
    'VisaNum', // 签证变更申报编号
    'VisaReasonId', // 签证变更类型
    'VisaJhkgXm', // 要求开工日期
    'VisaJhwgXm', // 要求完工日期
    'Iscsfqz', // 是否产生负签证
    'VisaName', // 签证变更申报主题
    'VisaBgfw', // 签证变更涉及范围
    'VisaBgyy', // 签证变更详述
    'SubmPltfm', // 提报端口
    'Operator', // 经办人
    'Zerdat', // 经办日期
    'Depart', // 经办部门
    'Status', // 审批状态
    'NoentryId', // 未列项单据编号
    'OrderNum' // 指令单编号
  ] as any [],
  formUiSchema: {
    // 合同名称
    ContractIdTxt: {
      slot: computed(() => !prop.labelMode && prop.schema.properties.ContractIdTxt.creatable),
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.ContractIdTxt.hidden
      }
    },

    // 合同编号
    ContractId: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.ContractId.hidden
      }
    },

    // 施工单位名称
    YfdwIdTxt: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.YfdwIdTxt.hidden
      }
    },

    // 所属区域
    ZbukrsTxt: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.ZbukrsTxt.hidden
      }
    },

    // 项目名称
    PosidTxt: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.PosidTxt.hidden
      }
    },

    // 分期名称
    FqnumTxt: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.FqnumTxt.hidden
      }
    },

    // 专业类型（流程类型）
    VisaMajors: {
      'ui:disabled': computed(() => !prop.schema.properties.VisaMajors.creatable),
      'ui:hidden': () => {
        return prop.schema.properties.VisaMajors.hidden
      },
      'event:change': () => {
        KStarForm.vmFormData.vmFormContent.JS_ProjectType = prop.formData.VisaMajors
      }
    },

    // 单据类型
    VisaBilltype: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.VisaBilltype.hidden
      }
    },

    // 签证变更申报编号
    VisaNum: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.VisaNum.hidden
      }
    },

    // 签证变更类型
    VisaReasonId: {
      'ui:hidden': () => {
        return prop.schema.properties.VisaReasonId.hidden
      },
      'ui:disabled': computed(() => !prop.schema.properties.VisaReasonId.creatable)
    },

    // 要求开工日期
    VisaJhkgXm: {
      'ui:hidden': () => {
        return prop.schema.properties.VisaJhkgXm.hidden
      },
      'ui:disabled': computed(() => !prop.schema.properties.VisaJhkgXm.creatable)
    },

    // 要求完工日期
    VisaJhwgXm: {
      'ui:hidden': () => {
        return prop.schema.properties.VisaJhwgXm.hidden
      },
      'ui:disabled': computed(() => !prop.schema.properties.VisaJhwgXm.creatable)
    },

    // 是否产生负签证
    Iscsfqz: {
      'ui:hidden': () => {
        return prop.schema.properties.Iscsfqz.hidden
      },
      'ui:disabled': computed(() => !prop.schema.properties.Iscsfqz.creatable)
    },

    // 签证变更申报主题
    VisaName: {
      span: 24,
      'ui:widget': 'textarea',
      'ui:rowspan': 2,
      'ui:hidden': () => {
        return prop.schema.properties.VisaName.hidden
      },
      'ui:disabled': computed(() => !prop.schema.properties.VisaName.creatable)
    },

    // 签证变更涉及范围
    VisaBgfw: {
      span: 24,
      'ui:widget': 'textarea',
      'ui:rowspan': 2,
      'ui:hidden': () => {
        return prop.schema.properties.VisaBgfw.hidden
      },
      'ui:disabled': computed(() => !prop.schema.properties.VisaBgfw.creatable)
    },

    // 签证变更详述
    VisaBgyy: {
      span: 24,
      'ui:widget': 'textarea',
      'ui:rowspan': 3,
      'ui:hidden': () => {
        return prop.schema.properties.VisaBgyy.hidden
      },
      'ui:disabled': computed(() => !prop.schema.properties.VisaBgyy.creatable)
    },

    // 提报端口
    SubmPltfm: {
      'ui:disabled': computed(() => !prop.schema.properties.SubmPltfm.creatable),
      'ui:hidden': () => {
        return prop.schema.properties.SubmPltfm.hidden
      }
    },

    // 经办人
    Operator: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.Operator.hidden
      }
    },

    // 经办日期
    Zerdat: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.Zerdat.hidden
      }
    },

    // 经办部门
    Depart: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.Depart.hidden
      }
    },

    // 审批状态
    Status: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.Status.hidden
      }
    },

    // 未列项单据编号
    NoentryId: {
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.NoentryId.hidden
      }
    },

    // 指令单编号
    OrderNum: {
      slot: computed(() => prop.formData.Status === '50'),
      'ui:disabled': true,
      'ui:hidden': () => {
        return prop.schema.properties.OrderNum.hidden
      }
    }
  },
  itemInfoRules: {
    ContractIdTxt: [
      {
        required: prop.schema.properties.ContractIdTxt.required,
        message: '请选择合同',
        trigger: 'blur'
      }
    ],
    VisaMajors: [
      {
        required: prop.schema.properties.VisaMajors.required,
        message: '请选择专业类型（流程类型）',
        trigger: 'blur'
      }
    ],
    VisaReasonId: [
      {
        required: prop.schema.properties.VisaReasonId.required,
        message: '请选择签证变更类型',
        trigger: 'blur'
      }
    ],
    VisaJhkgXm: [
      {
        required: prop.schema.properties.VisaJhkgXm.required,
        message: '请输入要求开工日期',
        trigger: 'blur'
      },
      { validator: validateDateRange, message: '开工日期必须小于完工日期', trigger: 'change' }
    ],
    VisaJhwgXm: [
      {
        required: prop.schema.properties.VisaJhwgXm.required,
        message: '请输入要求完工日期',
        trigger: 'blur'
      },
      { validator: validateDateRange, message: '完工日期必须大于开工日期', trigger: 'change' }
    ],
    Iscsfqz: [
      {
        required: prop.schema.properties.Iscsfqz.required,
        message: '请选择是否产生负签证',
        validator: validateYesOrNo,
        trigger: 'blur'
      }
    ],
    VisaName: [
      { required: prop.schema.properties.VisaName.required, message: '请输入签证变更申报主题', trigger: 'blur' },
      {
        validator: validateLength,
        property: prop.schema.properties.VisaName,
        trigger: 'blur'
      }
    ],
    VisaBgfw: [
      { required: prop.schema.properties.VisaBgfw.required, message: '请输入签证变更涉及范围', trigger: 'blur' },
      {
        validator: validateLength,
        property: prop.schema.properties.VisaBgfw,
        trigger: 'blur'
      }
    ],
    VisaBgyy: [
      { required: prop.schema.properties.VisaBgyy.required, message: '请输入签证变更详述', trigger: 'blur' },
      {
        validator: validateLength,
        property: prop.schema.properties.VisaBgyy,
        trigger: 'blur'
      }
    ]
  } as any
})

const onOrderNumClick = () => {
  showMessageError('功能开发中，请勿提 bug')
}

const onContractSelected = (contractInfo) => {
  const formData = prop.formData
  // 合同
  formData.ContractGuid = contractInfo.HGUID
  formData.ContractId = contractInfo.ZCON_NO
  formData.ContractIdTxt = contractInfo.ZCON_NAME

  // 施工单位名称
  formData.YfdwId = contractInfo.PROVIDER_NO2
  formData.YfdwIdTxt = contractInfo.PROVIDER2

  // 所属区域
  formData.Zbukrs = contractInfo.ZSSQY
  formData.ZbukrsTxt = contractInfo.ZSSQY_NA

  // 项目名称
  formData.Posid = contractInfo.ZXMZJ
  formData.PosidTxt = contractInfo.ZXMZJ_NA

  // 分期
  formData.Fqnum = contractInfo.ZBM
  formData.FqnumTxt = contractInfo.ZBM_NA

  // fixme 将合同中 是否使用清单系统 Isqd 字段默认带过来
  formData.Isqd = ''
}

// 表格必填校验
const validData = () => {
  return basicForm.value.validateForm()
}

defineExpose({
  validData
})
</script>

<style lang="scss" scoped>
</style>
