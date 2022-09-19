<template>
  <div>
    <common-head title="销项计划">
      <el-button type="primary" @click="">下发</el-button>
      <el-button type="primary" @click="">新增</el-button>
    </common-head>
    <common-table
      ref="tableRef"
      :schema="pageObjInj.schemas[4]"
      :tableSchema="solRiskAccessmentObj.tableSchema"
      :table-ui-schema="solRiskAccessmentObj.tableUiSchema"
      :tableData="solRiskAccessmentObj.tableData"
      :label-mode="false"
      :getRowButton="getRowButton"
      @rowControlButtonClick="rowControlButtonClick"
      :rules="solRiskAccessmentObj.itemInfoRules"
      rowKey="Guid"
    >
      <template #Fxtype1="{row}">
        <el-select v-model="row.Fxtype1">
          <el-option label="1" value="1"></el-option>
        </el-select>
      </template>
    </common-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, watch, onMounted, inject } from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonTable from '@/components/CommonTable.vue'

const pageObjInj = inject('eventDecision:detail:pageObj')
const solData = pageObjInj.formData.SjjcFaSet

const props = defineProps({
  
});

const solRiskAccessmentObj = reactive({
  tableData: [
  ],
  tableSchema: [
    {
      title: '序号',
      key: 'Xh',
      fixed: 'left',
      type: 'index',
    },
    '', //
   
  ] as any [],
  tableUiSchema: {
   
  },
  itemInfoRules: {
    Fxtype1: [{ required: true, message: '请选择风险分类', trigger: 'change' }],
   
  } as any
});

const ROW_BUTTON_KEY = {
  DELETE: "DELETE",
}

const getRowButton = (row) => {
  if(props.labelMode) {
    const deleteButton = {key: ROW_BUTTON_KEY.DELETE, label: "删除"};
    return [deleteButton];
  }
  else {
    solRiskAccessmentObj.tableUiSchema.operation = {
      width: '0'
    }
    return [];
  }
}

const addAssessment = () => {
 
}

const rowControlButtonClick = (key, scope) => {
  if (ROW_BUTTON_KEY.DELETE === key) {
    solData.splice(scope.$index, 1);
  }
}

const loadTableData = () => {
 
}

onMounted(()=> {
  loadTableData()
})

watch(
  () => [solData, solData.length],
  (newValue, oldValue) => {
    loadTableData()
  }
)
</script>

<style lang="scss" scoped>

</style>
