创建vue项目

node的配置


Npm install的过程
样式篇
写此篇的方案：
1）组件的样式如何修改书写
深层次选择器
$符号找元素

2）
引用组件样式的增加：class值的使用； 是否可以使用父级class值，如不可增加class值
增加一个class值：样式的修改最优先的方式是为元素增加一个class值，
而非找到该元素的class值去修改它的样式，这样不用都加important，反正加一个class值权重都变大了
.index-body.index-body-extend 不是组件内写的

mounted() {
$('.index-body.index-body-extend').addClass('cargoboard')
},
destroyed() {
$('.index-body.index-body-extend').removeClass('cargoboard')
}


以前李老师教我们写的样式，还是有所欠缺，还是不能站在一个系统的层面去写，也许是时间问题，他无法教授我们吧


写过的需求碰到过的样式问题


样式片

封装组件的class值如何作用到

深度选择器

全局样式再加新class值保证唯一

 


本文实例讲述了JavaScript给按钮绑定点击事件（onclick）的方法。分享给大家供大家参考。具体分析如下：
我们可以通过设定按钮的onclick属性来给按钮绑定onclick事件

```html
<!DOCTYPE html>
<html>
<head>
  <script>
    function displayDate()
    {
      document.getElementById("demo").innerHTML = Date();
    }
  </script>
</head>
<body>
  <h1>My First JavaScript</h1>
  <p id="demo">This is a paragraph.</p>
  <button type="button" onclick="displayDate()">
    Display Date
  </button>
  </body>
</html>
javascript事件与
————————————————
版权声明：本文为CSDN博主「仅次于鹰」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_39549656/article/details/79260216

