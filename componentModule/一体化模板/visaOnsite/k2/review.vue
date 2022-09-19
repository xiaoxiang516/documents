<template>
  <common-bpm-review
    :K2Form="K2Form"
    :approveHandler="flowHandler"
    :initCallback="initCallback"
  >
    <template #customPage>
      <div>
        <DetailPage
          v-if="guid"
          ref="detailRef"
          :guid="guid"
          :k2Id="k2Id"
          :jdbh="jdbh"
          :isK2Page="true"
        ></DetailPage>
      </div>
    </template>
  </common-bpm-review>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { k2InitDetail, K2Form, k2InitResubmit } from '@/utils/k2Util'
import CommonBpmReview from '@/components/CommonBpmReview.vue'
import DetailPage from '../detail.vue'
import { getJdbh } from '../../utils/k2CfgUtil'

const detailRef = ref<any>(null)
const guid = ref('')
const k2Id = ref('')
const jdbh = ref('')

onMounted(async () => {
  // 初始化K2组件
  // k2InitDetail(queryData)
})

async function initCallback() {
  guid.value = K2Form.formData.vmFormContent.integrationId
  k2Id.value = K2Form.formData.vmFormInstance.Folio
  jdbh.value = getJdbh(K2Form)
}

// 流程处理事件,操作即通过
const flowHandler = async () => {
  // const beforeEntity = {
  //   MessageSet: {
  //     results: [{ Type: 'E', MessageText: '不同意审批' }]
  //   }
  // }

  try {
    const validSuccess = await detailRef.value?.validPostData()
    if (validSuccess) {
      const saveResult = await detailRef.value?.handleSave()
      return saveResult
    } else {
      return false
    }
  } catch (error: any) {
    return false
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  background: white !important;
}
</style>
