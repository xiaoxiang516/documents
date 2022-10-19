
[Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)


## 对象的产生/ 创建方式
Object 是各种键值集合: 属性与值的集合
通过函数中的空对象创建对象

### 对象初始化
可以通过new Object()，Object.create()方法，或者使用字面量标记（初始化标记）初始化对象。一个对象初始化器，由花括号/大括号 ({}) 包含的一个由零个或多个对象属性名和其关联值组成的一个逗号分隔的列表构成。

`根据定义，null 没有原型，并作为这个原型链中的最后一个环节。`

```js
Object.create(null) // {} No properties

```


### [使用 class 关键字创建的对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#%E4%BD%BF%E7%94%A8_class_%E5%85%B3%E9%94%AE%E5%AD%97%E5%88%9B%E5%BB%BA%E7%9A%84%E5%AF%B9%E8%B1%A1)


### 什么是继承
继承的意思就是给属性赋值
