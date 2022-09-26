<template>
  <div class="common-app">
    <el-tabs v-model="activeName">
      <el-tab-pane v-for="item in expenseAuditTabs" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
    <!--主要信息-->
    <main-info v-if="activeName === '0'"></main-info>
    <!--费用汇总-->
    <cost-summary v-if="activeName === '1'"></cost-summary>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeUpdate, onMounted, computed, provide, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep } from 'lodash'
import { ElMessageBox, ElMessage } from 'bgy-plus'
import {
  getDomains,
  mergeDomainsInSchema,
  getSchemaByEntityId,
  getSchemaByEntityIdArray
} from '@/utils/odataUtilCommon'
import { getDetailDataRes, postDataWithRetMsg } from '@/api/common/useRequest'
import { showMessageSuccess, showMessageError } from '@/utils/messageUtil'
import mainInfo from '@/views/co/contractPerformance/expenseAudit/components/mainInfo.vue'
import costSummary from '@/views/co/contractPerformance/expenseAudit/components/costSummary.vue'


const tabPaneList = reactive([])

const pageObj = reactive({
  schemas: [] as any,
  entityIds: [] as any,
  domainList: [] as any,
  formData: {
    to_FyshSjxxSet: [],
    to_FyshSjyySet: [],
    to_FyshFyhjSet: [],
  } as any,
})


provide('expenseAudit:detail:tabPaneList', tabPaneList)
provide('expenseAudit:detail:pageObj', pageObj)

const activeName = ref('0')
const expenseAuditTabs = [
  { label: '主要信息', name: '0' },
  { label: '费用汇总', name: '1' },
  { label: '费用明细', name: '2' },
  { label: '附件目录', name: '3' },
  { label: '评审记录', name: '4' },
]

const getSchema = async () => {
  pageObj.entityIds = ['FyshHead', 'FyshSjxx', 'FyshSjyy', 'FyshFyhj', 'FyshSjpd']
  const schemas = await getSchemaByEntityIdArray('ZFLY_ZYSP_SRV', pageObj.entityIds)
  console.log('费用审核数据：schemas', schemas)
  let fyshSjxx = schemas[pageObj.entityIds.indexOf('FyshSjxx')]
  // 事件信息新增两列做按钮
  fyshSjxx.properties.Sjld = { title: '事件涉及楼栋' }
  fyshSjxx.properties.Glpd = { title: '关联盘点' }
  pageObj.schemas = schemas
}

const getDomainList = async () => {
  const domainList = await getDomains('ZFLY_ZYSP_SRV', 'DomainListSet')
  pageObj.domainList = domainList
}

const getDetailData = () => {
  const param = `('1')?$expand=to_FyshSjxxSet/to_FyshSjpdSet,to_FyshSjyySet,to_FyshFyhjSet,to_FyshFyzySet,to_FyshFymxRySet/to_FyshFymxRyItemSet,to_FyshFymxClSet/to_FyshFymxClItemSet,to_FyshFymxJxSet/to_FyshFymxJxItemSet,to_FyshFymxLsSet/to_FyshFymxLsItemSet,to_FyshFymxQtSet/to_FyshFymxQtItemSet,to_FyshFymxQdxSet/to_FyshFymxQdxItemSet,to_FyshFymxTjSet/to_FyshFymxTjItemSet`
  getDetailDataRes('ZFLY_ZYSP_SRV', 'FyshHeadSet', param)
    .then((res) => {
      const result = res.d
      refactorObj(pageObj.formData, result)
      pageObj.formData.to_FyshSjxxSet = result.to_FyshSjxxSet.results
      pageObj.formData.to_FyshSjyySet = result.to_FyshSjyySet.results
      pageObj.formData.to_FyshFyhjSet = result.to_FyshFyhjSet.results
      console.log('费用审核数据：', res)
    })
}
const refactorObj = (targetObj, srcObj) => {
  for(let objKey in srcObj) {
    // 普通类型字段，直接复制
    if(typeof srcObj[objKey] !== 'object') {
      targetObj[objKey] = srcObj[objKey];
    }
  }
}

onMounted(async() => {

  await getDomainList()
  await getSchema()
  await getDetailData()
})

</script>

<style lang="scss" scoped>
//展开与收起页签 v-deep对本组件有作用，子组件也有作用
::v-deep {
  //对父组件的spread起作用，也对子组件样式起作用设置v-deep
  .spread {
    cursor: pointer;
  }
  .page-name {
    justify-content: flex-start;
    .rout-title {
      padding-right: 20px;
    }
  }
  //针对子组件样式设置v-deep
  .form-active {
    display: none;
  }
  //表单间隔
  .el-row .el-col {
    // label过长水平方向太挤
    padding-right: 30px;
    //label过长，垂直方向对不齐
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .table-active {
    display: none;
  }
}
</style>
