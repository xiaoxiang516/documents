<template>
  <div class="common-app">
    <div class="common-body" v-loading="pageLoading">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="jbxx" v-if="tabAuth.jbxx"></el-tab-pane>
        <el-tab-pane label="施工界面" name="sgjm" v-if="tabAuth.sgjm"></el-tab-pane>
        <el-tab-pane label="资料目录" name="zlml" v-if="tabAuth.zlml"></el-tab-pane>
        <el-tab-pane label="清单信息" name="qdxx" v-if="tabAuth.qdxx"></el-tab-pane>
        <el-tab-pane label="无效成本" name="wxcb" v-if="tabAuth.wxcb"></el-tab-pane>
        <el-tab-pane label="成本拆分" name="cbcf" v-if="tabAuth.cbcf"></el-tab-pane>
        <el-tab-pane label="未列项明细" name="wlxmx" v-if="tabAuth.wlxmx"></el-tab-pane>
      </el-tabs>

      <div class="main" v-if="pageObj.schema.properties && pageObj.schemaFVisa.properties">
        <visa-base-info
          :ref="(el) => baseInfoRef = el"
          v-if="tabAuth.jbxx"
          v-show="activeName==='jbxx'"
          :key='compKey'
          :schema="pageObj.schema"
          :schemaFVisa="pageObj.schemaFVisa"
          :formData="pageObj.formData"
          :helpList="helpList"
          :labelMode="!editMode || !isSelfDj">
        </visa-base-info>

        <Construction
          ref="constructionRef"
          v-if="tabAuth.sgjm"
          v-show="activeName==='sgjm'"
          :Hguid="pageObj.formData.ContractGuid"
          :DocGuid="pageObj.formData.guid"
          DocType=""
          :Fqmc="pageObj.formData.ZBM_NA"
          :Fqbm="pageObj.formData.Fqnum"
          :jmType="DetailEnum.SUPPLMENT"
          @onLdChange="onLdChange"
          @onMajorChange="onMajorChange"
        >
        </Construction>

        <data-directory
          :ref="(el) => dataDirectoryRef = el"
          v-if="tabAuth.zlml"
          v-show="activeName==='zlml'"
          docType="101"
          :guid="guid"
          :htGuid="pageObj.formData.ContractGuid"
          :qymc="pageObj.formData.Zbukrs"
          :labelMode="!zlmlCanEdit">
        </data-directory>

        <invalid-cost-tab
          :ref="(el) => invalidCostRef = el"
          v-if="tabAuth.wxcb"
          v-show="activeName==='wxcb'"
          Djlx="03"
          :Code="pageObj.formData.VisaReasonId"
          :SsdjGuid="guid"
          :SshtGuid="pageObj.formData.ContractGuid"
          :Djzje="pageObj.formData.extraInfo.latestHsMoney"
          :isDetail="!wxcbCanEdit"
        >
        </invalid-cost-tab>

        <cost-sergindex
          :ref="sergindexRef"
          v-if="tabAuth.cbcf"
          v-show="activeName==='cbcf'"
          HeadGuid="Cguid"
        >
        </cost-sergindex>

        <list-information
          v-if="tabAuth.qdxx"
          v-show="activeName === 'qdxx'"
          ref="listInformationRef"
          projectType="QZBGSBQD"
          :dialogFormData="dialogFormData"
          :createListParams="createListParams"
        ></list-information>

        <unlisted-items-tab
          v-if="tabAuth.wlxmx"
          v-show="activeName==='wlxmx'"
          :Guid="pageObj.formData.ContractGuid"
        >
        </unlisted-items-tab>
      </div>

      <ActionBar v-if="!pageLoading && !isK2Page">
        <el-button type="primary" plain size="large" @click="onCancelClick">取消</el-button>
        <el-button type="primary" plain size="large" v-if="modifyBtnFlag" @click="onModifyClick">修改</el-button>
        <el-button type="primary" size="large" v-if="saveBtnFlag" @click="() => onOperateClick('SAVE')">保存</el-button>
        <el-button type="primary" size="large" v-if="submitBtnFlag" @click="() => onOperateClick('SUBMIT')">
          {{ (formId || SN) ? '重新提交' : '提交'}}
        </el-button>
      </ActionBar>
    </div>
    <ibpm-toolbarbtn v-if="!isK2Page" :ibpmformdata="K2Form.formData" ></ibpm-toolbarbtn >
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'bgy-plus'
import { useStore } from 'vuex'
import moment from 'moment'
import { cloneDeep } from 'lodash'
import {
  getDomains,
  mergeDomainsInSchema,
  getSchemaByEntityId
} from '@/utils/odataUtilCommon'
import {
  k2Init,
  K2Form,
  onK2Submit,
  k2InitDetail,
  k2InitResubmit,
  onReK2Submit
} from '@/utils/k2Util'
import { DetailEnum } from '@/api/co/construction'
import { getDetailDataRes, postDataWithRetMsg } from '@/api/common/useRequest'
import { showMessageError, showMessageSuccess } from '@/utils/messageUtil'
import VisaBaseInfo from './components/visaBaseInfo.vue'
import DataDirectory from '../components/DataDirectory.vue'
import InvalidCostTab from '../common/InvalidCostTab.vue'
import unlistedItemsTab from '../components/unlistedItemsTab.vue'
import Construction from '@/views/co/contractPlan/constructionInterface/index.vue'
import costSergindex from '../../costDynamic/costSegregationTab/costSergIndex'

import ActionBar from '@/components/ActionBar.vue'
import ListInformation from '../components/ListInformation'
import {
  validData,
  dealSchema,
  dealVisaSchema,
  dealPostData,
  delGetData,
  defaultFormData,
  defaultAuthData,
  dataDirectoryAuthJson
} from './functions'
import { setSchemaByK2CfgWithFilter } from '../utils/k2CfgUtil'

const store = useStore()
const props = defineProps({
  router: Object,
  guid: {
    type: String,
    default: ''
  },
  jdbh: {
    type: String,
    default: '000'
  },
  k2Id: {
    type: String,
    default: ''
  },
  isK2Page: {
    type: Boolean,
    default: false
  }
})

const route = useRoute() || props.router?.currentRoute.value
const router = useRouter() || props.router

const pageObj = reactive({
  schema: {} as any,
  schemaFVisa: {} as any,
  formData: cloneDeep(defaultFormData)
})

const baseInfoRef = ref()
const constructionRef = ref()
const dataDirectoryRef = ref()
const invalidCostRef = ref()
const sergindexRef = ref()
const listInformationRef = ref()

const guid = ref(route?.query.guid || props.guid || '')
const modeType = computed(() => route?.query.modeType || 'view')
const formId = computed(() => route?.query.formId)
const SN = computed(() => route?.query.SN)

const k2CanEdit = computed(() => props.isK2Page && KStarForm.vmFormData.vmFormType !== 'View')
const editMode = ref(!guid.value || modeType.value === 'edit' || k2CanEdit.value)
const pageLoading = ref(false)
const compKey = ref(moment().milliseconds())
// 是否是自己的单据
const isSelfDj = computed(() => !guid.value || (store.state.user.username === pageObj.formData.Operator))

const canEditStatus = computed(() => {
  if (props.isK2Page) {
    if (!k2CanEdit.value) return false
  } else {
    if (!guid.value) return true

    // 不是自己得单不能编辑
    if (!isSelfDj.value) {
      return false
    }
  }

  // 10=未提交 20=审批中 30=审批作废 40=驳回不重走 41=驳回重走 50审批通过
  return ['10', '30', '40', '41'].indexOf(pageObj.formData.Status) !== -1
})

// 无效成本的编辑权限
const wxcbCanEdit = computed(() => {
  if (props.isK2Page && !k2CanEdit.value) {
    return false
  }

  return props.jdbh === '120'
})

// 资料目录的编辑权限
const zlmlCanEdit = computed(() => {
  if (props.isK2Page && !k2CanEdit.value) {
    return false
  }

  const { Status, StatusDj } = pageObj.formData
  const jdbh = props.jdbh

  if (Status === '10' || Status === '20') {
    const jdbhArray = dataDirectoryAuthJson[StatusDj]
    if (jdbhArray && jdbhArray.includes(jdbh)) {
      return editMode.value
    }
  }

  return false
})

// 按钮的显示权限
const modifyBtnFlag = computed(() => guid.value && !editMode.value && canEditStatus.value)
const saveBtnFlag = computed(() => canEditStatus.value && editMode.value)
const submitBtnFlag = computed(() => canEditStatus.value)

const activeName = ref('jbxx')
const helpList = ref<any>({})

const createListParams = computed(() => {
  return {
      subjectId: pageObj.formData.Posid, // 项目id
      projectId: pageObj.formData.Fqnum, // 分期id
      related_type: '30', // SAP业务单据单据类型
      related_guid: pageObj.formData.Guid, // SAP业务单据单据GUID
      related_id: pageObj.formData.VisaNum, // SAP业务单据编码
      related_name: pageObj.formData.VisaName, // SAP业务单据单据名称
      projectType: 'QZBGSBQD', // 文件类型
      shjd: '', // 业务阶段
      contractId: pageObj.formData.ContractGuid, // 合同GUID
      openway: 'bip', // 打开方式
      areaName: pageObj.formData.Zbukrs // 所属区域
  }
})
const dialogFormData = computed(() => {
  return {
      Guid: pageObj.formData.Guid,
      IsQdxt: pageObj.formData.Isqd,
      Status: pageObj.formData.Status,
      StatusDj: pageObj.formData.StatusDj
  }
})
// 当前页签权限
const tabAuth = computed(() => {
  // const { StatusDj, Status } = pageObj.formData
  const currentTabAuth = cloneDeep(defaultAuthData)

  Object.assign(currentTabAuth, {
    wxcb: pageObj.formData.Iswxcb === 'X'
  })

  return currentTabAuth
})

const getSchema = async () => {
  const schemas = await getSchemaByEntityId('ZFLY_VISA_DESIGN_SRV', ['VisaHead', 'FVisa'])

  dealSchema(schemas[0])
  dealVisaSchema(schemas[1], props.isK2Page)

  await setSchemaByK2CfgWithFilter(schemas, ['VisaHead', 'FVisa'], 'LY0001', props.jdbh, props.k2Id)

  pageObj.schema = schemas[0]
  pageObj.schemaFVisa = schemas[1]
}

const getDomianList = async () => {
  const domainList : any = await getDomains('ZFLY_COMMON_SRV', 'DomainListSet')
  helpList.value.Fbfzr = domainList.Fbfzr
  delete domainList.Fbfzr

  pageObj.schema.properties = mergeDomainsInSchema(pageObj.schema, domainList)
  pageObj.schemaFVisa.properties = mergeDomainsInSchema(pageObj.schemaFVisa, domainList)
}

const getDetailData = async () => {
  if (guid.value) {
    const res = await getDetailDataRes('ZFLY_VISA_DESIGN_SRV', 'VisaHeadSet', `(Guid='${guid.value}')?$expand=to_FVisa`)
    Object.assign(pageObj.formData, delGetData(res))
  }
  initK2Data()
}

const getBipInfo = () => {
  if (guid.value) return
  getDetailDataRes('ZFLY_COMMON_SRV', 'BipSet', `('${store.state.user.allInfo.username}')`).then((res) => {
    if (res.d) {
      pageObj.formData.Operator = res.d.Bip
      pageObj.formData.Depart = res.d.Zorgname
      pageObj.formData.Zerdat = moment(new Date().getTime()).format('YYYY-MM-DD')
    }
  })
}

onMounted(async() => {
  initK2()
  await getSchema()
  await getBipInfo()
  await getDomianList()
  await getDetailData()
})

const k2InitCallback = async () => {
  if (!guid.value) {
    guid.value = K2Form.formData.vmFormContent.integrationId
    await getDetailData()
  }
}

const initK2 = () => {
  if (props.isK2Page) return

  if (SN.value) { // 重新提交，从 bpms 跳转进来
    editMode.value = true
    k2InitDetail(k2InitCallback, beforeK2, afterK2)
  } else if (formId.value) { // 重新提交，从 sap 列表跳转进来
    k2InitResubmit(formId.value, k2InitCallback, beforeK2, afterK2)
  } else {
    k2Init('LY0001', '现场签证变更', beforeK2, afterK2)
  }
}

const onModifyClick = () => {
  editMode.value = true
}

const backList = (path = '/contPetf/visaChangeMgmt/visa-onsite') => {
  router.push({ path })
  store.dispatch('tagsView/delView', router.currentRoute.value)
}

const refresh = () => {
  editMode.value = false
  compKey.value = moment().milliseconds()
  getDetailData()

  router.push({
    path: 'visa-onsite-detail',
    query: {
      guid: pageObj.formData.Guid,
      modeType: 'view'
    }
  })
}

const onCancelClick = () => {
  if (!editMode.value) {
    backList()
    return
  }

  ElMessageBox.confirm(
    '请先保存您填写的现场签证申报单，否则不保存本次修改记录',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }
  )
    .then(() => {
      backList()
    }).catch(() => {
      //
     })
}

const onLdChange = () => {
  // todo
}

const onMajorChange = () => {
  // todo
}

// 校验提交的数据
const validPostData = async (Operation) => {
  const validResult = await validData(baseInfoRef, dataDirectoryRef, pageObj, Operation)
  const { isSuccess, message, activeTab, Sfsbwx = '' }: any = validResult
  pageObj.formData.Sfsbwx = Sfsbwx

  if (!isSuccess) {
    message && showMessageError(message)
    activeTab && (activeName.value = activeTab)
  }

  // 初始化 k2 参数
  initK2Data()

  return isSuccess
}

// sap 数据交互
const handleSave = async (Operation = 'SAVE') => {
  const data = dealPostData(dataDirectoryRef, pageObj, Operation)
  const res: any = await postDataWithRetMsg('ZFLY_VISA_DESIGN_SRV', 'VisaHeadSet', data)
  if (res?.d?.Guid) {
    pageObj.formData.Guid = res.d.Guid
    guid.value = res.d.Guid
  }

  if (guid.value) {
    await listInformationRef.value?.handleSaveList() // 保存清单信息
  }

  if (tabAuth.value.wxcb && guid.value && wxcbCanEdit.value) {
    await invalidCostRef.value?.saveSubmit(res.d.Guid) // 保存无效成本
  }

  return res.d
}

/**
 * 现场签证保存及提交
 */
const onOperateClick = async (Operation) => {
  // 校验失败退出
  if (!(await validPostData(Operation))) {
    return
  }

  // 走提交 K2 逻辑
  if (Operation === 'SUBMIT') {
    if (SN.value || formId.value) {
      onReK2Submit()
    } else {
      onK2Submit()
    }
    return
  }

  // 走其他操作逻辑
  pageLoading.value = true
  return handleSave(Operation).then((res) => {
    pageLoading.value = false
    showMessageSuccess('数据保存成功')
    refresh()
    return res
  }).catch(({ message }) => {
    message && showMessageError(message)
    pageLoading.value = false
  })
}

const initK2Data = () => {
  // eslint-disable-next-line no-undef
  KStarForm.vmFormData.vmFormContent.JS_ProjectType = pageObj.formData.VisaMajors || ''
  // eslint-disable-next-line no-undef
  KStarForm.vmFormData.vmFormContent.JS_Entrustedunit = pageObj.formData.Iswtpt
  // eslint-disable-next-line no-undef
  KStarForm.vmFormData.vmFormContent.JS_Amount = pageObj.formData.tableData[0].hs
}

const beforeK2 = async () => {
  try {
    const res = await handleSave('SUBMIT')
    const guidValue = res?.Guid
    if (guidValue) {
      pageLoading.value = true
      Object.assign(K2Form.entity, {
        Hguid: guidValue,
        BizId: guidValue,
        MessageSet: []
      })

      K2Form.formData.vmFormContent.integrationId = guidValue // guid，放到k2参数里面
    }
    return K2Form.entity
  } catch (error) {
    return false
  }
}

const afterK2 = async (data, accessUrl, resultData) => {
  pageLoading.value = false
  if (resultData && resultData.data.Item1 === true) {
    if (resultData.data.Item2) {
      const url = router.resolve({
        name: 'k2VisaOnsiteReview',
        query: {
          FormId: resultData.data.Item2
        }
      })
      window.open(url.href, '_blank')
    }
    nextTick(() => {
      guid.value = pageObj.formData.Guid
      pageObj.formData.Status = '20'
      editMode.value = false
      // 重绘页面，避免 slot 属性未更新
      compKey.value = moment().milliseconds()
    })

    return true
  }
  return false
}

defineExpose({
  validPostData,
  handleSave
})

</script>

<style lang="scss" scoped>
.common-body {
  .el-tabs {
    position: sticky;
    top: 0;
    background: white;
    z-index: 100;
  }

  .main {
    margin-bottom: 50px;
  }
}
</style>
