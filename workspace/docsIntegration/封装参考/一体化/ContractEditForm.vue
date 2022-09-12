

<template>
   <div class="anchor-wrap-content">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="150px"
      >
        <div v-for="item of configs" :key="item.lv" :id="`content-${item.lv}`">
          <div class="common-body">
            <el-row
              :gutter="16"
              v-if="['H', 'H9', 'J1', 'J2'].includes(item.lv)"
              class="form-item-wrap"
            >
              <template v-for="fieldItem of item.fields">
                <el-col :span="fieldItem.inputType === '60' ? 24 : 8">
                  <el-form-item
                    :label="`${fieldItem.fieldName}：`"
                    :prop="fieldItem.field"
                  >
                    <el-input
                      v-if="
                        fieldItem.inputType === '10' &&
                        fieldItem.checkType === '10'
                      "
                      v-model.number="formData[fieldItem.field]"
                      :placeholder="fieldItem.placeholder"
                      :disabled="fieldItem.disabled"
                    />
                    <el-select
                      v-else-if="fieldItem.inputType === '20'"
                      v-model="formData[fieldItem.field]"
                      :placeholder="fieldItem.placeholder"
                      :disabled="fieldItem.disabled"
                      :multiple="['ZconClassNo3'].includes(fieldItem.field)"
                      @change="
                        (val) => handleFormInputChange(fieldItem.field, val)
                      "
                    >
                      <el-option
                        v-for="option in fieldItem.selectOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-else-if="
                        fieldItem.inputType === '30' &&
                        fieldItem.field === 'ZnodeidName'
                      "
                      v-model="formData[fieldItem.field]"
                      readonly
                      :placeholder="fieldItem.placeholder"
                      :suffix-icon="Search"
                      @click="handleOrganizationClick"
                    ></el-input>
                    <el-input
                      v-else-if="fieldItem.inputType === '40'"
                      v-model="formData[fieldItem.field]"
                      readonly
                      :placeholder="fieldItem.placeholder"
                      :suffix-icon="Search"
                    ></el-input>
                    <el-date-picker
                      v-else-if="fieldItem.inputType === '50'"
                      type="date"
                      value-format="YYYY-MM-DD"
                      v-model="formData[fieldItem.field]"
                      :placeholder="fieldItem.placeholder"
                      :disabled="fieldItem.disabled"
                    ></el-date-picker>
                    <el-input
                      v-else-if="fieldItem.inputType === '60'"
                      type="textarea"
                      maxlength="100"
                      show-word-limit
                      v-model="formData[fieldItem.field]"
                      :placeholder="fieldItem.placeholder"
                      :disabled="fieldItem.disabled"
                    />
                    <el-input
                      v-else
                      v-model="formData[fieldItem.field]"
                      :placeholder="fieldItem.placeholder"
                      :disabled="fieldItem.disabled"
                    />
                  </el-form-item>
                </el-col>
              </template>
            </el-row>

            <el-table
              v-else
              :data="
                formData[TableEnum[`${item.lv}_TableData`]]?.['results'] || []
              "
              border
              :show-summary="item.showSum"
              :summary-method="(params) => getSummaries(params, item.sumFields)"
            >
              <el-table-column
                v-for="column of item.tableColumns"
                :label="column.label"
                :prop="column.prop"
                :width="column.width"
              >
                <template #header v-if="column.editable">
                  <span :class="{ required: column.required }">{{
                    column.label
                  }}</span>
                </template>
                <template #default="scope" v-if="column.editable">
                  <el-form-item
                    v-if="column.prop !== 'actions'"
                    :prop="`${TableEnum[`${item.lv}_TableData`]}.results.${
                      scope.$index
                    }.${column.prop}`"
                    :rules="rules[column.prop]"
                  >
                    <el-input
                      v-if="
                        column.inputType === '10' && column.checkType === '10'
                      "
                      v-model.number="scope.row[column.prop]"
                    />
                    <el-select
                      v-if="column.inputType === '20'"
                      v-model="scope.row[column.prop]"
                      @change="
                        (val) =>
                          handleTableInputChange(
                            TableEnum[`${item.lv}_TableData`],
                            scope.$index,
                            column.prop,
                            val
                          )
                      "
                    >
                      <el-option
                        v-for="option in column.selectOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-else-if="column.inputType === '40'"
                      v-model="scope.row[column.prop]"
                      readonly
                      :suffix-icon="Search"
                    ></el-input>
                    <el-date-picker
                      v-else-if="column.inputType === '50'"
                      type="date"
                      v-model="scope.row[column.prop]"
                      value-format="YYYY-MM-DD"
                    ></el-date-picker>
                    <el-input
                      v-else
                      v-model="scope.row[column.prop]"
                      @input="
                        (val) => (
                          TableEnum[`${item.lv}_TableData`],
                          scope.$index,
                          column.prop,
                          val
                        )
                      "
                    />
                  </el-form-item>
                  <div v-else>
                    <el-button></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>
    </div>
</template>

<script lang="ts" setup>
/**
 * 基本信息表单控件呈现方式
10	输入框
20	下拉框
30	下拉框(树形结构)
40	搜索帮助
50  日期选择器
60  文本域
 */
import { ref, reactive, toRef, toRefs, toRaw, watch, watchEffect } from "vue";
import { useStore } from "vuex";
import CommonSubtitle from "@/components/CommonSubtitle.vue";
import OrganizationTreeDialog from "@/components/OrganizationTreeDialog.vue";
import { Search } from "@element-plus/icons-vue";
import { ElBgyAnchorLink, ElForm } from "cs-element-plus";
import { Config } from "@/utils/interface";
import { arrDistinctByProp, swapArray } from "@/utils";
import { getContractFormConfigs } from "@/api/im/contract/contract";

// 渲染table用到的枚举
const TableEnum = {
  H1_TableData: "ContPartySet",
  H2_TableData: "ContSignSet",
  H3_TableData: "ContItemSet",
  H4_TableData: "ContPaySet",
  H5_TableData: "ContPaySet",
  H6_TableData: "ContPaySet",
  H7_TableData: "ContPaySet",
  H8_TableData: "ContRangeSet",
  J3_TableData: "ContRangeSet",
};

/** 组件全局用到的一些状态 */
const store = useStore();
// 所有阈值
let domainList: any = [];
// 所有的表单模块
let ZlevelList: any = [];
// 所有的合同分类（包含一二三级分类）
let classificationList: any = [];
if (store.state.main.domainList.length > 0) {
  // domainList = store.state.main.domainList
  domainList = JSON.parse(localStorage.getItem("domainList") || "");
} else {
  domainList = JSON.parse(localStorage.getItem("domainList") || "");
}
ZlevelList = domainList.filter((d) => d.Fieldname === "Zlevel");
if (store.state.main.conClassifications.length > 0) {
  classificationList = store.state.main.conClassifications;
} else {
  classificationList = JSON.parse(
    localStorage.getItem("conClassifications") || ""
  );
}
const loading = ref(false);

// 父组件传入的props
const props = defineProps<{
  configsParams: any;
  dataSource: Object;
}>();
const { pageType } = props.configsParams;

// 表单数据
const formData = ref<any>({});
const setFormData = () => {
  formData.value = { ...props.dataSource };
};
watchEffect(setFormData);
 
 

// 动态表单配置信息
const cfgRes = ref<any[]>([]);
const rules = ref({});
const configs = ref<Config[]>([]);

const getTableColumn = (r: any) => {
  const editable = pageType === "view" ? false : r.ZisDisplay;
  const column = {
    prop: r.Zdm,
    label: r.ZdmDec,
    required: r.ZisReq,
    editable,
    inputType: r.Zcxfs,
  };
  let selectOptions;
  if (r.Zcxfs === "20") {
    if (r.Zlevel === "H5" && r.Zdm === "ZpaymentTypeNo") {
      selectOptions = [...ZpaymentTypeNoOptions];
    } else if (r.Zlevel === "H5" && r.Zdm === "ZitemNo") {
      selectOptions = [...ZitemNoOptions];
    } else {
      const optionsList = domainList.filter((d) => d.Fieldname === r.Zdm);
      selectOptions = optionsList.map((o) => {
        return {
          label: o.Text,
          value: o.Code,
        };
      });
    }

    Object.assign(column, { selectOptions });
  }

  return column;
};

// 合计行自定义计算方法
const getSummaries = (params: any, sumProps: string[] = []) => {
  const { columns, data } = params;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "合计";
      return;
    }
    if (!sumProps.includes(column.property)) return;
    const values = data.map((item) => Number(item[column.property]));
    if (!values.every((value) => isNaN(value))) {
      let sum = values.reduce((prev, curr) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);
      sum = sum.toFixed(2);
      sums[index] = `${sum} 元`;
    } else {
      sums[index] = " ";
    }
  });

  return sums;
};




// 表单校验和提交
const formRef = ref<InstanceType<typeof ElForm>>();
const validateForm = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        resolve(getFormData());
      } else {
        resolve(false);
      }
    });
  });
};
const getFormData = () => {
  return toRaw(formData.value);
};
// 对外暴露
defineExpose({
  validateForm,
  getFormData,
});
</script>

<style lang="scss" scoped>
.anchor-wrap {
  position: relative;

  .anchor-wrap-content {
    margin-right: 230px;
    background-color: #fff;
  }

  .anchor-wrap-anchor {
    position: absolute;
    right: 0;
    top: 0;
    width: 200px;
  }
}

.el-form > div {
  padding-bottom: 20px;
}

.form-item-wrap {
  .el-select {
    width: 100%;
  }

  :deep(.el-date-editor.el-input) {
    width: 100%;
  }
}

.el-table {
  :deep(.required::before) {
    margin-right: 4px;
    content: "*";
    color: red;
  }

  :deep(.el-form-item) {
    margin-bottom: 0;
  }

  :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }
}
</style>
