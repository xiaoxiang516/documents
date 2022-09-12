<template>
  <div class="common-app">
    <!-- 节点进度控制组件 -->
    <h2>节点进度控制组件</h2>
    <div v-loading="pageControl.pageLoading">
      <el-tabs v-model="pageControl.tabName" v-if="!pageControl.pageLoading">
        <el-tab-pane :label="ITabName['01']" name="01">
          <!-- 人员处置 -->
          <RYCZ />
        </el-tab-pane>
        <el-tab-pane :label="ITabName['02']" name="02">
          <!-- 材料处置 -->
          <CLCZ />
        </el-tab-pane>
        <el-tab-pane :label="ITabName['03']" name="03">
          <!-- 机械处置 -->
          <JXCZ />
        </el-tab-pane>
        <el-tab-pane :label="ITabName['04']" name="04">
          <!-- 临设处置 -->
          <LSCZ />
        </el-tab-pane>
        <el-tab-pane :label="ITabName['05']" name="05">
          <!-- 其他处置措施 -->
          <QTCZ />
        </el-tab-pane>
        <el-tab-pane :label="ITabName['06']" name="06">
          <!-- 方案总览 -->
          <CZHZ />
        </el-tab-pane>
        <el-tab-pane :label="ITabName['07']" name="07">
          <!-- 保障措施 -->
          <BZCS />
        </el-tab-pane>
        <!-- <el-tab-pane :label="ITabName['08']" name="08">
          <RYCZ />
        </el-tab-pane> -->
      </el-tabs>
      <div style="text-align: right; position: absolute; right: 16px; bottom: 16px">
        <ElButton type="primary" @click="Fn.save">保存</ElButton>
        <ElButton @click="Fn.cancel">取消</ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep, merge, debounce } from 'lodash'
import { ODATA } from '@/constant/common'
import {
  getDataRes,
  putData,
  postDataWithRetMsg
} from '@/api/common/useRequest'
import RYCZ from './components/czfaRycz'
import CLCZ from './components/czfaClcz'
import JXCZ from './components/czfaJxcz'
import LSCZ from './components/czfaLscz'
import QTCZ from './components/czfaQtcz'
import CZHZ from './components/czfaCzhz'
import BZCS from './components/czfaBzcs'
import { ElMessageBox, ElMessage } from 'bgy-plus'
import moment from 'moment'

import {
  getDomains,
  mergeDomainsInSchema,
  getSchemaByEntityId,
  getFilterStringByObjectAndSchema
} from '@/utils/odataUtilCommon'
import { ITabName } from './types'
import { pageControl, Fn, pageObj } from './index'
provide('counterClaim:detail:pageObj', pageObj)

const route = useRoute()

/* 初始化 */
if (route.query.guid && typeof route.query.guid === 'string') {
  Fn.initSchema()
  Fn.initDetail(route.query.guid)
} else {
  console.log('未传入 guid')
}
</script>

<style scoped></style>
