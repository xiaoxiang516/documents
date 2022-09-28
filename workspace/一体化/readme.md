vue移动端记录列表滚动如何快速找到是哪个元素产生的滚动
使用下面的代码粘贴到调试工具中运行一下，然后滚动页面，就可以看到是哪个元素产生的滚动了
```js
function findscroller(element) {
  element.onscroll = function () {
    console.log(element)
  }
  Array.from(element.children).forEach(findscroller)
}
findscroller(document.body)
```