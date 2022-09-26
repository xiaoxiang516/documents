<template>
  <Modal
    width="80%"
    v-model="isVisible"
    title="文件下载列表"
    @on-ok="ok"
    @on-cancel="cancel"
    class="download-dialog"
  >
    <Spin size="large" fix v-if="loading"></Spin>
    <div class="download-content">
      <Row :gutter="32">
        <Col :span="10">
          <div class="label">项目状态</div>
          <Select
            v-model="params.jobStatus"
            @on-change="onSearch"
            clearable
          >
            <Option v-for="(item, index) in statusData"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
            </Option>
          </Select>
        </Col>
        <Col :span="10">
          <div class="label">关键字</div>
          <Input v-model.trim="params.keyword"
                 clearable
                 placeholder="输入关键字进行查询" />
        </Col>
      </Row>
      <div class="pt-20">
        <Table
          :columns="columns"
          :data="tableData"
        >
          <template slot-scope="{ row }" slot="operation">
            <Button  type="text" v-if="row.JobStatus === 1"  @click="download(row)">下载</Button>
          </template>
        </Table>

        <div style="text-align: right">
          <Page
            style="padding-top: 20px"
            :current.sync="pager.pageIndex"
            :page-size="pager.pageSize"
            :total="pager.total"
            :page-size-opts="[10, 20, 50]"
            size="small"
            show-elevator
            show-sizer
            show-total
            @on-change="handleCurrentChange"
            @on-page-size-change="handleSizeChange" />
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import md5Encrypt from "js-md5";
import axios from "axios";
import {debounce} from "./util";

export default {
  name: "downloadList",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      isVisible: false,
      tableData: [],
      params: {
        pageIndex: 1,
        pageSize: 20,
        keyword: null,
        jobStatus:null,
        sortName:'RowIndex',
        sortType:'ascending'
      },
      statusData: [
        { label: '全部', value: '' },
        { label: '打包中', value:'0' },
        { label: '已打包', value: '1' },
      ],
      pager: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      baseUrl: 'http://10.109.14.29/ApiServer',
      loading: false,
    }
  },
  watch: {
    visible(val) {
      this.isVisible = val
      if(val) { // 弹窗组件接口调用放在created里面只会调用一次
        this.getProjectTableData()
      }
    },
    "params.keyword": debounce(function () {
      this.onSearch()
    }, 500)
  },
  created() {  },
  methods: {
    // 对于可选参数的处理与判断，params如果没有 区分要不要用户信息，判断第二个参数是params，还是
    /**
     * description 此处的post 数据修改及添加，也查询
     * @params {String} url：链接(必填)
     * @params {Object} params：参数(可选)
     * @params {Boolean} needUserInfo：参数(可选)，判断要不要用户信息
     * **/
    $httpPost(url, params, needUserInfo = true) { // isUpdate
      if (!url) {
        console.error('请输入链接')
        return
      }
      return new Promise(resolve => {
        let key = "E7ACD473655D469AAE0F8BE3680532B2"
        let timestamp = new Date().getTime()
        let str = key+ timestamp
        let sign = md5Encrypt(str).toUpperCase()
        let sParams = {},
          isNeedUserInfo = needUserInfo
        if(typeof params === 'object' ) { // 判断要不要用户信息, {}, array
          sParams = params
        } else {
          isNeedUserInfo = params
        }
        if(isNeedUserInfo) {
          let userObj = JSON.parse(sessionStorage.getItem('meJson'))
          sParams.UserBip = userObj.username || ''
          sParams.UserName = userObj.name || ''
        }

        axios.post(`${this.baseUrl}${url}?sign=` + sign  + '&timestamp=' + timestamp, sParams).then(res => {
          resolve(res.data)
        }).catch(() => {})
      })
    },
    ok() {
    },
    cancel () {
      this.$emit('close')
    },
    // 获取项目列表数据
    getProjectTableData () {
      this.params.pageIndex = this.pager.pageIndex;
      this.params.pageSize = this.pager.pageSize;
      // this.loading = true
      this.$httpPost('/api/pdm/catalog/outsource/job/list', this.params).then((res) => {
        console.log('--xx--res', res)
        // this.loading = false
        this.tableData = res.Data.Rows
        this.pager.total = res.Data.Total
      })
    },
    // 修改页数
    handleCurrentChange (val) {
      this.pager.pageIndex = val
      this.getProjectTableData()
    },

    handleSizeChange (val) {
      this.pager.pageSize = val
      this.pager.pageIndex = 1
      this.getProjectTableData()
    },
    // 获取状态
    mapStatus(val){
      switch (val) {
        case 0:
          return "打包中";
          break;
        case 1:
          return "已打包";
          break;
        case -1:
          return "打包失败";
          break;
        default:
          break;
      }
    },
    download(row){
      console.log('www', row)
      this.$httpPost('/api/pdm/catalog/outsource/zip-url/' + row.JobId, {JobId:row.JobId }).then(res => {
        window.open(res.Data)
      })
      // this.$get(`/api/pdm/obsTaskJobs/download-zip?jobTaskId=${row.JobTaskId}`,res =>{
      //   window.open(res)
      // })
    },
    onSearch() {
      this.pager.pageSize = 1
      this.getProjectTableData()
    }
  },
  computed: {
    columns() {
      let columnsArr = [
        {
          type: 'index',
          width: 80,
        },
        {
          title: "下载任务名称",
          key: "JobName",
          minWidth: 200,
        },
        {
          title: "用户",
          key: "CreateByName",
          minWidth: 200,
        },
        {
          title: "下载时间",
          key: "CreateDate",
          minWidth: 200,
        },
        {
          title: "状态",
          key: "JobStatus",
          minWidth: 200,
          render: (h, {row}) => {
            return h("span",{},this.mapStatus(row.JobStatus))
          }
        },
        {
          title: "操作",
          align: "center",
          slot: "operation",
        }

    ]
      return columnsArr
    }
  }
}
</script>

<style lang="less" scoped>
.download-dialog {
  //隐藏取消确定按钮
  /deep/ .ivu-modal-footer {
    display: none;
  }
  .download-content {
    padding: 0 20px 0 20px;
    .label {
      margin-bottom: 8px;
    }
    .pt-20 {
      padding-top: 20px;
    }
  }
}


</style>
