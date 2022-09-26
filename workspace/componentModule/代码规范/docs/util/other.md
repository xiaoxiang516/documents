---
title: 其它
---

[[toc]]

### getAllStorageKeys
获取当前浏览器sessionStorage和localStorage中存储的所有key
* @param {object} [storager] - [sessionStorage|localStorage]
* @returns {string<>|object}

```js
import getAllStorageKeys from '@/static/js/utils@hyk/getAllStorageKeys';
```

### importWebJs
加载外部js

```js
import batchImportJs, { importJs } from '@/static/js/utils@hyk/importWebJs';
```
importJs方法接收单个链接，batchImportJs接收链接数组

### formatFileSize
文件大小格式化
* @param {number|string} size - 大小。单位byte
* @param {FormatFileSizeOption} option
---
* @typedef {object} FormatFileSizeOption
* @property {string} [unit='auto'] - [B|KB|MB|GB|TB].auto则表示自动根据大小选择合适的单位
* @property {string|function} [placeholder='0KB'] - 当计算值是!validator()时返回此值
* @property {function} validator - 计算值是否合法 为false时则显示placeholder
* @property {function} format - 格式化
* @property {number} [fixed=2]

```js
import formatFileSize from '@/static/js/utils@hyk/formatFileSize';
```
<coder module="formatFileSize" default-input="formatFileSize(123456, { fixed: 2, validator: () => true })"></coder>

### resize-event
代码来自element-ui。监听元素大小变化   
对addResizeListener方法做了改进，同一个fn只添加一次

```js
import { addResizeListener, removeResizeListener } from '@/static/js/utils@hyk/resize-event';
```
* @param {htmlelement} element
* @param {function} fn
* @example   
 addResizeListener(document.body, () => { console.log('body元素大小变化了') })

 ### equal
 判断两个值是否相等。来自[underscore](https://github.com/mqyqingfeng/Blog/issues/41)
* 目标：
* 1.NaN 和 NaN 是相等
* 2.0 和 -0 不相等
* 3.[1] 和 [1] 是相等
* 4.{value: 1} 和 {value: 1} 相等
* 5.1 和 new Number(1) 是相等
* 6.'Curly' 和 new String('Curly') 是相等
* 7.true 和 new Boolean(true) 是相等
* 8.递归判断对象和数组值是否相等
* 这里的相等并不是设计语言上的相等，只是代码设计者的偏好，所以注意按需求使用此方法
* 对于1，2两条我们使用Object.is(a, b)就可以满足要求了

```js
import equal from '@/static/js/utils@hyk/equal';
```

* 可能的使用场景：编辑页面判断数据是否变化从而给出对应提示。例如编辑数据未保存则退出编辑给出提示

<coder module="equal" default-input="var arr1 = [{ a: 'a' }, { b: 'b' }];
var arr2 = [{ a: 'a' }, { b: 'b' }];
equal(arr1, arr2)"></coder>