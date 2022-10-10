首先讨论什么是响应式数据和副作用函数，然后尝试实现一个相对完善的响应系统。
在这个过程中，我们会遇到各种各样的问题，例如如何避免无限递归？为什么需要嵌套的副作用函数？
两个副作用函数之间会产生哪些影响？以及其他很多需要考虑的细节。接着，我们会详细讨论与响应式数据相关的内容


```javascript
 // 全局变量
 let val = 1

 function effect() {
   val = 2 // 修改全局变量，产生副作用
 }
```

```javascript
function effect() {
  document.body.innerText = 'hello vue3'
}
```

```javascript

```

```javascript

```

```javascript

```

```javascript

```