<template>
  <div>
    <common-head class="spread" title="合同信息" @click="isSpread = !isSpread">
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
    'ZconNo', //合同编号
    'ZconName', //合同名称
    'Sgfmc', //施工方名称
    'Sfyszjbg', //是否预算总价包干
    'TaxRate', //税率
    'Htfbbh', //合同范本编号
    'AmountLjyf', //累计应付工程款（元）
    'AmountYfwf', //应付未付金额（元）
    'PercentLjyf', //累计应付工程款占合同金额的比例（%）
    'Description', //备注 费用申报说明?
  ] as any[],
  formUiSchema: {},
  formData: {},
  itemInfoRules: {
    // 必填
    Description: [{ required: true, message: '', trigger: 'change' }],
  } as any
})
formObj.formData = pageObjInj.formData
</script>

<style lang="scss" scoped>
//展开与收起页签
.spread {
  cursor: pointer;
}

</style>
