import CZHZ from './czfaCzhzIndex.vue'

import { reactive } from 'vue'

const pageControl = reactive<{ pageLoading: boolean }>({
  pageLoading: false
})

// 方案总览
const czhzObj = reactive<any>({
  tableSchema: [
    {
      prop: 'ggfw',
      children: [
        'Ldnum', // 楼栋编码
        'Ldyt', // 业态
        'StartJm', // 赶工开始界面
        'EndJm', // 赶工结束界面
        'LdGgmj' // 赶工面积
      ]
    },
    {
      prop: 'yjhgq',
      children: [
        'PlstartOn', // 原计划开始日期
        'PlendOn', // 原计划结束日期
        'Pldays' // 原计划工期
      ]
    },
    {
      prop: 'jhgggq',
      children: [
        'RqstartOn', // 要求开始日期
        'RqendOn', // 要求结束日期
        'Rqdays' // 要求绝对日期
      ]
    },
    {
      prop: 'sjgqys',
      children: [
        'Gqys', // 压缩工期
        'Gqysl' // 工期压缩率
      ]
    }
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

export { pageControl, Fn, czhzObj }

export default CZHZ
