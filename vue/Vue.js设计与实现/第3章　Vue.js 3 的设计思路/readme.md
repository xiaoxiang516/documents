# 编译器和渲染器一样，只是一段程序而已
无论是手写虚拟 DOM（渲染函数）还是使用模板，都属于声明式地描述 UI，并且Vue.js 同时支持这两种描述 UI 的方式。
上文中我们讲解了虚拟 DOM 是如何渲染成真实 DOM 的，那么模板是如何工作的呢？

以我们熟悉的 .vue 文件为例，一个 .vue 文件就是一个组件，如下所示：

```js
 <template>
   <div @click="handler">
     click me
   </div>
 </template>

 <script>
 export default {
   data() {/* ... */},
   methods: {
     handler: () => {/* ... */}
   }
 }
 </script>
```

其中 <template> 标签里的内容就是模板内容，编译器会把模板内容编译成渲染函数并添加到 <script> 标签块的组件对象上，所以最终在浏览器里运行的代码就是：
```js
 export default {
   data() {/* ... */},
   methods: {
     handler: () => {/* ... */}
   },
   render() {
     return h('div', { onClick: handler }, 'click me')
   }
 }
```