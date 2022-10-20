[import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
[ruanyifeng](https://www.bookstack.cn/read/es6-3rd/spilt.4.docs-module.md)
写一个可以单独练习的demo咋就这么难呢


```
$ npm i http-server -g

$ http-server -v
v14.1.1

zhuqizhong@BDR23M70BKCPR MINGW64 /d/documents/JavaScript/Module (master)
$ http-server index.html
Starting up http-server, serving index.html

zhuqizhong@BDR23M70BKCPR MINGW64 /d/documents/JavaScript/Module (master)
$ ls
JS/  circle.js  index.html  index1.html  main.js  package.json  readme.md

$ http-server
Starting up http-server, serving ./

```

```
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


