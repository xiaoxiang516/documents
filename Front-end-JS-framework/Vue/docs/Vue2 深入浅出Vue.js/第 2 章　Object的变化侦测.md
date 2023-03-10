从状态生成DOM，再输出到用户界面显示的一整套流程叫作渲染

本篇中，我们将针对变化侦测的实现原理做一个详细介绍，并且会带着你一步一步从0到1实现一个变化侦测的逻辑。学完本篇，你将可以自己实现一个变化侦测的功能。

Object和Array的变化侦测采用不同的处理方式

因此，从Vue.js 2.0开始，它引入了虚拟DOM，将粒度调整为中等粒度，即一个状态所绑定的依赖不再是具体的DOM节点，而是一个组件。这样状态变化后，会通知到组件，组件内部再使用虚拟DOM进行比对。这可以大大降低依赖数量，从而降低依赖追踪所消耗的内存。Vue.js之所以能随意调整粒度，本质上还要归功于变化侦测。因为“推”类型的变化侦测可以随意调整粒度。

- [如何侦测一个对象的变化？](#如何侦测一个对象的变化？)
- [什么是依赖](#什么是依赖)
- [如何收集依赖？](#如何收集依赖)

### 如何侦测一个对象的变化？
有两种方法可以侦测到变化：使用Object.defineProperty和ES6的Proxy。

### 什么是依赖
在上面的代码中，我们收集的依赖是window.target，那么它到底是什么？我们究竟要收集谁呢？收集谁，换句话说，就是当属性发生变化后，通知谁。我们要通知用到数据的地方，而使用这个数据的地方有很多，而且类型还不一样，既有可能是模板，也有可能是用户写的一个watch，这时需要抽象出一个能集中处理这些情况的类。然后，我们在依赖收集阶段只收集这个封装好的类的实例进来，通知也只通知它一个。接着，它再负责通知其他地方。所以，我们要抽象的这个东西需要先起一个好听的名字。嗯，就叫它Watcher吧。现在就可以回答上面的问题了，收集谁？Watcher


### 如何收集依赖？
先收集依赖，即把用到数据name的地方收集起来，然后等属性发生变化时，把之前收集好的依赖循环触发一遍就好了。


