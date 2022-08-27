搭建demo环境池

完善做过的需求demo:关于时间的

```vue
<!-- 表单 -->
<template #SjFsdat>
  <el-date-picker
    v-model="formSource.formData.SjFsdat"
    type="date"
    style="width: 100%"
    placeholder="选择日期"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    :disabled-date="disabledDate">
  </el-date-picker>
</template>

<!-- 表格 -->
```

## 或者只能选今天之后的时间
```ts
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
```

## 只能选某个日期之后的时间
```ts
const setDisabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}

const setBackDatePDisabledDate = (time) => {
  return time.getTime() < new Date(formObj.formData.PayDateP).getTime()
}
```

```ts
const dateValidate = (rule: any, value: any, callback: any) => {
  if (
    formObj.formData.PayDateP &&
    formObj.formData.BackDateP &&
    formObj.formData.BackDateP < formObj.formData.PayDateP
  ) {
    return callback(new Error('预计返还日期需大于等于付款日期'))
  }
  return callback()
}


PayDateP: [
  { required: true, message: '必填', trigger: 'blur' },
  { validator: dateValidate, trigger: 'change' }
],

 return time.getTime() <= new Date('2022-08-16').getTime() - 8.64e7
```
## JS实现日期比较大小(JavaScript)
```js
function compareDate(dateTime1,dateTime2) {
    return new Date(dateTime1) < new Date(dateTime2)
}
var date = compareDate("2019-05-01","2019-05-05")//须将日期转换成“YYYY-MM-DD”格)

```



