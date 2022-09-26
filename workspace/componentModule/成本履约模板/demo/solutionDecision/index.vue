<template>
  <div class="common-app">
    <!-- 方案对比 -->
    <solution-comparison></solution-comparison>
    <!-- 项目决策 -->
    <ProAreaDecision ref="projectDecisionRef" type="项目"></ProAreaDecision>
    <!-- 各条线建议及风险点提示 -->
    <risk-advise-and-tips :labelMode="false"></risk-advise-and-tips>
    <!-- 区域决策 -->
    <ProAreaDecision ref="areaDecisionRef" type="区域"></ProAreaDecision>
    <!-- 销项计划    -->
    <output-plan></output-plan>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose } from 'vue'
import RiskAdviseAndTips from '@/views/co/contractPerformance/eventDecision/stop/components/solutionDecision/riskAdviseAndTips.vue'
import outputPlan from '@/views/co/contractPerformance/eventDecision/stop/components/solutionDecision/outputPlan.vue'
import ProAreaDecision from '@/views/co/contractPerformance/eventDecision/stop/components/solutionDecision/proAreaDecision.vue'
import solutionComparison from '@/views/co/contractPerformance/eventDecision/stop/components/solutionDecision/solutionComparison.vue'

// 表格必填校验
const validFormData = () => {
  //return projectInfoRef.value.validData()
}

defineExpose({
  validFormData
})
</script>

<style lang="scss" scoped>
</style>
