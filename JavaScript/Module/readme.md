[import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
[ruanyifeng module](https://www.bookstack.cn/read/es6-3rd/spilt.4.docs-module.md)
写一个可以单独练习的demo咋就这么难呢

### FAQ
跨域问题：
file:///D:/documents/JavaScript/Module/index.html

```bash
index.html:1      
  Access to script at 'file:///D:/documents/JavaScript/Module/main.js' from **origin 'null'** has been 
  blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, 
  isolated-app, chrome-extension, chrome-untrusted, https, edge.

<!-- 解决跨域问题 -->
$ npm i http-server -g // 淘宝镜像
$ http-server -v  // v14.1.1
```

```bash
$ http-server index.html
Starting up http-server, serving index.html

$ ls
JS/  circle.js  index.html  index1.html  main.js  package.json  readme.md

$ http-server
Starting up http-server, serving ./
```

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


