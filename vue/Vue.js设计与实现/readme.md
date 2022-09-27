版权信息书名：Vue.js设计与实现
作者：霍春阳
出版社：人民邮电出版社出版时间：2022-01-01

[](https://item.jd.com/13611922.html)

Vue.js 3 仍然保持了运行时 + 编译时的架构


Vue.js 3 是一个声明式的 UI 框架
## 3.1　声明式地描述 UI

编写前端页面都涉及哪些内容:
● DOM 元素：例如是 div 标签还是 a 标签。
● 属性：如 a 标签的 href 属性，再如 id、class 等通用属性。
● 事件：如 click、keydown 等。
● 元素的层级结构：DOM 树的层级结构，既有子节点，又有父节点。

```javaScript
01 const title = {
02   // 标签名称
03   tag: 'h1',
04   // 标签属性
05   props: {
06     onClick: handler
07   },
08   // 子节点
09   children: [
10     { tag: 'span' }
11   ]
12 }
```



## 使用模板和 JavaScript 对象描述 UI 


对应到 Vue.js 模板，其实就是：
01 <h1 @click="handler"><span></span></h1>

## 而使用 JavaScript 对象来描述 UI 的方式，其实就是所谓的虚拟 DOM。
JavaScript 对象来描述
```js
01 // h 标签的级别
02 let level = 3
03 const title = {
04   tag: `h${level}`, // h3 标签
05 }
```

```XML
01 <h1 v-if="level === 1"></h1>
02 <h2 v-else-if="level === 2"></h2>
03 <h3 v-else-if="level === 3"></h3>
04 <h4 v-else-if="level === 4"></h4>
05 <h5 v-else-if="level === 5"></h5>
06 <h6 v-else-if="level === 6"></h6>
```

 h 函数调用
```js
01 import { h } from 'vue'
02
03 export default {
04   render() {
05     return h('h1', { onClick: handler }) // 虚拟 DOM
06   }
07 }
```