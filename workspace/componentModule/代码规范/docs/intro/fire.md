---
title: 跨窗口事件
---

### 需求
新增，编辑，详情页等，由之前的当前页路由跳转变为新开标签页。新增数据页，提交数据后需刷新原页面列表数据。

### 对新开标签页处理
项目使用VueRouter作为路由管理库，路由跳转不外乎$router.push()，$router.replace()，$router.go()，$router.back()。为了不对以前的代码有太大的改动，我采用了一种代理模式，简单来说就是对VueRouter的push，replace，go，back等方法拦截，如果要去的路由需要新开标签页则使用window.open打开目标链接，back和go(-1)表现为关闭当前窗口，否则保持原有行为模式。

使用方法：

```js
import VueRouter from "vue-router";
import hackVueRouter from '@/static/js/hackVueRouter';

hackVueRouter(VueRouter);
```
我们可在原型链上查找useHack来判断是否使用了hack，通过currentRouteIsProxyed字段判断当前路由是否是被代理的

```js
if (this.$router.useHack) {
  // do something
}
if (this.$router.currentRouteIsProxyed) {
  console.log('当前路由是被代理的路由，也就是说会表现为一个新标签页');
}
```

注意：预先需要在 @/static/js/目录下建立一个routesToProxy.js文件，此文件为需要代理的路由表  
每条路由的格式为

* 格式：scope#/routePath

scope就是page.js中生成的html路径名  
例如http://xxxxx/supplier.html#/aaa/bbbb的scope就是supplier，routePath就是/aaa/bbbb  
routePath可用*来指示代理此scope下所有路由  
如:supplier#/\*

```js
export default [
  'supplier#/supplierAdd',
  'supplier#/supplierBrowse/:supplierId',
  'supplier#/supplierProgress',
  'supplier#/supplierProgress/browserToView/:EvaluationId',
  'supplier#/performance/evalution/:EvaluationId',
  'supplier#/annualEvalutionAdd',
  'supplier#/annualEvalutionEdit/:recordId',
  'supplier#/annualEvalutionView',
  'supplier#/annualEvaluationScoreList/:supId/:recordId',
  'supplier#/supplierProgress/evalution/:evalutionType',
  'supplier#/browserPerformanceList/:SupplierId',
  'supplier#/annualEvalutionManage/:recordId',
]
```

:::tip 提示
  也可以在routes列表里对meta属性设置proxy字段来指定代理，新业务模块建议使用此模式  
  如: {
   path: '/supplierAdd',
   meta: {
     proxy: true,
   },
  }
:::

### 如何去刷新列表数据
既然新增页都是新开标签页了，那么数据保存成功后我们就需要刷新原有列表数据。hackVueRouter中新开标签页使用的是window.open，那么就意味着新开的窗口中可以拿到window.opener，获取父级窗口后，我们当然可以刷新列表数据了。根据此想法，我写了fire.js，下面是具体用法

```js
// list.vue
import { register } from '@/static/js/utils@hyk/fire';

export default {
  create() {
    // 注册一个名为scope#/index/@refreshData的事件，处理钩子为this.fetchData
    register('scope#/index/@refreshData', this.fetchData);
  },
  methods: {
    fetchData() {},
  },
}

// add.vue
import { fire } from '@/static/js/utils@hyk/fire';

export default {
  methods: {
    submit() {
      // 触发window.opener中注册的名为scope#/index/@refreshData的事件
      fire('scope#/index/@refreshData', null, window.opener || {});
    },
  },
}
```
:::warning 注意
如果不同路由使用了同一个组件，那么一定要在路由变化时再注册一遍，多次注册也只会注册一次
:::
```js
watch： {
  $route: {
    deep: true,
    handler() {
      register('scope#/index/@refreshData', this.fetchData);
    },
  },
},
```

:::tip 事件标识命名
注册事件需要一个唯一标识字符串，这个字符串开发者自己约定，但是我们不能随便命名。例如如果我们都这样注册：register('refreshList', this.fetchData)，那么在其他地方触发的时候:fire('refreshList', null)，我们无法知道具体要触发哪个代码模块下的动作，特别是新增页面模块代码被其它组件引用的时候。
     
规范的写法，如：excellentProject#/recordList/@refetchCurrentData。从这个标识我们可以看出，我们要去触发excellentProject(优秀项目库)，recordList(记录列表页)，refetchCurrentData(重新请求当前页码数据)，目标对象，将要执行的动作都很清晰，减少代码混乱度。  
   
基本格式:scope#/module/@action
:::

#### register
注册事件

* @param {string} ident - 事件唯一标识
* @param {function} hook - 处理钩子
* @param {object} [hoster=global] - 宿主对象，默认为当前窗口全局对象

#### unregister
反注册事件

* @param {string} ident - 事件唯一标识
* @param {function} hook - 处理钩子
* @param {object} [hoster=global] - 宿主对象，默认为当前窗口全局对象

#### clear
清除所有注册的事件

* @param {object} [hoster=global] - 宿主对象，默认为当前窗口全局对象

#### getHooks
根据唯一标识获取对应事件的处理钩子

* @param {string} ident - 事件唯一标识
* @param {object} [hoster=global] - 宿主对象，默认为当前窗口全局对象

#### getAllHooks
获取所有注册的事件

* @param {object} [hoster=global] - 宿主对象，默认为当前窗口全局对象

#### fire
触发事件

* @param {string} ident - 事件唯一标识
* @param {any} data - 传递给钩子函数的数据
* @param {object} [hoster=global.opener || {}] - 目标事件宿主对象

