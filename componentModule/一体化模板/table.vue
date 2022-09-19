<template>
	<TableTree
	        class="table-tree"
	        :class="{ edit: isEdit }"
	        :tableData="tableData"
	        :tableLabel="tableLabel"
	      >
	        <template #checkbox="{ row, column }">
	          <!--第一列是外网注册-->
	          <el-checkbox
	            v-if="column.no > 0 && row.storageNodeDetailsVOList[column.no - 1]"
	            :disabled="!isEdit"
	            size="large"
	            v-model="row.storageNodeDetailsVOList[column.no - 1].status"
	          ></el-checkbox>
	        </template>
	      </TableTree>
</template>

<script>
</script>

<style>
</style>
供应商名称：
准入申请通过日期：

合作时间限制(月)：

单次预算限制(万)：

招标次数限制(次)：

创建日期：
申请人：


产品服务类别:
准入申请记录:
原到期日期:
中投标次数限制
分工比例限制:
单据状态︰
申请人组织:

所属库:
累计合作金额限制(万)
本次延期申请到期日:

组织范围限制:
申请人部门:
