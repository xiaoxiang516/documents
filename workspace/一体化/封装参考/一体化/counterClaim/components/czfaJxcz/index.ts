import JXCZ from './czfaJxczIndex.vue'

import { reactive } from 'vue'

const pageControl = reactive<{ pageLoading: boolean }>({
  pageLoading: false
})

// 机械处置
const jxczObj = reactive<any>({
  tableSchema: [
    'Seqno', // 序号
    'Classify02', // 增加机械类型
    'Style', // 增加机械型号
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

export { pageControl, Fn, jxczObj }

export default JXCZ
