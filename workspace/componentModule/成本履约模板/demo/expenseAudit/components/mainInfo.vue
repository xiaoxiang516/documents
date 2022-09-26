<template>
  <div class="common-app">
    <!--合同信息-->
    <contract-info></contract-info>

    <!--事件信息-->
    <div class="event-info">
      <common-head class="spread" title="事件信息" @click="isSpread = !isSpread">
        <span class="spread-text">{{ isSpread ? '展开' : '收起' }}</span>
        <el-icon><ArrowUp v-if="isSpread" /> <ArrowDown v-else /></el-icon>
      </common-head>

      <common-table
        :class="{ 'table-active': isSpread }"
        ref="tableRef"
        :schema="pageObjInj.schemas[pageObjInj.entityIds.indexOf('FyshSjxx')]"
        :tableSchema="tableObj.tableSchema"
        :table-ui-schema="tableObj.tableUiSchema"
        :tableData="pageObjInj.formData.to_FyshSjxxSet"
        :label-mode="true"
        :rules="{}"
        rowKey="Guid"
      >
        <template #Sjld>
          <span class="pointer view" >查看</span>
        </template>
      </common-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import contractInfo from '@/views/co/contractPerformance/expenseAudit/components/contractInfo.vue'
import { Search } from '@element-plus/icons-vue'

const isSpread = ref(false)
const pageObjInj = inject('expenseAudit:detail:pageObj')

console.log('schemas---to_FyshSjxxSet', pageObjInj)
//
const tableObj = reactive({
  tableData: [],
  tableSchema: [
    'SjName', //事件主题
    'SjBh', //事件编号
    'SjDesc', //事件描述
    'SjcjNumTxt', //
    'SjFsdat', //事件发生日期
    'SjyyNumTxt', //事件原因
    'SjyymxNumTxt', //事件原因明细描述
    'Sjld', //事件涉及楼栋
    'Glpd', //关联盘点


  ] as any [],
  tableUiSchema: {
    Sjld: {
      slot: true
    },
    Glpd: {
      slot: true
    },
  },
  itemInfoRules: {
  } as any
});
</script>

<style lang="scss" scoped>
.view {

}
</style>
