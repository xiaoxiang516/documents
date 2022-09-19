<template>
  <div>
    <common-head title="销项计划">
      <el-button type="primary" @click="issueOutputPlan" v-if="labelMode">下发</el-button>
      <el-button type="primary" @click="addOutputPlan" v-if="!labelMode">新增</el-button>
    </common-head>
    <common-table
      ref="tableRef"
      :schema="pageObjInj.schemas[pageObjInj.entityIds.indexOf('SjjcXxjh')]"
      :tableSchema="outputPlanObj.tableSchema"
      :table-ui-schema="outputPlanObj.tableUiSchema"
      :tableData="pageObjInj.formData.SjjcXxjhSet"
      selectionType="checkbox"
      :label-mode="labelMode"
      :getRowButton="getRowButton"
      @rowControlButtonClick="rowControlButtonClick"
      @selectionChange="selectionChange"
      :rules="outputPlanObj.itemInfoRules"
      rowKey="Guid"
    >
      <template #ZrrTxt="{row}">
        <el-input readonly v-model="row.ZrrTxt">
          <template #append>
            <el-button :icon="Search" @click="selectStaff(row)"  />
          </template>
        </el-input>
      </template>
      <template #Zebm="{row}">
        <el-input readonly v-model="row.Zebm">
          <template #append>
            <el-button :icon="Search" @click=""  />
          </template>
        </el-input>
      </template>
    </common-table>

    <bgy-selection
      :visible="visible"
      v-bind="state"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    >
    </bgy-selection>
  </div>
</template>
<!--点击a行责任人-将弹窗中所先人员赋值给a行a行责任人-->
<!--点击a行责任部门- -->
<script lang="ts" setup>
import { ref, reactive, defineProps, watch, onMounted, inject } from 'vue'
import CommonHead from '@/components/CommonHead.vue'
import CommonTable from '@/components/CommonTable.vue'
import { Search } from '@element-plus/icons-vue'
import type { Org, Staff } from "bgy-staff-pick/types/types";


const pageObjInj = inject('eventDecision:detail:pageObj')
// console.log('销项计划--pageObjInj', pageObjInj)
// console.log('销项计划--pageObjInj.formData.SjjcXxjhSet', pageObjInj.formData.SjjcXxjhSet)
const props = defineProps({
  labelMode: {
    type: Boolean,
    default: false,
  },
})

// 是否展示
const visible = ref(false);

const outputPlanObj = reactive({
  tableData: [],
  tableSchema: [
    {
      title: '序号',
      key: 'Xh',
      fixed: 'left',
      type: 'index',
    },
    'SxDesc1', //事项
    'SxDesc2', //详细内容
    // 'Zrr', //主责任人
    'ZrrTxt', //责任人名称
    'Zebm', //责任部门
    'Enddate', //完成日期
  ] as any [],
  tableUiSchema: {
    ZrrTxt: {
      slot: true
    },
    Zebm: {
      slot: true
    },
  },
  itemInfoRules: {
    SxDesc1: [{ required: true, message: '请填写事项', trigger: 'blur' }],
    SxDesc2: [{ required: true, message: '请填写详细内容', trigger: 'blur' }],
    ZrrTxt: [{ required: true, message: '请选择主责任人', trigger: 'blur' }],
    Zebm: [{ required: true, message: '请选择责任部门', trigger: 'blur' }],
    Enddate: [{ required: true, message: '请选择完成日期', trigger: 'blur' }],
  } as any
});

const ROW_BUTTON_KEY = {
  DELETE: "DELETE",
}

const getRowButton = (row) => {
  if(!props.labelMode && row.SendStatus === 1) { //
    const deleteButton = {key: ROW_BUTTON_KEY.DELETE, label: "删除"};
    return [deleteButton];
  }
  else {
    return [];
  }
}

const addAssessment = () => {

}

const rowControlButtonClick = (key, scope) => {
  if (ROW_BUTTON_KEY.DELETE === key) {
    pageObjInj.formData.SjjcXxjhSet.splice(scope.$index, 1);
  }
}
const selectionChange  = () => {

}
// 下发销项计划
const issueOutputPlan = () => {

}
const addOutputPlan = () => { // 待做：是否项目总
  pageObjInj.formData.SjjcXxjhSet.push({
    'SxDesc1': '',
    'SxDesc2': '',
    // 'Zrr',
    'ZrrTxt': '',
    'Zebm': '',
    'Enddate': '',
  })
}

const currentRow = ref()
const selectedType = ref()
const selectPerson  = (row) => {
  visible.value = true;
  currentRow.value = row
  // console.log('currentRow.value', currentRow.value)
}
const selectStaff  = (row) => {
  visible.value = true;
  currentRow.value = row
  selectedType.value = 'staff'
  state.compFun = ["01"]
  // console.log('currentRow.value', currentRow.value)
}
const selectOrg  = (row) => {
  visible.value = true;
  currentRow.value = row
  selectedType.value = 'org'
  state.compFun = ["02"]
  // console.log('currentRow.value', currentRow.value)
}




// 其他属性(由于属性较多，这里我使用 v-bind 收到一个对象里面了)
const state = reactive({
  // 是否允许多选
  allowMulti: false,
  // 是否可选离职人员
  allowSelectLeaveUser: true,
  // 是否允许全局选人
  allowAll: true,
  // 应用编码
  appCode: "app002",
  // 访问令牌
  token: "b9b9781e0dc2a5cb0148f215da25d2ae",
  // 体系分类
  sysType: ["01", "02", "03", "04"],
  // 使用用户
  currentUser: "lijunjie10",
  // 组件功能
  compFun: ["01", "02"],
  // 候选人列表
  waitUserList: [
    { bip: "zhongzhangpeng" },
    { bip: "zhaozhiyan01" },
    { bip: "1000122825" },
  ] as Array<Staff>,
  // 回填
  checkedObjectList: [] as Array<Org | Staff>,
  // 排除
  exceptObjectList: [] as Array<Org | Staff>,
});
// 已选组织
const selectedOrg = ref<Set<Org>>();
// 已选人员
const selectedStaff = ref<Set<Staff>>();

const handleCancel = () => {
  visible.value = false;
};

const handleConfirm = ({ detail }: CustomEvent) => {
  if (Array.isArray(detail.org)) {
    selectedOrg.value = new Set(detail.org);
  }
  if (Array.isArray(detail.staff)) {
    selectedStaff.value = new Set(detail.staff);
    console.log('detail.staff', detail.staff[0])
    currentRow.value.Zrr = detail.staff[0].bip
    currentRow.value.ZrrTxt = detail.staff[0].name
  }
  console.log('--selectedStaff', selectedStaff.value)
  visible.value = false;
};

watch(
  [selectedOrg, selectedStaff],
  ([orgVal = [], staffVal = []]) => {
    // 先清空下回填数据
    state.checkedObjectList.length = 0;
    orgVal.forEach((item: Org) => {
      state.checkedObjectList.push(item);
    });
    staffVal.forEach((item: Staff) => {
      state.checkedObjectList.push(item);
    });
  },
  { deep: true }
);

</script>

<style lang="scss" scoped>

</style>
