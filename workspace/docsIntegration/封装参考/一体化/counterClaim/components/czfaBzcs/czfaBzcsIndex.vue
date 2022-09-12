<!-- 保障措施 -->
<template>
  <div class="common-app" v-loading="pageControl.pageLoading">
    <div style="text-align: right; margin-bottom: 20px">
      <ElButton type="primary" @click="add">新增</ElButton>
    </div>
    <CommonTable
      :schema="pageObjInj.schemas[pageObjInj.entityIds.indexOf('Czfa2Bzcs')]"
      :tableSchema="bzcsObj.tableSchema"
      :tableUiSchema="bzcsObj.tableUiSchema"
      :tableData="pageObjInj.formData.to_Czfa2BzcsSet"
      :rules="bzcsObj.rules"
      rowKey="Guid"
      :get-row-button="Fn.getRowButton"
      @row-control-button-click="onRowControlButtonClick"
    ></CommonTable>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import CommonTable from '@/components/CommonTable.vue'
import { pageControl, Fn, bzcsObj } from './index'
import type { IPageObj } from '../../types'
import { ElMessageBox } from 'bgy-plus'

const pageObjInj = inject('counterClaim:detail:pageObj') as IPageObj

const add = () => {
  pageObjInj.formData.to_Czfa2BzcsSet?.push({}) // 增加一行
}
const del = (idx: number) => {
  pageObjInj.formData.to_Czfa2BzcsSet?.splice(idx, 1) // 删除一行
}

const onRowControlButtonClick = (
  key: 'del',
  scope: { row: any; $index: number }
) => {
  ElMessageBox.confirm('是否删除?', '提示', {
    confirmButtonText: '是',
    cancelButtonText: '否',
    type: 'warning'
  })
    .then(() => {
      del(scope.$index)
    })
    .catch(() => {
      console.log('取消删除')
    })
}
</script>

<style scoped></style>
