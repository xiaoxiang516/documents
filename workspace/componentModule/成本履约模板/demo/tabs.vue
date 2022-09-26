<template>

	<!-- 01 -->
	<el-tabs v-model="activeName">
		<el-tab-pane label="决策信息" name="decisionInfo">
			<decision-info></decision-info>
		</el-tab-pane>
		<el-tab-pane v-for="item in tabPaneList" :key="item.name" v-bind="item">
			<solution :ref="setItemRef" :solDataKey="item.number"></solution>
		</el-tab-pane>
		<el-tab-pane label="方案决策" name="solutionDecision">
			<solution-decision></solution-decision>
		</el-tab-pane>
	</el-tabs>

</template>

<script>
</script>

<style>
</style>
