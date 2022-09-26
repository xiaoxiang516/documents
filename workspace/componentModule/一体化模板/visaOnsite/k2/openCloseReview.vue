<template>
  <common-bpm-review
    :K2Form="K2Form"
    :approveHandler="flowHandler"
    :initCallback="initCallback"
  >
    <template #customPage>
      <div class="common-body">
        <open-close ref="detailRef" :guid="guid" v-if="guid"></open-close>
      </div>
    </template>
  </common-bpm-review>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { k2InitDetail, K2Form, k2InitResubmit } from '@/utils/k2Util'
import CommonBpmReview from '@/components/CommonBpmReview.vue'
import OpenClose from '../../components/OpenClose.vue'

const detailRef = ref<any>(null)
const guid = ref('')

onMounted(async () => {
  // 初始化K2组件
  // k2InitDetail(queryData)
})

async function initCallback() {
  guid.value = K2Form.formData.vmFormContent.integrationId
}

// 流程处理事件,操作即通过
const flowHandler = () => {
  const beforeEntity = {
    MessageSet: { results: [{ Type: 'S', MessageText: '同意审批' }] }
  }

  return beforeEntity
}
</script>

<style lang="scss" scoped>
.common-body {
  :deep(.el-form-item__label) {
    background: white !important;
  }
}
</style>
