# JAVASCRIPT



给对象属性添加属性: tableUiSchema[item]['event:change']
```js
const addEventChange = (dateRange, tableUiSchema) => {
  dateRange.forEach(item => {
    tableUiSchema[item]['event:change'] = async (row) => {
      await getDaysByDate(row, rqDateArr, item, guid.value)
      calRlyslPct(row)
    }
  })
}

addEventChange(['RqstartOn', 'RqendOn'], tableObj.tableUiSchema)
```










