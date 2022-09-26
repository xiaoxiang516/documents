

<el-button size="small" type="primary" @click=""></el-button>
<el-button size="small" type="text" @click=""></el-button>


<common-filter-container :filter-data="filterData" @callback="filterChange" v-model="params">
</common-filter-container>

<script type="text/javascript">
	filterChange() {
		// 重置页数
		this.paginationOpt.pageIndex = 1;
	},
	
	 office:
	 (1)	文档类：doc, docx, xls, xlsx, ppt, pptx, pdf, txt,
	 (2)	图片类：jpg, jpeg, gif, png, bmp, tif,
	 (3)	音频类：mp3, m4a, midi, wma,
	 (4)	压缩文件类：zip, rar, tar, 7z,
	 (5)	编程类：html,htm,xml,js,css,java,php,sql,
	 
	  李明生 (limingsheng03)
	  cad:
	 dwg,dxf,dwt,dws
	 
<!-- 动态校验 -->
<template>
	<div>
		<el-input>
			<el-button type="primary" slot="append" size="mini" @click=""></el-button>
		</el-input>
	</div>
	<sapi-row :gutter="20">
		<sapi-col :span="12">
			<el-form-item label="" prop="">
				<el-input maxlength="100" disabled="" placeholder="" v-model.trim="" ref="">
				</el-input>
			</el-form-item>
		</sapi-col>
		<sapi-col :span="8">
			<el-form-item label="" prop="">
				<el-radio-group v-model="" :disabled="isBrowse" @change="">
					<el-radio :label="true">是</el-radio>
					<el-radio :label="false">否</el-radio>
				</el-radio-group>
			</el-form-item>
		</sapi-col>

		<el-form-item label="" prop="">
			<el-select v-model="" disabled="">
				<el-option v-for="" :key="" :value="" :label=""></el-option>
			</el-select>
		</el-form-item>
	</sapi-row>
</template>

<script>
	this.$post('', this.projectInfo, res => {
		this.$message.success(res.Message)
	}, err => {
		this.$message.error(err.Message)
	})
	export default {
		data() {
			return {
				rules: {
					AreaId: [{
						required: true,
						message: '',
						trigger: 'change'
					}],
				},
			}
		},
		methods: {
			checkboxChange() {
				let obj = {
					'1': 'CivilDrawingOptions',
					'2': 'DecorationDrawingOptions',
					'3': 'DecorateElectDrawingOptions',
				}
				let textObj = {
					'1': 'CivilDrawingOptionsText',
					'2': 'DecorationDrawingOptionsText',
					'3': 'DecorateElectDrawingOptionsText',
				}
				let arr = ['1', '2', '3'] // 不定义此数组forEach不执行，很奇怪
				let relatesTypes = this.baseForm.RelatesTypes || []
				arr.forEach(item => {
					if (item !== relatesTypes[0]) { // 右边为undefined就清空全部
						this.baseForm[obj[item]] = []
						this.baseForm[textObj[item]] = []
					}
				})
			},
			selectChange() {
				
			},
		}
	}
</script>

<style>
</style>
