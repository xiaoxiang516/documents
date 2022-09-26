<template>
  <div>
    <!-- 工程基本信息 -->
    <project-info ref="projectInfoRef" :schema="schema" :formData="formData" :label-mode="labelMode"></project-info>

    <!-- 负签证信息 -->
    <negative-info ref="negativeVisaRef" :schema="schemaFVisa" :formData="formData" :label-mode="labelMode"></negative-info>

    <!-- 成本基本信息 -->
    <cost-info ref="costInfoRef" :schema="schema" :formData="formData" :label-mode="labelMode"></cost-info>

    <!-- 委派信息 -->
    <delegate-info ref="delegateForm" :schema="schema" :formData="formData" :label-mode="labelMode" :helpList="helpList"></delegate-info>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ProjectInfo from './projectInfo.vue'
import NegativeInfo from './negativeInfo.vue'
import CostInfo from './costInfo.vue'
import DelegateInfo from './delegateInfo.vue'

const prop = defineProps({
  schema: {
    type: Object,
    required: true
  },
  schemaFVisa: {
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
  isLoading: {
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

const projectInfoRef:any = ref<null | HTMLElement>(null)
const negativeVisaRef:any = ref<null | HTMLElement>(null)
const costInfoRef:any = ref<null | HTMLElement>(null)
const delegateForm:any = ref<null | HTMLElement>(null)

// 表格必填校验
const validFormData = () => {
  return projectInfoRef.value.validData() &&
  negativeVisaRef.value.validData() &&
  costInfoRef.value.validData() &&
  delegateForm.value.validData()
}

defineExpose({
  validFormData
})
</script>

<style lang="scss" scoped>
</style>
