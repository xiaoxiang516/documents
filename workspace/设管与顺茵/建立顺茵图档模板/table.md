
<el-table :data="tableData">

	<el-table-column label="" prop=""></el-table-column>
	<el-table-column label="" prop="">
		<template slot-scope="scope">
			{{ scope.row }}
		</template>
	</el-table-column>
</el-table>

<el-table :data="tableData">
	 <el-table-column type="selection" width="45"></el-table-column>
	<el-table-column prop="" label="大小">
		<template slot-scope="scope">
			<span>{{calculateSize(scope.row.FileSize)}}</span>
		</template>
	</el-table-column>

	<el-table-column prop="" label="时间">
		<template slot-scope="scope">
			{{$dateFormat('yyyy-MM-dd', scope.row.)}}
		</template>
	</el-table-column>

	<el-table-column label="操作">
		<template slot-scope="scope">
			<el-button size="mini" type="text" @click=""></el-button>
		</template>
	</el-table-column>
	
	
</el-table>



<div class="mt-20">
	<sapi-pagination :props="paginationOpt" @should-fetch-data="handleShouldFetchData"></sapi-pagination>
</div>



<script type="text/javascript">
	import commonFilterContainer from '@/pages/pdm/components/common-filter-container.vue'
	import paginationDef from '@/pages/pdm/static/js/defs/pagination.def.js'

	export default {
		components: {
			commonFilterContainer,
		},
		data() {
			const {
				pageIndex,
				pageSize,
				pageTotal,
				pageArr,
				layout
			} = paginationDef()
			return {
				activeMenuName: null,
				tableData: [],
				params: {
					pageIndex,
					pageSize,
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
		created() {
			this.$init()
			// this.activeMenuName = sessionStorage['activeMenuName']
			this.activeMenuName = "回收站"
		},
		computed: {

		},
		methods: {
			// 获取区域信息
			getAreaData() {
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
						callback: this.getProjectTableData,
						option: {
							label: 'AreaName',
							value: 'AreaId'
						}
					})
				})
			},
			// 获取项目列表数据
			getProjectTableData() {
				this.params.pageIndex = this.paginationOpt.pageIndex
				this.params.pageSize = this.paginationOpt.pageSize
				this.$get('/api/pdm/pMPartnerProjects', this.params, res => {
					this.projectTableData = res.Rows
					this.paginationOpt.pageTotal = res.Total
				})
			},
			// 分页变化
			handleShouldFetchData({
				pageIndex,
				pageSize
			}) {
				this.paginationOpt.pageIndex = pageIndex
				this.paginationOpt.pageSize = pageSize
				this.getProjectTableData()
			},
			// 导出明细
			exportTable() {
				let exportUrl = `${window.webConfig.baseUrl}/api/pdm/pMPartnerProjects/export?`
				for (const key in this.params) {
					if (this.params.hasOwnProperty(key)) {
						exportUrl = exportUrl + key + `=${this.params[key] || ''}&`
					}
				}
				exportUrl = exportUrl + `access_token=${sessionStorage['access_token']}`
				window.open(exportUrl)
			},

			//重置按钮
			clearProjectTableData() {
				Object.assign(this.params, this.$options.data().params)
				this.getProjectTableData()
			},
			keywordChange(val) {
				if (val === '') {
					// 当关键字清空时重置页数
					this.paginationOpt.pageIndex = 1
					this.getProjectTableData()
				}
			},

			getNewCalalog() {},
			deleteCatalog() {},

		},


	}
	
	
	const dealData = (list, self) => {
  let arr = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    item.nodeDetails = [];

    if(item.storageNodeDetailsVOList) {
      arr = item.storageNodeDetailsVOList.map(st => st.storageNodeCode)
      item.outerNetRegister = arr.includes(0)
      item.innerNetRegister = arr.includes(1)
      item.infoCheck = arr.includes(2)
      item.INSPECT = arr.includes(3)
      item.ADMITTANCE = arr.includes(4)
      item.frameworkAgreement = arr.includes(5)
    } else {
      // Object.keys(tableLabel).forEach(key => {
      //   if(key !== 'proDescribe') {
      //     item[key] = 0
      //   }
      // })
      // item.outerNetRegister = 0
      // item.innerNetRegister = 0
      // item.infoCheck = 0
      // item.INSPECT = 0
      // item.ADMITTANCE = 0
      // item.frameworkAgreement = 0
    }
    // 保存
    item.storageNodeDetailsVOList = [{
      "code": "001001",
      "storageNodeCode": 1,
      "storageNodeName": "内网注册"
    }];
    // 保存，item.storageNodeDetailsVOList = []
    let node = {
      code: '',
      storageNodeCode: 0,
      storageNodeName: '',
    }
    // 保存处理
    const storageNodeNameData = ["外网注册","内网注册", "信息审查", "考察", "准入", "框架协议"]
    item.storageNodeDetailsVOList = []
    if(item.outerNetRegister) {
      node.code = ''
      node.storageNodeCode = 0
      node.storageNodeName = "外网注册"
      item.storageNodeDetailsVOList.push(node)
    }
    if(item.innerNetRegister) {
      node.code = ''
      node.storageNodeCode = 0
      node.storageNodeName = "内网注册"
      item.storageNodeDetailsVOList.push(node)
    }


    if (item.children && item.children.length) {
      dealData(item.children, item);
    }
  }
}
</script>
