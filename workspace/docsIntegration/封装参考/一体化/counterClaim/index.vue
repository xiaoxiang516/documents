<template>
  <div class="common-app">123</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { cloneDeep, merge, debounce } from 'lodash'
import { ODATA } from '@/constant/common'
import {
  getDataRes,
  putData,
  postDataWithRetMsg
} from '@/api/common/useRequest'
import CommonSearchPage from '@/components/CommonSearchPage.vue'
import { ElMessageBox, ElMessage } from 'bgy-plus'
import moment from 'moment'

import {
  getDomains,
  mergeDomainsInSchema,
  getSchemaByEntityId,
  getFilterStringByObjectAndSchema
} from '@/utils/odataUtilCommon'
</script>

<style scoped></style>
