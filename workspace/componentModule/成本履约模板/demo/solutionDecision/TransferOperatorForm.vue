<template>
  <el-dialog
    v-model="dialogVisible"
    title="转经办人"
    width="800px"
    :close-on-click-modal="false"
    @open="onOpen"
    @opened="onOpened"
  >
    <el-form inline :model="searchForm">
      <el-form-item label="BIP账号:">
        <el-input
          v-model="searchForm.Bip"
          @input="onSearch"
          :suffix-icon="Search"
          placeholder="请输入bip账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input
          v-model="searchForm.Name"
          placeholder="请输入姓名"
          :suffix-icon="Search"
          @input="onSearch"
          clearable
        ></el-input>
      </el-form-item>
      <!-- <el-form-item style="margin-right: 0">
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item> -->
    </el-form>
    <el-row> 请选择一个用户 </el-row>
    <el-table
      ref="tableRef"
      :data="tableData"
      :row-key="(row) => row.ZUSRID"
      border
      v-loading="loading"
      element-loading-text="加载中"
      highlight-current-row
      @current-change="handleCurrentChange"
      :current-row-key="currentRow.ZUSRID || ''"
      height="350"
      style="width: 100%"
    >
      <el-table-column align="center" width="55">
        <template #default="scope">
          <el-radio v-model="radioModel" :label="scope.row.ZUSRID"></el-radio>
        </template>
      </el-table-column>
      <el-table-column type="index" align="center" label="序号" width="55" />
      <el-table-column prop="ZUSRID" label="BIP" />
      <el-table-column prop="ZNACHN" label="姓名" />

      <el-table-column prop="ZORGNAME" label="所属组织" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-config-provider :button="btnConfig">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" :disabled="!currentRow.ZUSRID" @click="handleOk">确认转办</el-button>
        </el-config-provider>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, PropType, watch } from 'vue'
import { ElTable, ElMessage } from 'bgy-plus'
import type { ContractData, OperatorSearch } from '@/utils/interface'
import { getOperator, transferOperator } from '@/api/contract/contract'
import _ from 'lodash'
const props = defineProps({
  contractId: {
    type: Array as PropType<ContractData[]>,
    default: () => []
  }
})
const btnConfig = {
  autoInsertSpace: true
}
const dialogVisible = ref(false)
const searchForm = ref({
  Bip: '',
  Name: ''
})
const tableData = ref<OperatorSearch[]>([])
const loading = ref(false)
const tableRef = ref<InstanceType<typeof ElTable>>()
const radioModel = ref('')

const defaultRowData = {
  ZNACHN: '',
  ZORGID: '',
  ZORGNAME: '',
  ZUSRID: ''
}
const currentRow = ref<OperatorSearch>({
  ...defaultRowData
})
watch(radioModel, (val) => {
  currentRow.value = tableData.value.find((d) => d.ZUSRID === val) || defaultRowData
})
const handleCurrentChange = (val: OperatorSearch) => {
  currentRow.value = val
  radioModel.value = val.ZUSRID
}

const onSearch = _.debounce(() => {
  const Bip = searchForm.value.Bip
  const Name = searchForm.value.Name
  let filter = ''
  if (!Bip && !Name) {
    tableData.value = []
    return false
  }
  if (!Bip && Name) {
    filter = `$filter=F4field eq 'Zzjbr' and (substringof('ZNACHN:${Name}',Condition))&$format=json`
  } else if (Bip && !Name) {
    filter = `$filter=F4field eq 'Zzjbr' and (substringof('ZUSRID:${Bip}',Condition))&$format=json`
  } else if (Bip && Name) {
    filter = `$filter=F4field eq 'Zzjbr' and (substringof('ZUSRID:${Bip}',Condition) or substringof('ZNACHN:${Name}',Condition))&$format=json`
  }
  console.log('filter', filter)
  loading.value = true
  getOperator(filter)
    .then((res) => {
      loading.value = false
      const result = res.d?.results || []
      if (result.length) {
        tableData.value = JSON.parse(result[0]?.Result).FIELDDATA
      } else {
        tableData.value = []
      }
    })
    .catch(() => {
      // ElMessage.success('转办失败')
      loading.value = false
    })
}, 500)

const onOpen = () => {
  tableData.value = []
  searchForm.value = {
    Bip: '',
    Name: ''
  }
}
const onOpened = () => {
  //  onSearch()
}
const close = () => {
  tableData.value = []
  dialogVisible.value = false
}
// const handleChangeSearch= ()=>{

// }
const emit = defineEmits(['refresh'])
const handleOk = () => {
  const { contractId } = { ...props }
  const { ZNACHN, ZUSRID, ZORGID, ZORGNAME } = currentRow.value
  const isZdocumentNo = contractId.map((item) => item.ZdocumentNo).join(',')
  console.log('isZdocumentNo', isZdocumentNo)
  // contractId.forEach(item => {
  //     isZdocumentNo
  // })
  const params = {
    filter: `$filter=ZdocumentNo eq '${isZdocumentNo}' and Znachn eq '${ZNACHN}' and Zusrid eq '${ZUSRID}' and Zorgid eq '${ZORGID}' and Zorgname eq '${ZORGNAME}'&$format=json`
  }
  transferOperator(params)
    .then(() => {
      ElMessage.success('转办成功')
      emit('refresh')
    })
    .catch(() => {
      ElMessage.success('转办失败')
      // store.dispatch('main/setNeedRefresh', true)
    })

  dialogVisible.value = false
}
const open = () => {
  dialogVisible.value = true
}
defineExpose({
  open
})
</script>

<style scoped lang="scss">
.el-table {
  :deep(.el-table-column--selection.is-leaf .el-checkbox) {
    display: none;
  }
}
.el-radio {
  :deep(.el-radio__label) {
    display: none;
  }
}
</style>
