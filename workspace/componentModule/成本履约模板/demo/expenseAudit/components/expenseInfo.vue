<template>
  <div>
    <common-head class="spread" title="费用信息" @click="isSpread = !isSpread">
      <span class="spread-text">{{ isSpread ? '展开' : '收起' }}</span>
      <el-icon><ArrowUp v-if="isSpread" /> <ArrowDown v-else /></el-icon>
    </common-head>
    <common-form
      :class="{ 'form-active': isSpread }"
      ref="contractInfoRef"
      v-if="pageObjInj.schemas[pageObjInj.entityIds.indexOf('FyshHead')]"
      :schema="pageObjInj.schemas[pageObjInj.entityIds.indexOf('FyshHead')]"
      :formSchema="formObj.formSchema"
      :form-ui-schema="formObj.formUiSchema"
      :formData="formObj.formData"
      formLabelWidth="auto"
      :rules="formObj.itemInfoRules"
    >
    </common-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeUpdate, onMounted, computed, provide, inject } from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonForm from '@/components/CommonForm.vue'

const isSpread = ref(false)
const pageObjInj = inject('expenseAudit:detail:pageObj')
const scheme = pageObjInj.schemas[pageObjInj.entityIds.indexOf('FyshHead')]
console.log('---pageObjInj--', pageObjInj)
// console.log('schemas---FyshHead', pageObjInj.schemas[pageObjInj.entityIds.indexOf('FyshHead')])
//
const formObj = reactive({
  schemas: [] as any,
  formSchema: [
    'FyfxlbNum', //费用风险类别
    // '', //费用类型
    'EyqxTxt', //恶意情形
    'SfczwxTxt', // 是否存在无效成本
    'PercentLjsp', //已审定索赔金额占合同金额比
    'ShjzdfQy', //区域审核建筑单方（元/m2）
    'PercentHjQy', //区域对施工单位核减率
    'AmountLjsp', //累计已审定索赔金额（不含本单）
    'ShjzdfJt', //集团审核建筑单方（元/m2）
    'PercentHjJt', //集团对区域单位核减率

  ] as any[],
  formUiSchema: {

    // 费用类型 选人才机就是X ,否则是空
  },
  formData: {},
  itemInfoRules: {
    // 必填
    Description: [{ required: true, message: '', trigger: 'change' }],
  } as any
})
formObj.formData = pageObjInj.formData
</script>

<style lang="scss" scoped>

</style>
