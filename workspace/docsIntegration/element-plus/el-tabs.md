

```vue
<template>
  <div class="claim-event-detail main-container">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="(item, index) in eventInfoTabs" :key='index' :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>

    <div class="main" v-loading="pageObj.isLoading">
      <!-- 基本信息 -->
      <base-Information v-if="activeName === '0'" :schemas="pageObj.schemas[2]" :formData="pageObj.formData.to_SjxxBaseSet"></base-Information>
      <!-- 涉及楼栋 -->
      <involve-building v-if="activeName === '1'" :schemas="pageObj.schemas[3]" :formData="pageObj.formData"></involve-building>
      <!-- 工期概览-->
      <project-time-overview v-if="activeName === '2'" :schemas="pageObj.schemas" :formData="pageObj.formData"></project-time-overview>
      <!-- 附件信息-->
      <attachment-info v-if="activeName === '3'" :initParamet="initParamet" :editable="false" /> 
    </div>
  </div>
</template>

```

```js

const activeName = ref('0')
const eventInfoTabs = [
  { label: '基本信息', name: '0' },
  { label: '涉及楼栋', name: '1' },
  { label: '工期概览', name: '2' },
  { label: '附件信息', name: '3' },
]

```