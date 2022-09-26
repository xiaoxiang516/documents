import BZCS from './czfaBzcsIndex.vue'

import { reactive } from 'vue'

const pageControl = reactive<{ pageLoading: boolean }>({
  pageLoading: false
})

// 保障措施
const bzcsObj = reactive<any>({
  tableSchema: [
    'Seqno', // 序号
    'Type', // 措施类型
    'Description' // 具体措施
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

export { pageControl, Fn, bzcsObj }

export default BZCS
