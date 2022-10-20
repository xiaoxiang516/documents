
[](https://tc39.es/ecma262/multipage/#sec-intro)

[es6](https://262.ecma-international.org/6.0/)
[JavaScript 二十年](https://cn.history.js.org/index.html)
[es6-ruanyifeng](https://es6.ruanyifeng.com/)
[聊一聊进行中的TC39提案（stage1/2/3）](https://zhuanlan.zhihu.com/p/381256585)


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