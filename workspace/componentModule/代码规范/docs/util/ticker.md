---
title: 计时器
---
计时器
```js
import Ticker from '@/static/js/utils@hyk/ticker';
```
[[toc]]

### params
* @typedef {object} Params
* @param {date|string} [startTime=new Date()] - 起始时间默认为当前时间
* @param {number} [step=1000] - 间隔时间（ms）
* @param {function} [callback] - 每间隔step时间执行的回调函数
* @param {boolean} [immediate=false] - 是否立即执行callback

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
返回当前时间信息
* @type {funtion}

<coder module="ticker" default-input="let acc = 0;
const ticker = new Ticker({
  callback(date) {
    console.log(date);
    acc += 1;
    if (acc === 3) {
      ticker.destroy();
      alert(JSON.stringify(date));
    }
  },
});
ticker.start();"></coder>