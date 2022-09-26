import QTCZ from './czfaQtczIndex.vue'

import { reactive } from 'vue'

const pageControl = reactive<{ pageLoading: boolean }>({
  pageLoading: false
})

// 其他处置措施
const qtczObj = reactive<any>({
  tableSchema: [
    'Seqno', // 序号
    'Itemname', // 分项项目名称
    'Style', // 分项项目特征
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

export { pageControl, Fn, qtczObj }

export default QTCZ
