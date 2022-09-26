<template>
  <div class="storage-node-configuration">
    <Tab title="入库业务环节点配置"></Tab>
    <div class="data-btn-right data-btn-top">
      <template>
        <el-button @click="isEdit = true">编辑</el-button>
      </template>
    </div>

    <el-form ref="ruleFormRef" :model="tableData" style="width: 100%">
      <TableTree
        class="table-tree"
        :class="{ edit: isEdit }"
        v-model:expandRowKeys="expandRowKeys"
        :tableData="tableData"
        :tableLabel="tableLabel"
        v-model:selectRow="selectRow"
      >
        <template #title="{ row }">
          <el-form-item
            v-if="isEdit"
            :prop="findDataPathByUUID(row.uuid, 'ZZMC')"
            :rules="requiredRules"
          >
            <el-input v-model="row.ZZMC" placeholder="请输入产品服务类别" />
          </el-form-item>
          <template v-else>{{ row.ZZMC }}</template>
        </template>
        <template #tags="{ row }">
          <template v-if="!row[listKey]?.length">
            <el-tag
              v-for="region in row.orgConfigRegions"
              :key="region.areaCode"
              class="region-tags"
              :closable="isEdit"
              :disable-transitions="false"
              @close="handleTagClose(row.orgConfigRegions, region)"
            >
              {{ region.areaDes }}
            </el-tag>
            <el-button v-if="isEdit" class="button-new-tag" size="small" @click="showTagAdd(row)">
              + 新增
            </el-button>
          </template>
        </template>
        <template #operation="{ row }">
          <el-button
            type="text"
            size="small"
            :disabled="!isEdit || row.STATUS === '0'"
            @click="row.STATUS = '0'"
          >停用</el-button
          >
          <el-button
            type="text"
            size="small"
            :disabled="!isEdit || row.STATUS === '1'"
            @click="row.STATUS = '1'"
          >启用</el-button
          >
        </template>
      </TableTree>
    </el-form>
    <div v-if="isEdit" class="data-btn-right">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit(ruleFormRef)">保存</el-button>
    </div>

    <!-- 区域公司弹窗 -->
    <el-dialog
      v-model="regionCompanyVisible"
      title="区域公司"
      width="50%"
      @close="handleRegionCompanyClose"
    >
      <TableWithSearch
        :selection="true"
        :searchField="regionCompanySearchField"
        :tableDataApi="regionCompanyApi"
        :formInlineInit="regionCompanyForm"
        :tableLabel="regionTableColumn"
      ></TableWithSearch>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="regionCompanyVisible = false">取消</el-button>
          <el-button type="primary" @click="regionCompanyVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, onMounted } from 'vue';
import { Tab, TableWithSearch, TableTree } from '@gys/components';
import type { FormInstance } from 'element-plus';
import { api } from '@gys/core';
import { ElMessage } from 'element-plus';
import { cloneDeep, uniq } from 'lodash';
import constant from './const';

const { statusDict } = constant;

const isEdit = ref(false);

const tableLoading = ref(false);
const buttonAddLoading = ref(false);
const buttonAddInnerLoading = ref(false);
const selectRow = ref('');
const tableData = ref([]);
const tableDataOrigin = ref([]);
const expandRowKeys = ref([]);
const listKey = 'children';
const zIndexMax = 6;
const ruleFormRef = ref<FormInstance>();

const requiredRules = [{ required: true, message: '产品服务不允许为空', trigger: 'blur' }];

const findDataPathByUUID = (uid: string, key) => {
  return [...TableTree.findDataPathByUUID(tableData.value, uid, listKey), key];
};

const tableDataApi = async () => {
  const res = await api.getOrgConfigList();
  return TableTree.optimizeTableData(res, listKey);
};

const init = async () => {
  tableData.value = await tableDataApi();
  tableDataOrigin.value = cloneDeep(tableData.value);
};

onMounted(init);

const tableLabel = computed(() => ({
  ZZMC: {
    label: '组织',
    slotName: 'title',
    treeSelector: isEdit.value,
    width: 338,
  },
  tags: {
    label: '对应行政区域',
    slotName: 'tags',
    width: 240,
  },
  LEVEL: {
    label: '层级',
    'min-width': 54,
  },
  STATUS: {
    label: '状态',
    formatter(row, column, cellValue) {
      return statusDict[cellValue];
    },
  },
}));

const checkSelectRow = () => {
  if (!selectRow.value) {
    ElMessage.error('请选择一行产品服务类别');
  }
  return !!selectRow.value;
};

const tableRowAdd = () => {
  if (checkSelectRow()) {
    tableData.value = TableTree.addByUUID(
      tableData.value,
      selectRow.value,
      {
        date: '2016-05-03',
        name: 'wangxiaohu',
      },
      listKey,
    );
  }
};

const tableInnerRowAdd = () => {
  if (checkSelectRow()) {
    const item = TableTree.getItemByUUID(tableData.value, selectRow.value, listKey);
    if (!item[listKey]?.length && item.orgConfigRegions?.length) {
      ElMessage.error('请先删除当前物料主数据');
      return;
    }
    if (item.zIndex < zIndexMax) {
      tableData.value = TableTree.addInnerByUUID(
        tableData.value,
        selectRow.value,
        {
          date: '2016-05-03',
          name: 'wangxiaohu',
        },
        listKey,
      );
      expandRowKeys.value = uniq([...expandRowKeys.value, selectRow.value]);
    } else {
      ElMessage.error('最大只能新增6层');
    }
  }
};

const showTagAdd = (row) => {
  dialogVisible.value = true;
};

const handleTagClose = (data: any[], tag: any) => {
  data.splice(
    data.findIndex((item) => item.areaCode === tag.areaCode),
    1,
  );
};

const cancel = () => {
  tableData.value = cloneDeep(tableDataOrigin.value);
  isEdit.value = false;
};

const validateError = (data?: any[]) => {
  const currentData = data || tableData.value;
  return currentData.some((item) => {
    const state = !item.ZZMC;
    if (item[listKey]) {
      return state || validateError(item[listKey]);
    }
    return state;
  });
};

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await api.saveOrgConfig(tableData.value);
      isEdit.value = false;
      await init();
    } else {
      ElMessage.error('存在未填写的产品服务类别');
      expandRowKeys.value = TableTree.getExpandableRowKeys(tableData.value, listKey);
    }
  });
};

// 区域公司
const regionCompanyVisible = ref<boolean>(false);

const regionCompanySearchField = reactive([
  {
    label: '区域公司：',
    key: 'company',
    inputType: 'input',
    inputProps: {
      placeholder: '请输入',
      // style: 'width: 300px',
    },
  },
]);

const regionCompanyForm = reactive({
  company: '',
});

const regionTableColumn = reactive({
  ZPO_NO: {
    label: '区域公司编码',
    align: 'center',
  },
  documentTypeName: {
    label: '区域公司名称',
    align: 'center',
  },
});

const regionCompanyApi = () => {};

const handleRegionCompanyClose = () => {
  regionCompanyVisible.value = false;
};
</script>

<style lang="scss">
.organize-config {
  @apply px-5;
  .data-btn-right {
    width: 100%;
    margin: 10px 0;
    text-align: right;
  }
  .data-btn-top {
    margin-top: 0;
  }
  .button-new-tag {
    @apply ml-1 mt-1;
    &:first-child {
      margin-left: 0;
    }
  }
  .el-form-item {
    margin-bottom: 0px;
  }

  .el-form-item.is-error {
    margin-bottom: 10px;
  }

  .table-tree.edit {
    width: 100%;
    :deep(.el-table__row .el-table__cell:first-child .cell) {
      line-height: 60px;
    }
  }
  .region-tags {
    @apply mx-1 mt-1;
  }
}
</style>
