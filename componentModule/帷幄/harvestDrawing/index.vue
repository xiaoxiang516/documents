<template>
  <div class="layout">
    <div class="layout_left">
      <div class="filterInput">
        <Input v-model.trim="keyword"
               clearable
               @on-change="onSearch"
               @on-enter="onSearch"
               placeholder="搜索项目 ···" />
      </div>
      <div class="tree-content">
        <Tree
          ref="tree"
          :data="treeData"
          :render="renderContentFunc"
          @on-toggle-expand="handleNodeClick"
          @on-select-change="handleNodeClick"
        ></Tree>
        <Spin size="large" fix v-if="loading"></Spin>
      </div>
    </div>
    <div class="layout_right">
      <div class="project-title">
        <p class="title-name">{{ titleName }} <span style="color:red;">{{ProjectStatuName ? '（项目作废）':''}}</span> </p>
        <Button @click="downloadDialogVisible = true">下载记录</Button>
      </div>
      <div class="file_path">
        <span class="">目录：</span>
        <Breadcrumb class="file_path_breadcrumb">
          <BreadcrumbItem @click.native="clickRootCata">根目录</BreadcrumbItem>
          <BreadcrumbItem @click.native="catalogClick(path)"
                          v-for="(path, idx) in categoryPath"
                          :key="idx">{{ path.CatalogName }}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="project-title">
        <Button type="primary" @click="downloadDoc">下载</Button>
        <Input v-model.trim="params.keyword"
               clearable
               style="width: 300px"
               placeholder="输入文件名进行查询" />
      </div>
      <div class="content">
        <Table
          ref="catalogTable"
          :columns="columns"
          :data="tableData"
          @on-selection-change="handleTableSelectionChange"
        ></Table>
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

      <downloadList :visible="downloadDialogVisible"  @close="downloadDialogVisible = false"></downloadList>
    </div>
  </div>
</template>

<script>
import '../../../assets/iconfont/file-type/iconfont.css'
import '../../../assets/iconfont/file-type/iconfont.js'

import FileIcon from './fileIcon.vue'
import axios from 'axios';
import md5Encrypt from 'js-md5' // md5加密
import _ from 'lodash'
import {debounce} from "./util";
import downloadList from "./downloadList";
import filePreview from './js/preview.js'
import './js/layer.js'

export default {
  name: 'newDrawing',
  componentName: 'newDrawing',
  components: {
    FileIcon,
    downloadList
  },
  mixins: [filePreview],
  data () {
    const vm = this
    return {
      titleName: '',
      treeData: [],
      keyword: '',
      value: '',
      tableData: [],
      SysCategoryId: null,
      categoryId: '',
      CatalogId: '',
      SysCatalogId: '',
      parentCatalogId: '',
      projectId: '',
      pager: {
        pageSize: 10,
        pageIndex: 1,
        total: 0
      },
      ProjectStatuName: false,
      categoryPath: [], //
      userBip: "",
      userName: "",
      baseUrl: 'http://10.109.13.13/ApiServer',
      expandedKeys: [],
      AllData: [],
      paramsObj: {
        autoExpandParent: false,
        selectedKeys: [],
        treeData: [],
        expandedKeys: [],
      },
      loading: false,
      tableSelection: [],
      downloadDialogVisible: false,
      params: {
        keyword: null
      }
    }
  },
  methods: {
    $httpPost(url, params) {
      return new Promise(resolve => {
        let key = "E7ACD473655D469AAE0F8BE3680532B2"
        let timestamp = new Date().getTime()
        let str = key+ timestamp
        let sign = md5Encrypt(str).toUpperCase()
        axios.post(`${this.baseUrl}${url}?sign=` + sign  + '&timestamp=' + timestamp, params).then(res => {
          resolve(res.data)
        }).catch(() => {})
      })
    },
    $httpGet(url, params) {
      return new Promise(resolve => {
        let key = "E7ACD473655D469AAE0F8BE3680532B2"
        let timestamp = new Date().getTime()
        let str = key+ timestamp
        let sign = md5Encrypt(str).toUpperCase()
        axios.get(`${this.baseUrl}${url}?sign=` + sign  + '&timestamp=' + timestamp, params).then(res => {
          resolve(res.data)
        }).catch(() => {})
      })
    },
    dealData(list, self) {
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (self) {
          // item.parentName = self.orgName
          item.searchId = self.searchId + '`,`' + item.Id
        } else {
          item.searchId = item.Id
        }
        item.title = item.Name;
        item.key = item.Id;
        item.expand = false
        // if (item.orgCategoryCode == "GroupCompany") {
        //   this.paramsObj.expandedKeys.push(item.Id);
        // }
        item.scopedSlots = { title: "title" };
        item.children = item.Children
        if (item.Children.length) {
          this.dealData(item.Children, item);
        } else {
          item.isLeaf = true;
        }
      }
    },
    // 获取数据
    getTreeData () {
      return new Promise((resolve, reject) => {
        this.loading = true
        this.$httpPost('/api/pdm/catalog/outsource/tree').then((res) => {
          this.loading = false
          let arr = res.Data
          this.dealData(arr);
          this.treeData = arr
          this.AllData = _.cloneDeep(arr)
          // 得到第一个项目节点，并获取其对应的目录
          this.SysCatalogId = arr[0].Children[0].SysCatalogId
          this.titleName = arr[0].Children[0].Name
          this.getTableData(this.SysCatalogId, "")
          resolve()
        })
      })
    },

    // 获取子项目下的数据
    getTableData (SysCatalogId, parentCatalogId) {
      this.projectId = parentCatalogId
      SysCatalogId = SysCatalogId || this.SysCatalogId
      parentCatalogId = parentCatalogId || this.parentCatalogId
      this.SysCatalogId = SysCatalogId
      this.parentCatalogId = parentCatalogId
      let params = {
        SysCatalogId: this.SysCatalogId,
        CatalogId: parentCatalogId,
        PageIndex: this.pager.pageIndex,
        PageSize: this.pager.pageSize,
        UserBip: this.userBip,
        UserName: this.userName,
        Keyword: this.params.keyword,
      }
      this.$httpPost('/api/pdm/catalog/outsource/list', params).then(res => {
        this.tableData = res.Data.Rows
        this.pager.total = res.Data.Total
      })
    },
    // 修改页数
    handleCurrentChange (val) {
      this.pager.pageIndex = val
      this.getTableData(this.SysCatalogId, this.CatalogId)
    },

    handleSizeChange (val) {
      this.pager.pageSize = val
      this.pager.pageIndex = 1
      this.getTableData(this.SysCatalogId, this.CatalogId)
    },

    clickRootCata() {
      this.categoryPath = []
      this.parentCatalogId = ""
      this.getTableData(this.SysCatalogId, "")
    },
    // 点击文件
    catalogClick (row,onlyAdd) {
      if(onlyAdd) {
        this.categoryPath.push(row)
      } else {
        let index = this.categoryPath.findIndex(item => item.CatalogId === row.CatalogId)
        // 删除自身之后的
        // this.categoryPath.splice(index, this.categoryPath.length-index, row)
        this.categoryPath.splice(index+1, this.categoryPath.length-index)
      }

      this.getTableData(row.SysCatalogId, row.CatalogId)
      this.SysCatalogId = row.SysCatalogId
      this.CatalogId = row.CatalogId
      this.parentCatalogId = row.ParentCatalogId
    },
    // 点击树节点
    handleNodeClick (data, node) {
      console.log('---data', data, node)
      if(!node.isLeaf) { // 非叶子节点
        this.$set(node, "expand", !node.expand);
      }
      if (data.length && node.ParentId != null) {
        this.SysCatalogId = node.SysCatalogId
        this.titleName = node.Name
        this.ProjectStatuName = false
        if (node.ProjectStatuName == '项目作废') {
          this.ProjectStatuName = true
        }
        this.clickRootCata()
      }
    },
    renderContentFunc(h, { root, node, data }) {
      // console.log('root, node, data ', root, node, data )
      return h("Tooltip", {
        props: {
          content: data.Name,
          transfer: true,
          placement: "top-start",
          maxWidth:"250"
        }
      }, [
        h("span",
          {
            style: {
              // display: "inline-block",
              // overflow: "hidden",
              // textOverflow: "ellipsis",
              // whiteSpace: "nowrap"
            }
          },
          data.Name
        )
      ]);
    },
    add(arr) {
      arr.forEach((item) => {
        item.searchId = item.Id;
        this.add(item.Children || []);
      });
    },
    expand(arr) {
      arr.forEach((item) => {
        item.expand = true;
        this.expand(item.Children || []);
      });
    },
    onSearch () {
      const value = this.keyword
      const AllData = _.cloneDeep(this.AllData)
      if (!value) {
        this.treeData = AllData
        return
      }
      const treeList = []
      const expandedKeys = []
      this.fillterFun(AllData, value, treeList, expandedKeys)
      this.expand(treeList)
      this.treeData = treeList

      Object.assign(this.paramsObj, {
        expandedKeys,
        treeData: treeList,
        autoExpandParent: true
      })
      console.log('潇湘00treeList', this.paramsObj,treeList, expandedKeys)
    },
    fillterFun (arrAll, keyWord, treeList, expandedKeys) {
      arrAll.forEach(item => {
        if (item.title.indexOf(keyWord) > -1) {
          this.getExpandedKeys(item, expandedKeys)
          if (item.ParentId) {
            const searchIds = item.searchId.split('`,`')
            this.setParents(this.AllData, treeList, searchIds, 0)
          } else {
            treeList.push(item)
          }
        } else if (item.children && item.children.length) {
          this.fillterFun(item.children, keyWord, treeList, expandedKeys)
        }
      })
    },
    setParents (AllData, treeList, searchIds, idx) {
      AllData.forEach(data =>{
        const id = searchIds[idx]
        if (id === data.Id) {
          const {children, ...otherFile} = data
          if (idx === searchIds.length - 1) {
            this.setTreeList(treeList, data, id)
          } else {
            this.setTreeList(treeList, otherFile, id)
            if (data.children && data.children.length) {
              const treeItem = treeList.find(item => item.Id === id)
              !treeItem.children && (treeItem.children = [])
              this.setParents(data.children, treeItem.children, searchIds, idx + 1)
            }
          }
        }
      })
    },
    setTreeList (treeList, otherFile, id) {
      if (!treeList.find(item => item.Id === id)) {
        treeList.push(otherFile)
      }
    },
    getExpandedKeys (data, expandedKeys) {
      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.getExpandedKeys(item, expandedKeys)
        })
      } else {
        expandedKeys.push(data.key)
      }
    },
    handleTableSelectionChange (val) {
      this.tableSelection = val
    },
    downloadMultile(arr) {
      var count=0;
      for (var i = 0; i < arr.length; i++) {
        var hiddenIFrameID = 'hiddenDownloader' + count++;
        var iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.src = arr[i].DownloadUrl;//直接下载，不会弹出新的页面
      }
      // return window.open("" + urlspec);
    },
    // 下载文件
    downloadDoc () {
      if(!this.tableSelection.length) {
        this.$Message.warning('请勾选要下载的文件或文件夹')
        return
      }
      let catalogList = []
      let docList = []
      // 每个都是文件，不是目录
      let allIsDoc = this.tableSelection.every(item => !item.IsCatalog)
      if (allIsDoc) {
        this.$httpPost('/api/pdm/catalog/outsource/docs/urls', {
          DocIds: this.tableSelection.map(item => item.DocId),
          UserBip: this.userBip,
          UserName: this.userName,
        }).then((res) => {
          this.downloadMultile(res.Data)
          // res.Data.forEach((item, index) => {
          //   console.log("item.DownloadUrl", item.DownloadUrl)
          //   setTimeout(() => {
          //     console.log('window', window)
          //     // window.location.href=item.DownloadUrl
          //     window.open(item.DownloadUrl, 'name' + index)
          //   }, 1000)
          //
          // })
          console.log('cc--cc', res)
          this.$Message.success('下载成功')
          this.$refs.catalogTable.selectAll(false);
        })
        return;
      }

      this.tableSelection.forEach((i) => {
        if (i.IsCatalog) {
          catalogList.push(i.CatalogId)
        } else if (!i.IsCatalog) {
          docList.push(i.DocId)
        }
      })
      let downParams = {
        ParentCatalogId: this.tableSelection[0].ParentCatalogId,
        CatalogIds: catalogList,
        DocIds: docList,
        UserBip: this.userBip,
        UserName: this.userName,
      }
      this.$httpPost('/api/pdm/catalog/outsource/batchDownload', downParams).then(res => {
        this.$Message.success('文件下载中，请耐心等待，如要查看下载任务，请点击下载列表查看详情。')

        this.$refs.catalogTable.selectAll(false);
      }).catch(() => {
        this.$Message.error('批量下载任务提交失败')
      })
    },
    ok() {
    },
    cancel () {

    },
    async hasPreviewPermission (row) {
      if(!row.IsCatalog && (row.FilePath == null || row.FilePath == '')) {
        this.$message.warning('当前文件下载失败，不可预览')
        return
      }
      if (row.IsCatalog) return

      this.harvestFilePreview(row)
    },
  },
  created () {
    this.baseUrl = process.env.HarvestDrawingUrl
    // this.baseUrl = 'http://10.109.14.29/ApiServer'
    console.log('process', process.env)
    let userObj = JSON.parse(sessionStorage.getItem('meJson'))
    console.log('userObjuserObj', userObj)
    this.userBip = userObj.username
    this.userName = userObj.name
    this.getTreeData()

  },
  watch: {
    keyword: debounce(function () {
      this.onSearch()
    }, 500),
    'params.keyword': debounce(function () {
      this.getTableData()
    }, 500),
  },
  computed: {
    columns() {
      let columnsArr = [
        {
          type: 'selection',
          width: 80,
        },
        {
          title: "文件",
          key: "CatalogName",
          minWidth: 200,
          render: (h, {row}) => {
            let child = ''
            if(!row.IsCatalog && row.FileId == null) {
              child = h("Tooltip", {
                props: {
                  content: "该文件未归档完成",
                  transfer: true,
                  placement: "top-start",
                  maxWidth: "300",
                },
              }, row.DocName)
            } else {
              child = h("span",{
                style: {
                  color: '#006AFE',
                  cursor: !row.IsCatalog ? 'default' : 'pointer'
                },
                on: {
                  click: (event) => {
                    if(row.IsCatalog)  this.catalogClick(row, true)
                  },
                }
              },row.IsCatalog ? row.CatalogName : row.DocName)
            }
            let fileIcon = h(FileIcon, {
              style: {
                paddingRight: '10px'
              },
              props: {
                type: row.FileExtension || '.jpg',
                isFolder: row.IsCatalog
              },
            })
            // return <div>{fileIcon}{child}</div>
            return h("div", {
              on: {
                click: (event) => {
                  this.hasPreviewPermission(row)
                },
              }
            }, [fileIcon, child])
          }
        },
        {
          title: "上传时间",
          key: "FirstUploadDate",
          minWidth: 200,
        },
        {
          title: "上传人",
          key: "FirstUploadByName",
          minWidth: 200,
        },

      ]

      return columnsArr
    },
  },
  mounted () {},
  destroyed () { }
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  display: flex;
  .layout_left {
    flex-shrink: 0;
    //overflow: hidden;
    .filterInput,
    .tree-content {
      width: 268px;
      min-width: 268px;
    }
    .tree-content {
      height: calc(100% - 42px);
      border-right: 1px solid #dcdfe6;
      padding-right: 15px;
      overflow: auto;
      & /deep/ .ivu-tooltip-rel span {
        width: 200px;
        min-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
      }
    }
  }
  .layout_right {
    padding-left: 15px;
    width: 100%;
    overflow: auto;

    .project-title {
      display: flex;
      justify-content: space-between;
      .title-name {
        font-weight: bold;
        font-size: 1.17em;
        margin:10px 0;
      }
    }
    .file_path {
      display: flex;
      align-items: center;
      padding-top: 5px;
      padding-bottom: 5px;
      //border-bottom: 1px solid rgb(235, 238, 245);
      .file_path_breadcrumb {
        cursor: pointer;
      }
    }
    .content {
      padding-top: 10px;
    }
  }
}
/deep/ .ivu-tooltip-popper .ivu-tooltip-inner {
  max-width: fit-content!important;
}
.ivu-tooltip-inner {
  max-width: fit-content!important;
  white-space: normal!important;
}
</style>

