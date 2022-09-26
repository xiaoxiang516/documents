<template>
  <!-- 文件授权选人面板 -->
  <sapi-dialog
    v-model="visible"
    top="8%"
    width="90%"
    height="85%"
    :hasMax="false"
    @on-open="onShow"
    @on-close="onClose"
    class="grant_panel_dialog">
    <div slot="title" class="dialog_title">{{ isProjectCategoriesGrant ? '项目目录授权' : '文件夹批量授权' }}</div>
    <div class="dialog_body">
      <div class="grant_panel_layout clearfix">
        <div class="grant_panel_layout__left">
          <div v-if="isProjectCategoriesGrant">
            <el-tree
              ref="categoryTree"
              :data="projectCategories"
              node-key="ItemId"
              highlight-current
              :props="{ label: 'ItemName', value: 'ItemId', children: 'Children' }"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="handleCategoryNodeClick"
              class="project_tree">
                <el-tooltip slot-scope="{ node, data }"  effect="light" :open-delay="1000" :content="node.label" placement="top-start">
                  <span class="custom-tree-node">
                    <file-icon v-if="data.Type === 3" is-folder />
                    <i v-else :class="'tree-icon icon' + data.Type"></i>
                    <span class="custom-tree-node__label" style="vertical-align: middle;position: relative;">{{ node.label }}</span>
                  </span>
                </el-tooltip>
              </el-tree>
          </div>
          <div v-else class="block margin_bottom__15">
            <h3 class="title">已选文件夹({{ files.length }})：</h3>
            <div class="block_inner">
              <!-- <el-tag
                @close="handleFileTagClose(tag)"
                v-for="(tag, idx) in files"
                :key="idx"
                closable
                class="file_tag">
                <file-icon
                  :type="tag[fileProps.suffix]"
                  :is-folder="tag.IsCategory || tag.IsFolder"
                  :isUp6Folder="tag.IsFolder"></file-icon>
                  {{ tag[fileProps.label] + (tag[fileProps.suffix] || '') }}</el-tag> -->
                <div
                  v-for="(tag, idx) in files"
                  :key="idx"
                  class="display__flex align_items__center padding_top__5px padding_bottom__5px">
                  <file-icon
                    :type="tag[fileProps.suffix]"
                    :is-folder="tag.IsCategory || tag.IsFolder"
                    :isUp6Folder="tag.IsFolder"></file-icon>
                    <span flex__1_0>{{ tag[fileProps.label] + (tag[fileProps.suffix] || '') }}</span>
                </div>
            </div>
          </div>
        </div>
        <div class="grant_panel_layout__right">
          <div v-show="computedSearchVisible" class="margin_bottom__20px">
            <el-radio-group v-model="isPublic">
              <el-radio :label="true">公开</el-radio>
              <el-radio :label="false">授权</el-radio>
            </el-radio-group>
          </div>
          <el-tabs 
            v-model="activeTabName" 
            type="card" 
          >
            <el-tab-pane
              v-for="tabPanel in computedTabs"
              :key="tabPanel.name"
              :label="tabPanel.label"
              :name="tabPanel.name">
              <div class="table_top">
                <el-input
                  v-show="computedSearchVisible"
                  v-model="filter[tabPanel.name].keyword"
                  placeholder="搜索名字"
                  clearable
                  @clear="onSearch"
                  @keyup.native.enter="onSearch"
                  :maxlength="20"
                  style="width: 220px">
                  <el-button @click="onSearch" slot="append" icon="el-icon-search">查询</el-button>
                </el-input>
                <template v-if="computedActionsVisible">
                  <el-button @click="selectUsersVisible = true" type="primary" size="mini">选择用户</el-button>
                  <el-button @click="handleRemoveTableRow(-1, true)" type="primary" size="mini">删除</el-button>
                  <el-button @click="handleReset(tabPanel.name)" type="primary" size="mini">重置</el-button>
                </template>
              </div>
              <el-table
                :data="tableData[tabPanel.name].slice((params.pageIndex-1)*params.pageSize, (params.pageIndex-1)*params.pageSize + params.pageSize)"
                stripe
                style="width: 100%"
                max-height="340"
                @selection-change="handleTableSelectionChange">
                <el-table-column
                  v-if="!isPublic"
                  key="selection_column"
                  type="selection"
                  width="55" />
                <el-table-column label="用户名称" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.AliasName }}</template>
                </el-table-column>
                <el-table-column v-if="!isPublic" label="操作" width="100" align="center">
                  <template slot-scope="scope">
                    <span class="text-primary cursor-pointer" @click="handleRemoveTableRow(scope.row)">删除</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination v-show="tableData[tabPanel.name].length" @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData[tabPanel.name].length">
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div slot="dialogBox" class="dialog_footer">
      <!-- <el-switch
        v-model="isPublic"
        active-color="#0089FF"
        inactive-color="#B21630"
        active-text="公开"
        inactive-text="授权"
        style="margin-right: 10px;">
      </el-switch> -->
      <el-button @click="onOk" type="primary">确 定</el-button>
      <el-button @click="onClose">取 消</el-button>
    </div>
    <!-- 组件 -->
    <select-user v-transfer-dom v-model="selectUsersVisible" :multiple="true" :data="tableOriginData[activeTabName]" @callback="handleSelectUsers" />
  </sapi-dialog>
</template>

<script>
import asyncFunctionErrorCatcher from '@/static/js/utils@hyk/asyncFunctionErrorCatcher';
import SapiDialog from '@/components/sapi-dialog';
import SelectUser from '@/components/selectUser';
import TransferDom from '@/pages/pdm/directives/transfer-dom';
import Emitter from '@/pages/pdm/mixins/emitter';
import { transferMetaCharacters, deepClone, getTreeNodeDataById } from '@/static/js/utils@hyk/stable/helper';
import FileIcon from '../fileIcon';
import fileOperDef from '../fileOperDef';

export default {
  name: 'GrantPanel',
  componentName: 'GrantPanel',
  directives: {
    TransferDom,
  },
  mixins: [Emitter],
  components: {
    SapiDialog,
    SelectUser,
    FileIcon,
  },
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
    /**
     * 选中的文件列表
     */
    files: {
      type: Array,
      default() {
        return [];
      },
    },
    fileProps: {
      type: Object,
      default() {
        return  {
          label: 'ItemName',
          suffix: 'FileExtension',
          id: 'ItemId',
        };
      },
    },
    // 是否是项目目录授权
    isProjectCategoriesGrant: Boolean,
    // 项目目录授权时需要
    projectId: String,
  },
  data() {
    return {
      //
      visible: false,
      selectUsersVisible: false, // 选择用户弹框
      //
      isPublic: false,
      //
      tableOriginData: {
        view: [],
        viewDownload: [],
      },
      tableData: {
        // tab的name属性作为键名
        view: [],
        viewDownload: [],
      },
      tableSelection: {
        view: [],
        viewDownload: [],
      },
      filter: {
        view: {
          keyword: null,
        },
        viewDownload: {
          keyword: null,
        },
      },
      //
      activeTabName: 'view',
      //
      projectCategories: [],
      activeCategoryId: null,
      params: {
        pageIndex: 1,
        pageSize: 6
      },
      pageArr: [6, 18, 48, 200]
    };
  },
  computed: {
    computedTabs() {
      return [
        {
          name: 'view',
          label: `浏览授权（${this.tableData.view.length}）`,
        },
        {
          name: 'viewDownload',
          label: `浏览及下载授权（${this.tableData.viewDownload.length}）`,
        },
      ];
    },
    computedActionsVisible() {
      return !this.isPublic && (!this.isProjectCategoriesGrant || (this.isProjectCategoriesGrant && this.activeCategoryId));
    },
    computedSearchVisible() {
      return (!this.isProjectCategoriesGrant || (this.isProjectCategoriesGrant && this.activeCategoryId));
    },
  },
  watch: {
    value(n) {
      this.visible = n;
    },
  },
  created() {
    this.visible = this.value;
  },
  methods: {
    onShow() {
      if (this.isProjectCategoriesGrant) {
        this.fetchProjectCategories();
      }
    },
    onClose() {
      // 初始化数据
      const initData = this.$options.data();
      Object.keys(initData).forEach((key) => {
        this[key] = initData[key];
      });
      this.$emit('input', false);
    },
    fetchProjectCategories: asyncFunctionErrorCatcher(async function f() {
      const res = await this.$promiseGet(`api/pdm/projectDocuments/${this.projectId}/topCategorys`, {
        // 1:项目普通文档目录(针对项目标签卡中的项目文档) 2:项目审图文档目录（针对图档管理成果库的项目文档）
        moduleId: 2,
      });
      this.projectCategories = [res.Data];

      // this.$nextTick(this.expandAllNodes);
    }),
    /**
     * 项目目录授权
     */
    async projectCategoriesSubmit() {
      if (!this.activeCategoryId) {
        throw new Error('请先选择一个分期或目录');
      }
      const viewDownloadUserIds = this.tableOriginData.viewDownload.map(_ => _.UserId);
      // 浏览下载权限里的人不要出现
      const viewUserIds = this.tableOriginData.view.map(_ => _.UserId).filter(_ => !viewDownloadUserIds.includes(_));
      const viewOper = this.isPublic ? fileOperDef.OP_PUBLIC : fileOperDef.OP_REVIEW;
      const viewDownloadOper = this.isPublic ? fileOperDef.OP_PUBLIC : (fileOperDef.OP_REVIEW + fileOperDef.OP_DOWNLOAD);
      const request = {
        CategoryId: this.getCurrentCategoryId(),
        // 1公开2授权
        AccessMode: this.isPublic ? 1 : 2,
        Users: [
          ...viewUserIds.map(_ => ({ UserId: _, Oper: viewOper })),
          ...viewDownloadUserIds.map(_ => ({ UserId: _, Oper: viewDownloadOper })),
        ],
      };

      const res = await this.$promisePut('/api/plat/categories/users/update', request);
      this.$message.success(res.Message);
    },
    /**
     * 文件夹批量授权
     */
    async batchCategoriesSubmit() {
      const categoryIds = this.files.map(_ => _.CategoryId);
      const viewDownloadUserIds = this.tableOriginData.viewDownload.map(_ => _.UserId);
      // 浏览下载权限里的人不要出现
      const viewUserIds = this.tableOriginData.view.map(_ => _.UserId).filter(_ => !viewDownloadUserIds.includes(_));
      const viewOper = this.isPublic ? fileOperDef.OP_PUBLIC : fileOperDef.OP_REVIEW;
      const viewDownloadOper = this.isPublic ? fileOperDef.OP_PUBLIC : (fileOperDef.OP_REVIEW + fileOperDef.OP_DOWNLOAD);
      const grantUsers = [
        // 浏览权限
        {
          CategoryIds: categoryIds,
          // 浏览下载权限里的人不要出现
          UserIds: viewUserIds,
          Oper: viewOper,
        },
        // 浏览下载权限
        {
          CategoryIds: categoryIds,
          UserIds: viewDownloadUserIds,
          Oper: viewDownloadOper,
        },
      ];
      const request = {
        // 1公开2授权
        AccessMode: this.isPublic ? 1 : 2,
        GrantUsers: grantUsers,
      };
      const res = await this.$promisePost('/api/plat/categories/users/batchGrant', request);
      this.$message.success(res.Message);
    },
    onOk: asyncFunctionErrorCatcher(async function f() {
      if (this.isProjectCategoriesGrant) {
        await this.projectCategoriesSubmit();
      } else {
        await this.batchCategoriesSubmit();
      }

      this.$emit('callback');
      this.onClose();
    }),
    showFileName(file) {
      if (file.IsFolder) {
        return file.FileName + '（文件夹）';
      }
      return file.FileName + file.Extension;
    },
    handleFileTagClose(file) {
      if (this.files.length <= 1) {
        this.$message.warning('请至少保留一个文件');
        return false;
      }
      const copy = [...this.files];
      copy.splice(copy.indexOf(file), 1);
      this.$emit('files-change', copy);
      return true;
    },
    handleTableSelectionChange(rows) {
      this.tableSelection[this.activeTabName] = rows;
      // console.log(this.tableSelection);
    },
    handleSelectUsers(data) {
      this.tableOriginData[this.activeTabName] = data || [];

      this.onSearch();
    },
    handleRemoveTableRow(row, removeAllSelected) {
      if (removeAllSelected) {
        const selection = this.tableSelection[this.activeTabName];
        const selectionUserIds = selection.map(_ => _.UserId);
        const tableOriginData = this.tableOriginData[this.activeTabName];
        const results = [];
        tableOriginData.forEach((item) => {
          if (!selectionUserIds.includes(item.UserId)) {
            results.push(item);
          }
        });
        this.tableOriginData[this.activeTabName] = results;
      } else {
        const index = this.tableOriginData[this.activeTabName].findIndex(_ => _.UserId === row.UserId);
        if (index > -1) {
          this.tableOriginData[this.activeTabName].splice(index, 1);
        }
      }

      this.onSearch();
    },
    handleCategoryNodeClick(nodeData) {
      // 分期和目录才可以选
      if (nodeData.Type === 2 || nodeData.Type === 3) {
        this.activeCategoryId = nodeData.ItemId;
        this.filter = this.$options.data().filter;
        this.fetchCategoryGrantUsers();
      } else {
        this.$nextTick(() => {
          this.$refs.categoryTree.setCurrentKey(this.activeCategoryId);
        });
      }
    },
    onSearch() {
      const keyword = this.filter[this.activeTabName].keyword;
      this.tableData[this.activeTabName] = this.tableOriginData[this.activeTabName]
        .filter(row => (!keyword || new RegExp(transferMetaCharacters(keyword)).test(row.AliasName)));

    },
    getCurrentCategoryId() {
      return (getTreeNodeDataById(this.projectCategories, this.activeCategoryId, { id: 'ItemId', children: 'Children' }) || {}).CategoryId;
    },
    /**
     * 默认展开所有节点
     */
    // expandAllNodes() {
    //   this.$refs.categoryTree.store._getAllNodes().forEach((node) => {
    //     node.expanded = true;
    //   });
    // },
    fetchCategoryGrantUsers: asyncFunctionErrorCatcher(async function f() {
      const res = await this.$promiseGet('/api/plat/categories/user', {
        categoryId: this.getCurrentCategoryId(),
        pageIndex: 1,
        pageSize: 0,
      });
      const { tableOriginData, tableData, tableSelection } = this.$options.data();
      this.tableOriginData = tableOriginData;
      this.tableData = tableData;
      this.tableSelection = tableSelection;

      const category = getTreeNodeDataById(this.projectCategories, this.activeCategoryId, { id: 'ItemId', children: 'Children' });
      if (category) {
        this.isPublic = category.AccessMode === 1;
      }

      res.Data.Rows.forEach((row) => {
        if (row.Oper === 1) {
          this.tableOriginData.view.push(row);
        } else if (row.Oper === 3) {
          this.tableOriginData.viewDownload.push(row);
        }
      });
      this.tableData = deepClone(this.tableOriginData);

      this.onSearch();

    }),
    handleReset(tabName) {
      this.tableOriginData[tabName] = [];

      this.onSearch();
    },

    pageSizeChange(val) {
      this.params.pageIndex = 1
      this.params.pageSize = val
    },

    pageCurrentChange(val) {
      this.params.pageIndex = val
    },
  },
};

</script>

<style>
  .grant_panel_dialog .dialog-box-body {
    margin-bottom: 0px;
    padding-bottom: 10px;
  }
  .grant_panel_dialog .dialog-box-body {
    height: calc(100% - 112px);
  }
  .grant_panel_dialog .dialog-box-body {
    overflow: hidden;
  }
  .grant_panel_dialog .el-tabs__content {
    overflow: visible;
  }
</style>

<style scoped>
  /* #define */
  .margin_bottom__15 {
    margin-bottom: 15px;
  }
  /* #region */
  .dialog_body {
    /* padding: 20px; */
    height: 100%;
    width: 100%;
  }
  .dialog_footer {
    padding: 15px;
    text-align: center;
    border-top: 1px solid #e4e4e4;
  }
  .dialog_title {
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  /* #region */
  .grant_panel_layout {
    display: block;
    width: 100%;
    height: 100%;
  }
  .grant_panel_layout__left {
    width: 35%;
    height: 100%;
    /* background-color: red;   */
    padding: 15px;
    border-right: 1px solid #e4e4e4;
    float: left;
    overflow: auto;
  }
  .grant_panel_layout__right {
    width: 65%;
    height: 100%;
    /* background-color: blue; */
    padding: 15px;
    overflow: auto;
    float: left;
  }
  .title {
    line-height: 1.5;
    margin: 0;
    margin-bottom: 1em;
  }
  .grant_panel_dialog .file_tag {
    margin-right: 10px;
    margin-bottom: 10px;
    height: 24px;
  }
  .table_top {
    position: absolute;
    top: -52px;
    right: 0px;
  }
  .iconfont {
    margin-right: 5px;
  }
  .project_tree .custom-tree-node {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    overflow: hidden;
  }
  .project_tree .custom-tree-node__label {
    flex: 1 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  /* tree-icon */
  .tree-icon {
    display: inline-block;
    height: 15px;
    line-height: 15px;
    width: 14px;
    text-align: center;
    font-style: normal;
    color: #fff;
    margin-right: 4px;
    vertical-align: middle;
  }
  .tree-icon.icon1:after {
    content: "P";
  }
  .tree-icon.icon1 {
    background: #1ab283;
  }
  .tree-icon.icon2:after {
    content: "S";
  }
  .tree-icon.icon2 {
    background: #ffa95d;
  }
</style>
