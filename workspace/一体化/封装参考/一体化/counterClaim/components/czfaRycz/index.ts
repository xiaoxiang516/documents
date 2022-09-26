import RYCZ from './czfaRyczIndex.vue'

import { reactive } from 'vue'

const pageControl = reactive<{ pageLoading: boolean }>({
  pageLoading: false
})

// 人员处置
const ryczObj = reactive<any>({
  tableSchema: [
    'Seqno', // 序号
    'Classify01', // 增加人员类型
    'Classify02', // 增加职务/工种
    'Unit', // 计量单位
    'Quantities', // 增加工程量
    'Description' // 备注
  ],
  tableUiSchema: {},
  rules: {}
})

const Fn = {
  /**
   * 表格操作栏按钮数据
   * @returns Array<{ key: string; label: string }>
   */
  getRowButton: (): Array<{ key: string; label: string }> => [
    {
      key: 'del',
      label: '删除'
    }
  ]
}

export { pageControl, Fn, ryczObj }

export default RYCZ
