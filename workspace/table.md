```js
/**
 * 表格对象
 */
export const tableObj = reactive({
  schema: null,
  tableSchema: [{
    title: '序号',
    type: 'index',
    key: 'Xh'
  }, 'Zdjbh', 'Zhtlsh', 'ZconName', 'ZconClass', 'Zyfdw', 'Zspzt', 'ZjbrName', 'Zjbrq', 'SubmDat', 'PassDat'],
  tableUiSchema: {
    Xh: {
      width: '60'
    },
    Zdjbh: { width: '180' },
    Zhtlsh: { width: '120' },
    ZconName: { width: '120' },
    ZconClass: { width: '160' },
    Zyfdw: { width: '150' },
    Zspzt: {
      width: '120'
      // slot: true
    },
    ZjbrName: { width: '180' },
    Zjbrq: { width: '180' },
    SubmDat: { width: '180' },
    PassDat: { width: '180' },
    operation: {
      width: '200'
    }
  },
  itemInfoRules: {} as any,
  tableData: [], // 搜索实体
  tableFilterData: [] as any[]
})

const tableRef: any = ref<null | HTMLElement>(null)
const labelMode = ref(true)// 是否可编辑
const isLoading = ref(false)

/**
 * 页面基本信息
 */
export const baseInfo = reactive({
  totalList: {} // 阈值
})
```