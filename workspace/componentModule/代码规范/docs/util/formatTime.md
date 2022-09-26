---
title: 时间格式化
---
时间格式化
```js
import FormatTime, { fixDateString, diffDate, getDateInfo } from '@/static/js/utils@hyk/formatTime';
```
[[toc]]

### FormatTime
* @param {date|string} dateParam - 接收Date对象或一个合法的日期字符串。如果是null会返回空字符
* @param {string} [fmt=YYYY-MM-DD HH:mm:ss] - [日期格式](#日期格式)

<coder module="formatTime" default-input="FormatTime(new Date(), 'YYYY年MM月DD日 HH时mm分ss秒S\' EEE 第qq季度')"></coder>

### diffDate
计算两个时间的绝对时间差
* @param {Date|string} date1 
* @param {Date|string} date2
* @returns {DiffInfoShape}  

---

 * @typedef {object} DiffInfoShape 
 * @property {number} days
 * @property {number} hours 
 * @property {number} minutes
 * @property {number} seconds
 * @property {number} milliseconds 

 <coder module="formatTime" default-input="diffDate('2019-03-21 13:31:43', '2019-08-27 22:12:32')"></coder>

 ### getDateInfo
返回时间对象信息
* @param {Date|string} date 
* @returns {DateInfoShape}  

---

 * @typedef {object} DateInfoShape 
 * @property {number} year
 * @property {number} month 
 * @property {number} date
 * @property {number} hour
 * @property {number} minute 
 * @property {number} second
 * @property {number} millisecond 

 <coder module="formatTime" default-input="getDateInfo(Date.now())"></coder>

 ### 日期格式
   
格式|含义|备注|举例
|---|--|--|--|
YYYY|年||例如：YYYY:2019，YY:19
M|月|不补0|8
MM|月||08
D|日|不补0|7
DD|日||07
h|时|12小时制，不补0|13会格式化为1
hh|时|12小时制|13会格式化为01
H|时|24小时制，不补0
HH|时|24小时制
m|分|不补0
mm|分
s|秒|不补0
ss|秒
S|毫秒
EE|周||周一
EEE|星期||星期二
q|季度|不补0
qq|季度

<style>
  table {
    display: table;
    width: 100%;
  }
</style>