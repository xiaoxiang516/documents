[]()
[ruanyifeng module](https://www.bookstack.cn/read/es6-3rd/spilt.4.docs-module.md)
[import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
写一个可以单独练习的demo咋就这么难呢
```js
<script type="module" >
  // import {area, circumference } from './circle.js'
  // console.log('圆面积：' + area(4));
  // console.log('圆周长：' + circumference(14));      
</script>
// main.js

const { area, circumference } = require('./circle')
console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));
```














