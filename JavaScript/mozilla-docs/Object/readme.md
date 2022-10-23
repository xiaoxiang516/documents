
[Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

[4.3 Terms and definitions](http://262.ecma-international.org/6.0/#sec-terms-and-definitions-object)


```
4.3.1type
set of data values as defined in clause 6 of this specification

4.3.2primitive value
member of one of the types Undefined, Null, Boolean, Number, Symbol, or String as defined in clause 6

NOTEA primitive value is a datum that is represented directly at the lowest level of the language implementation.

4.3.3object
member of the type Object

NOTEAn object is a collection of properties and has a single prototype object. The prototype may be the null value.

4.3.4constructor
function object that creates and initializes objects

NOTEThe value of a constructor’s prototype property is a prototype object that is used to implement inheritance and shared properties.

4.3.5prototype
object that provides shared properties for other objects

NOTEWhen a constructor creates an object, that object implicitly references the constructor’s prototype property for the purpose of resolving property references. The constructor’s prototype property can be referenced by the program expression constructor.prototype, and properties added to an object’s prototype are shared, through inheritance, by all objects sharing the prototype. Alternatively, a new object may be created with an explicitly specified prototype by using the Object.create built-in function.

4.3.6ordinary object
object that has the default behaviour for the essential internal methods that must be supported by all objects

4.3.7exotic object
object that does not have the default behaviour for one or more of the essential internal methods that must be supported by all objects

NOTEAny object that is not an ordinary object is an exotic object.

4.3.8standard object
object whose semantics are defined by this specification

4.3.9built-in object
...
```

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


```
prototype 英 / ˈprəʊtətaɪp / 美 / ˈproʊtətaɪp /
n.（新型汽车、机器等的）原型，雏形；最初形态；
v.制作（产品的）原型
```

原型链为覆盖或扩展对象的行为提供了一个非常强大的机制。