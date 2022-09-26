<template>
  <common-head :title="type + '决策'"></common-head>
  <common-form
    ref="areaDecisionRef"
    :schema="formObj.schemas"
    :formSchema="formObj.formSchema"
    :form-ui-schema="formObj.formUiSchema"
    :formData="formObj.formData"
    formLabelWidth="auto"
    :rules="formObj.itemInfoRules"
  >
    <template #FaGuid>
      <el-select
        v-if="formObj.formData"
        v-model="formObj.formData.FaGuid"
        clearable
        style="width: 100%"
        @change="aa"
      >
        <el-option
          v-for="item in pageObjInj.formData.SjjcFaSet"
          :key="item.Guid"
          :label="item.SjjcFanum"
          :value="item.Guid"
        ></el-option>
      </el-select>
    </template>
  </common-form>
</template>

<script lang="ts" setup>
import CommonHead from '@/components/CommonHead.vue'
import CommonForm from '@/components/CommonForm.vue'
import { getSchemaByEntityId } from '@/utils/odataUtilCommon'
import {
  ref,
  reactive,
  onMounted,
  inject,
} from 'vue'

const pageObjInj = inject('eventDecision:detail:pageObj')

console.log('项目总决策--pageObjInj', pageObjInj)
const props = defineProps({
  type: {
    type: String,
    default: ''
  }
})
const aa = () => {
  console.log('项目总决策--pageObjInj.formData.SjjcFaxzSet', pageObjInj.formData.SjjcFaxzSet)
}

const areaDecisionRef = ref()
// 基本信息
const formObj = reactive({
  schemas: [] as any,
  formSchema: [
    'FaGuid', // 选择方案
    'Reason' // 项目总意见
  ] as any[],
  formUiSchema: {
    FaGuid: {
      slot: true
    },
    Reason: {
      span: 24,
      'ui:widget': 'textarea',
      'ui:rowspan': 3
    }
  },
  formData: {},
  itemInfoRules: {
    FaGuid: [{ required: true, message: '请选择方案', trigger: 'change' }],
    Reason: [
      { required: true, message: `请输入${props.type}总意见`, trigger: 'blur' }
    ]
  } as any
})
formObj.formData = pageObjInj.formData.SjjcFaxzSet[props.type === '项目' ? 0 : 7]

const getSchema = async () => {
  const schemas = await getSchemaByEntityId('ZFLY_ZYSP_SRV', 'SjjcFaxz')
  formObj.schemas = schemas
  formObj.schemas.properties.FaGuid.title = '选择方案'
  formObj.schemas.properties.Reason.title = `${props.type}总意见`
}

onMounted(async () => {
  await getSchema()
})
</script>

<style lang="scss" scoped></style>
