import CLCZ from './czfaClczIndex.vue'

import { reactive } from 'vue'

const pageControl = reactive<{ pageLoading: boolean }>({
  pageLoading: false
})

// 材料处置
const clczObj = reactive<any>({
  tableSchema: [
    'Seqno', // 序号
    'Classify02', // 增加材料类型
    'Classify03', // 增加材料名称
    'Style', // 增加规格型号
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

export { pageControl, Fn, clczObj }

export default CLCZ
