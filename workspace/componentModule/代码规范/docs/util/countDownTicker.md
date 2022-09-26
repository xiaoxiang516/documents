---
title: 倒计时
---
倒计时
```js
import CountDownTicker from '@/static/js/utils@hyk/countDownTicker';
```
[[toc]]

### params
* @typedef {object} Params
* @param {date|string} startTime - 起始时间，应从服务器获取
* @param {date|string} endTime - 结束时间，应从服务器获取
* @param {number} [step=1000] - 间隔时间（ms）
* @param {function} [callback] - 每间隔step时间执行的回调函数
* @param {boolean} [immediate=false] - 是否立即执行callback

### setParams
设置计时器参数  
实例化后想重新设置参数，应先abort，设置完后再调用resume
* @type {function}
* @param {Params} args

### start
启动计时器
* @type {funtion}

### abort
暂停计时器
* @type {funtion}

### resume
重新开始计时器，abort后调用此方法继续执行计时器
* @type {funtion}

### result
返回结束时间和开始时间的时间差信息
* @type {funtion}

### untilEnd  
执行后返回一个promise，当倒计时结束会执行then方法
* @type {function}

<coder module="countDownTicker" default-input="
const countDownTicker = new CountDownTicker({
  startTime: new Date(),
  endTime: Date.now() + 3000,
});
countDownTicker.start().untilEnd().then((date) => {
  alert(JSON.stringify(date));
});"></coder>