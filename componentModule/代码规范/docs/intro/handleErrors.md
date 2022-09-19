---
title: 关于错误处理
---
[[toc]]

注册Vue.config.errorHandler来捕获vue组件中的错误。并统一使用errorDisplay.js来处理显示错误信息

### 用法
```js
import Vue from 'vue';
import errorHandler from '@/static/js/errorHandler';

Vue.use(errorHandler);
```

当代码发生错误，或请求发生错误会将错误信息传递给erroHandler，并使用element-ui的Message组件显示错误信息  
默认显示风格为error，传递Message的type来显示不同的风格  

例如

```js
methods: {
  test() {
    const err = new Error('发生了错误');
    err.type = 'warning';
    err.type = 'info';
    err.type = 'success';
    err.type = 'error'; // 默认
    throw err;
  },
}
```

### 捕获异步错误
目前产品项目所使用vue版本为2.5.9，config.errorHandler不支持捕获promise链的错误。  
::: warning 注意
[vue的2.6.0版本起config.errorHandler才支持捕获promise链错误](https://cn.vuejs.org/v2/api/#errorHandler)
:::
但我们可以使用一个函数方法对aynsc/await或Promise链进行包裹，将捕获的错误传递给config.errorHandler  
```js
import asyncFunctionErrorCatcher from '@/static/js/utils@hyk/asyncFunctionErrorCatcher';

export default {
  created() {
    this.fetchData();
    // 我们也可以捕获promise实例错误
    asyncFunctionErrorCatcher(new Promise((resolve, reject) => {
      throw new Error('异步错误);
    }))();
  },
  methods: {
    fetchData: asyncFunctionErrorCatcher(async function () {
      // 当下面的请求发生了错误，会将错误传递给config.errorHandler
      await this.$promiseGet('/api/list');
    }),
  },
}
```
asyncFunctionErrorCatcher方法接收两个参数，第一个参数为async函数或Promise实例，第二个为是否抛出错误（默认false），当指定抛出错误时，则需要开发者自行处理错误  

::: warning
例如获取数据等异步操作应该是纯粹的。
但有些时候我们需要在数据请求成功后再执行其它操作，那么asyncFunctionErrorCatcher方法的第二个需要指定为true来将错误再抛出去，
否则fetchData().then方法无论fetchData发生了错误与否都会执行。
这是因为发生的错误都被catch掉了，意味着都处理掉了，代码当然会继续往下执行。
这跟使用try-catch将代码块包裹起来同样的道理，catch里接收了错误，如果不将错误用throw抛出去，那么意味着代码的错误已处理，后续代码当然会执行
:::

```js
import asyncFunctionErrorCatcher from '@/static/js/utils@hyk/asyncFunctionErrorCatcher';

export default {
  created() {
    this.fetchData().then(this.doSthAfterFetchData);
  },
  methods: {
    /*
    * 这里指定需要抛出错误，那么错误就不会传递给config.errorHandler
    */
    fetchData: asyncFunctionErrorCatcher(async function () {
      const data = await this.$promiseGet('/api/list');
      return data;
    }, true),
    doSthAfterFetchData(data) {
      // do sth here
    },
  },
}
```

我们可以使用errorDisplay.js统一对错误进行展示

```js
import asyncFunctionErrorCatcher from '@/static/js/utils@hyk/asyncFunctionErrorCatcher';
import errorDisplay from '@/static/js/errorDisplay';

export default {
  created() {
    this.fetchData().then(this.doSthAfterFetchData);
  },
  methods: {
    /*
    * 这里指定需要抛出错误，那么错误就不会传递给config.errorHandler
    */
    fetchData: asyncFunctionErrorCatcher(async function () {
      try {
      const data = await this.$promiseGet('/api/list');
      return data;
      } catch (err) {
        errorDisplay(err);
        // 这里一定要把错误再抛出去
        throw err;
      }
    }, true),
    doSthAfterFetchData(data) {
      // do sth here
    },
  },
}
```

或者

```js
import asyncFunctionErrorCatcher from '@/static/js/utils@hyk/asyncFunctionErrorCatcher';
import errorDisplay from '@/static/js/errorDisplay';

export default {
  created() {
    // 推荐写法，在调用处catch
    this.fetchData().then(this.doSthAfterFetchData).catch(errorDisplay);
  },
  methods: {
    /*
    * 这里指定需要抛出错误，那么错误就不会传递给config.errorHandler
    */
    fetchData: asyncFunctionErrorCatcher(async function () {
      const data = await this.$promiseGet('/api/list');
      return data;
    }, true),
    doSthAfterFetchData(data) {
      // do sth here
    },
  },
}
```

### 抑制错误提示
并不是每个错误都需要弹出提示，我们可以抛出一个属性为<b>_suppressErrorDisplay_</b>的对象来表明不显示错误

```js
{
  submit: asyncFunctionErrorCatcher(async function () {
    // 这里表单验证失败会抛出错误，但是这种错误是不需要以message弹出提示的
    // 这里我们在catch里抛出一个包含属性_suppressErrorDisplay_为true的对象
    await this.$refs.form.validate().catch(err => { throw ({ _suppressErrorDisplay_: true }) });
    // 发送数据
    this.$promisePost('/api/add', this.model);
  }),
}
```