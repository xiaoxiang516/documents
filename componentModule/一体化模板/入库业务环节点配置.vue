<template>
  <div class="storage-node-configuration">
    <Tab title="入库业务环节点配置"></Tab>
    <div class="data-btn-right">
      <el-button @click="isEdit = true" v-if="!isEdit">编辑</el-button>
    </div>
    <div>
      <TableTree
        class="table-tree"
        :class="{ edit: isEdit }"
        v-model:expandRowKeys="expandRowKeys"
        :tableData="tableData"
        :tableLabel="tableLabel"
      >
        <template #checkbox="{ row, column, $index }">
          <el-checkbox :disabled="!isEdit" size="large" v-model="row.storageNodeDetailsVOLuist[$index].flag"></el-checkbox>
        </template>
      </TableTree>
    </div>
    <div v-if="isEdit" class="data-btn-right">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { Tab, TableTree } from '@gys/components';
import type { FormInstance } from 'element-plus';
import { api } from '@gys/core';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash';

// 点击编辑，tableData.value = cloneDeep(tableDataOrigin.value) // 深拷贝
// 点击取消，tableData.value = cloneDeep(tableDataOrigin.value)
// 点击保存，tableDataOrigin.value = cloneDeep(tableData.value)
const tableData = ref([]); // 用来编辑
const tableDataOrigin = ref([]); // 用来保存未编辑之前的数据，用来展示的数据，
const isEdit = ref(false);
const expandRowKeys = ref([]);
const listKey = 'children';

const initTableData = (list: any[]) => {
  // 初始化数据
  let arr = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    // Object.assign(item, item.storageNodeConfigurationVO);

    if (item.storageNodeDetailsVOList) {
      arr = item.storageNodeDetailsVOList.map(st => st.storageNodeCode);
      item.outerNetRegister = arr.includes(0);
      item.innerNetRegister = arr.includes(1);
      item.infoCheck = arr.includes(2);
      item.inspect = arr.includes(3);
      item.admittance = arr.includes(4);
      item.frameworkAgreement = arr.includes(5);
      // console.log('xxxxx---', arr, item)
    } else {
      item.outerNetRegister = false;
      item.innerNetRegister = false;
      item.infoCheck = false;
      item.inspect = false;
      item.admittance = false;
      item.frameworkAgreement = false;
    }
    if (item.children && item.children.length) {
      initTableData(item.children);
    }
  }
};

const dealSaveTableData = (list: any[]) => {
  // 初始化数据
  let arr = [];
  const numData = [0, 1, 2, 3, 4, 5];
  const storageNodeNameData = ['外网注册', '内网注册', '信息审查', '考察', '准入', '框架协议'];
  const keys = [
    'outerNetRegister',
    'innerNetRegister',
    'infoCheck',
    'inspect',
    'admittance',
    'frameworkAgreement',
  ];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    // 保存，item.storageNodeDetailsVOList = []
    item.storageNodeDetailsVOList = [];
    keys.forEach((key, index) => {
      if (item[key]) {
        console.log('--cc--cc', item)
        item.storageNodeDetailsVOList.push({
          code: item.code,
          storageNodeCode: numData[index],
          storageNodeName: storageNodeNameData[index],
        });
      }
    });
    if (item.children && item.children.length) {
      dealSaveTableData(item.children);
    }
  }
};

const tableDataApi = async () => {
  // const res = await api.getOrgConfigList();
  const res = await api.getStorageNodeConfigList();
  return TableTree.optimizeTableData(res, listKey);
};

const init = async () => {
  tableData.value = await tableDataApi();
  initTableData(tableData.value);
  console.log('---tableData.value888', tableData.value);
  tableDataOrigin.value = cloneDeep(tableData.value);
};

onMounted(init);

// 处理树型数据中storageNodeDetailsVOList,得到节点状态
// 保存时处理数据，通过判断对应节点的勾选状态给storageNodeDetailsVOList赋值
// 0-外网注册,1-内网注册,2-信息审查,3-考察,4-准入,5框架协议,
const tableLabel = computed(() => ({
  proDescribe: {
    label: '产品服务类别',
    slotName: 'proDescribe',
    width: 338,
  },
  outerNetRegister: {
    label: '外网注册',
    'min-width': 70,
    slotName: 'checkbox',
    align: 'center',
  },
  innerNetRegister: {
    label: '内网注册',
    'min-width': 70,
    slotName: 'checkbox',
    align: 'center',
  },
  infoCheck: {
    label: '信息审查',
    'min-width': 70,
    slotName: 'checkbox',
    align: 'center',
  },
  inspect: {
    label: '考察',
    'min-width': 70,
    slotName: 'checkbox',
    align: 'center',
  },
  admittance: {
    label: '准入',
    'min-width': 70,
    slotName: 'checkbox',
    align: 'center',
    isEdit: isEdit.value,
  },
  frameworkAgreement: {
    label: '框架协议',
    'min-width': 70,
    slotName: 'checkbox',
    align: 'center',
  },
}));

const cancel = () => {
  tableData.value = cloneDeep(tableDataOrigin.value);
  console.log('tableData tableDataOrigin', tableData, tableDataOrigin);
  isEdit.value = false;
};
const getList = (list: any[], arr: any[]) => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    arr.push({
      code: item.code,
      id: item.id,
      level: item.level,
      parentCode: item.parentCode,
      proDescribe: item.proDescribe,
      status: item.status,
      storageNodeDetailsVOList: item.storageNodeDetailsVOList,
    })
    if (item.children && item.children.length) {
      getList(item.children, arr);
    }
  }
}



const submit = async (formEl: FormInstance | undefined) => {
  dealSaveTableData(tableData.value); // 对编辑过的tableData转换成后端想要的格式
  // initTableData(tableData.value)
  tableDataOrigin.value = cloneDeep(tableData.value) // 同步源数据 todo 保存成功才
  isEdit.value = false;
  // 转换成后端想要的list格式
  let arr: any[] = []
  getList(tableData.value, arr);

  await api.saveStorageNodeConfig(arr).then(res => {
    ElMessage.success("保存成功")
  });
};
</script>

<style lang="scss">
.storage-node-configuration {
  @apply px-5;
  .data-btn-right {
    margin: 10px 0;
    text-align: right;
  }

  .table-tree.edit {
    width: 100%;
    :deep(.el-table__row .el-table__cell:first-child .cell) {
      line-height: 60px;
    }
  }
}
</style>
