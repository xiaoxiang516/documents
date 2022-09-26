<template>
  <div>
    <common-head title="方案对比"></common-head>
    <common-table
      ref="tableRef"
      :schema="pageObjInj.schemas[pageObjInj.entityIds.indexOf('SjjcFa')]"
      :tableSchema="tableObj.tableSchema"
      :table-ui-schema="tableObj.tableUiSchema"
      :tableData="pageObjInj.formData.SjjcFaSet"
      :label-mode="true"
      :rules="{}"
      rowKey="SjjcFanum"
    >
    </common-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, inject, onMounted, watch } from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonTable from '@/components/CommonTable.vue'

const pageObjInj = inject('eventDecision:detail:pageObj')

// 事件涉及楼栋
const tableObj = reactive({
  tableData: [],
  tableSchema: [
    'SjjcFanum', // 决策方案序号
    'SjjcFaname', // 决策方案描述
    'FaType', // 方案类型
    'FaGjjdyx', // 关键节点影响
    // 'FaBabg', //是否涉及备案变更
    'FaBabgTxt', //是否涉及备案变更
    'FaYgfyze', //预估费用总额（万元）
    'FaYglrlbd', //预估利润率变动（权益口径）



  ] as any [],
  tableUiSchema: {
  },
  itemInfoRules: {
  } as any
});

</script>

<style lang="scss" scoped>
</style>
