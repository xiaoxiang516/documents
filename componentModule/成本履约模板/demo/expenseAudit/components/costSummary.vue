<template>
  <div class="common-app">
    <!-- 费用信息   -->
    <expense-info></expense-info>
    <!-- 原因分析   -->
    <common-head class="spread" title="原因分析" @click="isSpread = !isSpread">
      <span class="spread-text">{{ isSpread ? '展开' : '收起' }}</span>
      <el-icon><ArrowUp v-if="isSpread" /> <ArrowDown v-else /></el-icon>
    </common-head>
    <common-table
      :class="{ 'table-active': isSpread }"
      ref="tableRef"
      :schema="pageObjInj.schemas[pageObjInj.entityIds.indexOf('FyshSjyy')]"
      :tableSchema="tableObj.sjyyTableSchema"
      :table-ui-schema="tableObj.tableUiSchema"
      :tableData="pageObjInj.formData.to_FyshSjyySet"
      :label-mode="true"
      :rules="{}"
      rowKey="Guid"
    >
    </common-table>
    <!-- 费用合计   -->
    <common-head class="spread" title="费用合计" @click="fyhjSpread = !fyhjSpread">
      <span class="spread-text">{{ fyhjSpread ? '展开' : '收起' }}</span>
      <el-icon><ArrowUp v-if="fyhjSpread" /> <ArrowDown v-else /></el-icon>
    </common-head>
    <common-table
      :class="{ 'table-active': fyhjSpread }"
      ref="tableRef"
      :schema="pageObjInj.schemas[pageObjInj.entityIds.indexOf('FyshFyhj')]"
      :tableSchema="tableObj.tableSchema"
      :table-ui-schema="tableObj.tableUiSchema"
      :tableData="pageObjInj.formData.to_FyshFyhjSet"
      :label-mode="true"
      :rules="{}"
      rowKey="Guid"
    >
    </common-table>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, defineProps, inject, onMounted, watch} from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonTable from '@/components/CommonTable.vue'
import expenseInfo from '@/views/co/contractPerformance/expenseAudit/components/expenseInfo.vue'

const isSpread = ref(false)
const fyhjSpread = ref(false)
const pageObjInj = inject('expenseAudit:detail:pageObj')

// console.log('---pageObjInj', pageObjInj)
// console.log('schemas---FyshFyhj', pageObjInj.schemas[pageObjInj.entityIds.indexOf('FyshFyhj')])

const tableObj = reactive({
  tableData: [],
  tableSchema: [
    'SjName',// 事件
    // '',// 场景
    'FytypeTxt',// 费用类型
    // '',// 费用名称
    // '',// 施工方提报金额
    // '',// 区域审核-小计
    // '',// 集团审核-小计

  ] as any [],
  tableUiSchema: {},
  itemInfoRules: {
    // 审核金额
    Description: [{ required: true, message: '请填写备注', trigger: 'change' }],
  } as any,
  sjyyTableSchema: [
    // '',//
    'SjBh',// 事件编号
    'SjyyName',// 事件原因
    'SjyymxName',// 事件原因明细
    'Rate',// 原因占比
    'AmountJt',// 审核金额
    'Description',// 备注

  ] as any [],
});

</script>

<style lang="scss" scoped>


</style>
