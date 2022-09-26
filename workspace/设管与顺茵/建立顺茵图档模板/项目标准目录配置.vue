<template>
    <div class="body-box project-list">
        <div class="bread-box">
            <div class="bread-left-box">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item title="首页">
                      <a href="/"><i class="el-icon-location mr-4"></i>首页</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item :title="activeMenuName">{{ activeMenuName }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <el-card>
            <div slot="header">
              <b class="box-title">{{ activeMenuName }}</b>
            </div>
            <div>
              <el-button
                @click="getNewCalalog"
             ><i class="iconfont icon-build mr-10"></i>新建目录</el-button>
              <el-button
                @click="deleteCatalog"
             ><i class="iconfont icon-deleter mr-10"></i>删除</el-button>

            </div>

            <div class="projectTable mt-20">
              <el-table :data="tableData">
                <el-table-column label="文档名">
                  <template slot-scope="scope">
                    <span class="text-primary cursor-pointer" @click="fileNameClickHandler(scope.row)">{{ showFileName(scope.row) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="大小" width="100" align="center">
                  <template slot-scope="scope">{{ formatFileSize(scope.row.FileSize) }}</template>
                </el-table-column>
                <el-table-column label="日期" width="160" align="center">
                  <template slot-scope="scope">{{ formatTime(scope.row.UploadDate, 'YYYY-MM-DD') }}</template>
                </el-table-column>
                <el-table-column label="上传人" prop="Uploader" width="120" align="center" />
              </el-table>
            </div>
            <div class="mt-20">
                <sapi-pagination :props="paginationOpt" @should-fetch-data="handleShouldFetchData"></sapi-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import commonFilterContainer from '@/pages/pdm/components/common-filter-container.vue'
import paginationDef from '@/pages/pdm/static/js/defs/pagination.def.js'
import FixedEltableHeader from '@/directives/fixed-eltable-header/index.js'

export default {
    components: {
        commonFilterContainer,
    },
    directives: {
        FixedEltableHeader
    },
    data () {
        const { pageIndex, pageSize, pageTotal, pageArr, layout } = paginationDef()
        return {
            activeMenuName: null,

            tableData: [],
            params: {
                pageIndex,
                pageSize,
                status: null,
                areaId: null,
                keyword: null,
                landObtainType: null,
                reasonType: null
            },
            // 分页控制
            paginationOpt: {
                pageIndex,
                pageSize,
                pageTotal,
                pageArr,
                layout
            },
        }
    },
    created () {
        this.$init()
        // this.activeMenuName = sessionStorage['activeMenuName']
        this.activeMenuName = "项目标准目录配置"
    },
    computed: {

    },
    methods: {
      // 获取区域信息
      getAreaData () {
        this.$get('/api/plat/manageAreas/areaList', res => {
          this.areaData = res
          this.filterData.push({
            index: 1,
            title: '所属区域',
            prop: 'areaId',
            data: [{
              AreaName: '全部',
              AreaId: null,
            }].concat(this.areaData),
            callback: this.projectStatusChange,
            option: { label: 'AreaName', value: 'AreaId' }
          })
        })
      },
      // 获取项目列表数据
      getProjectTableData () {
          this.params.pageIndex = this.paginationOpt.pageIndex
          this.params.pageSize = this.paginationOpt.pageSize
          this.$get('/api/pdm/pMPartnerProjects', this.params, res => {
              this.projectTableData = res.Rows
              this.paginationOpt.pageTotal = res.Total
          })
      },
      //编辑
      browseEditFlow (row) {
          let openUrl = `/task/index.html#/planTaskAdd?type=edit&modeId=PartnerProjectApproval&modeName=补充项目立项&ProjectId=${row.Id}`
          window.open(openUrl)
      },
      //删除
      browseDeleteFlow (row) {
          this.$confirm('您确定要删除该项吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$delete(`/api/pdm/pMPartnerProjects/${row.Id}`, res => {
                  this.$message({
                      type: 'success',
                      message: '删除成功！'
                  })
                  this.getProjectTableData()
              }, error => {
                  this.$message.error(error.Message)
              })
          }).catch(() => {
          })
      },
      //查看
      toBrowse() {},
      // 新增立项
      addProjectApproval () {
          const menuId = this.$getMenuId('/task/index.html#/planTask').MenuId
          let openUrl = `/task/index.html#/planTaskAdd?type=add&modeId=PartnerProjectApproval&modeName=补充项目立项&menuId=${menuId}`
          window.open(openUrl)
      },
      // 导出明细
      exportTable () {
          let exportUrl = `${window.webConfig.baseUrl}/api/pdm/pMPartnerProjects/export?`
          for (const key in this.params) {
              if (this.params.hasOwnProperty(key) && !['pageIndex', 'pageSize'].includes(key) && this.params[key]) {
                  exportUrl = exportUrl + key + `=${this.params[key] || ''}&`
              }
          }
          exportUrl = exportUrl + `access_token=${sessionStorage['access_token']}`
          window.open(exportUrl)
      },

      //重置按钮
      clearProjectTableData () {
          Object.assign(this.params, this.$options.data().params)
          this.getProjectTableData()
      },
      keywordChange (val) {
          if (val === '') {
              // 当关键字清空时重置页数
              this.paginationOpt.pageIndex = 1
              this.getProjectTableData()
          }
      },

      // 分页变化
      handleShouldFetchData ({ pageIndex, pageSize }) {
          this.paginationOpt.pageIndex = pageIndex
          this.paginationOpt.pageSize = pageSize
          this.getProjectTableData()
      },

      getNewCalalog() {},
      deleteCatalog() {},

    },


}
</script>

<style lang="less">


</style>
