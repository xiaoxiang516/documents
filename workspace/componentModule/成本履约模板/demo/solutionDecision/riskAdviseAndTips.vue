<template>
  <div>
    <common-head title="各条线建议及风险点提示"></common-head>
    <common-table
      ref="tableRef"
      :schema="pageObjInj.schemas[pageObjInj.entityIds.indexOf('SjjcFaxz')]"
      :tableSchema="riskPointAlertObj.tableSchema"
      :table-ui-schema="riskPointAlertObj.tableUiSchema"
      :tableData="pageObjInj.formData.SjjcFaxzSet.filter(item => item.JcRole !== '03' && item.JcRole !== '10')"
      :label-mode="labelMode"
      :rules="riskPointAlertObj.itemInfoRules"
      rowKey="JcGuid"
    >
      <template #JcRoleTxt="{row}">
       <span>{{ row.JcRoleTxt }}</span>
      </template>
      <!-- 方案决策 决策意见 指定某行必填时使用插槽的写法-->
      <template #FaGuid="scope">
        <el-form-item :prop="!labelMode ? scope.index + '.FaGuid' : ''" :rules="!labelMode && scope.index === rowNumber ? { required: true, message: '请选择方案决策', trigger: 'change' } : {}">
          <el-select v-model="scope.row.FaGuid" clearable :disabled="labelMode || (!labelMode && scope.index !== rowNumber)">
            <el-option v-for="item in pageObjInj.formData.SjjcFaSet" :key="item.Guid" :label="item.SjjcFaname" :value="item.Guid" ></el-option>
          </el-select>
        </el-form-item>
      </template>
<!--      不禁用： 编辑状态且是当前流程labelMode && scope.index === rowNumber  -->
<!--      禁用： 非编辑状态或者 且是当前流程labelMode && scope.index === rowNumber prop没有条件判断会报错 -->
      <template #Reason="scope">
        <el-form-item :prop="!labelMode ? scope.index + '.Reason' : ''" :rules="!labelMode && scope.index === rowNumber ? { required: true, message: '请填写决策意见', trigger: 'blur' } : {}">
          <el-input v-model="scope.row.Reason" :disabled="labelMode || (!labelMode && scope.index !== rowNumber)"></el-input>
        </el-form-item>
      </template>
    </common-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, inject, onMounted, watch } from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonTable from '@/components/CommonTable.vue'

const pageObjInj = inject('eventDecision:detail:pageObj')

const props = defineProps({
  rowNumber: {
    type: Number,
    default: 1
  },
  labelMode: {
    type: Boolean,
    default: false, // labelMode为false是编辑状态
  },
})


const riskPointAlertObj = reactive({
  tableData: [
  ],
  tableSchema: [
    {
      title: '序号',
      key: 'Xh',
      fixed: 'left',
      type: 'index',
    },
    'JcRoleTxt', // 专业条线
    'FaGuid', // 方案决策
    'Reason', //决策意见

  ] as any [],
  tableUiSchema: {
    JcRoleTxt: {
      slot: true
    },
    FaGuid: {
      slot: true
    },
    Reason: {
      slot: true
    },
  },
  itemInfoRules: { } as any
});



</script>

<style lang="scss" scoped>

</style>
