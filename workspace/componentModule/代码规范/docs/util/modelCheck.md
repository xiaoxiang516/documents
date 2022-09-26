---
title: 数据校验
---
数据校验
```js
import ModelCheck, { extractElementFormRules } from '@/static/js/utils@hyk/modelCheck';
```
ModelCheck会干两件事
- 数据类型和数据有效性校验
- 修剪传入的数据

[[toc]]

### 接收参数
* @param {object|array} payload - 要校验的数据
* @param {[Model](#model)} model - 数据模型描述
* @param {[MoreOption](#moreoption)} option

### Model
字段|类型|默认值|备注|举例
|--|--|--|--|--|
type|function,string,null,\*|\*|数据类型 对构造函数判断来决定类型是否一致。\*则表示不限定类型，多个类型可使用数组，如[Number, String, Boolean, '*', null]|
required|boolean,function|false|默认false 是否必需，为true缺少参数时抛出异常。可使用一个工厂函数返回布尔值
default|function,any||可以用function 返回一个值。当键值为undefined时提供默认值
ifNoPropCreate|boolean|false|为true，则如果payload中不存在此key则创建，并使用default作为默认值
replace|function,any||(value: any, key: string) => any.替换原值为此值，如果为function则为函数返回的值，function接受一个被替换前的value参数（此值可能是原本的值，也有可能是取自default的值）
model|object,function||(value: any, key: [string,number])。对于子级的描述，对于数组来说就是数组每项的描述。只针对对象和数组。对于数组可使用function返回一个对象来动态配置每一项的model
remove|boolean||只针对数组，如果数组某项指定了remove=true，那么此项会被移除
validateBeforeReplace|function||(value: any, key: string) => any.在执行replace操作前进行数据有效性验证。如果返回Error的实例或者为false则表示数据不通过。与[Validators.js](validators.html)搭配使用可以使代码更加简洁和语义化
validator|function||(value: any, key: string) => any.数据有效性验证。如果返回Error的实例或者为false则表示数据不通过。与[Validators.js](validators.html)搭配使用可以使代码更加简洁和语义化
errorMsg|string,error||自定义validator错误信息。注意errorMsg只是针对validator校验失败的情况，这是对用户输入校验，如果是数据类型有误，那是开发者的问题，开发者应该自己解决好
elementFormRule|object<>||element-ui的表单组件的rules校验规则。主要是觉得代码不应该书写太散了，数据结构描述和element-ui表单组件校验规则应该写在一起，可使用[extractElementFormRules](#extractelementformrules)提取出来

### MoreOption
* @param {boolean} [cloneData=true] - 默认:true;是否克隆payload数据
* @param {boolean} [onlyModelDesciprtors=true] - 默认:true;指定为true，则只返回model中定义的key值
* @param {boolean} [warnAsError=true] - 默认:true;是否将警告以错误抛出
* @param {function} [errorReceiver=null] - (Error) => any  注入外部方法来接收错误信息。建议最好还是用try-catch来捕获错误

### extractElementFormRules
将model中的elementFormRule字段提取出来  
主要是觉得代码不应该书写太散了，数据结构描述和element-ui表单组件校验规则应该写在一起
* @type {function}  
示例
```vue
<template>
  <el-form :model="model" :rules="computedElFormRules" ref="form">
  </el-form>
</template>

<script>
  import { extractElementFormRules } from '@/static/js/utils@hyk/modelCheck';

  export default {
    data() {
      return {
        model: {
          Id: '12343',
        },
        descriptors: {
          Id: {
            type: String,
            required: true,
            elementFormRule: [
              {
                required: true,
                message: '请选择架构Id',
                trigger: 'change',
              },
            ],
          },
        },
      };
    },
    computed: {
      computedElFormRules() {
        return extractElementFormRules(this.descriptors);
      },
    },
  };
</script>
```
<coder module="modelCheck" default-input="
const descriptors = {
  Id: {
    type: String,
    required: true,
    elementFormRule: [
      {
        required: true,
        message: '请选择架构Id',
        trigger: 'change',
      },
    ],
  },
};
extractElementFormRules(descriptors)"></coder>

### 数据校验
type：数据类型校验
::: warning
数据类型是通过判断构造函数constructor是否严格相等，所以对于在IE中HTMLElement不是构造函数，如果type指定了HTMLElement则校验会失败。后续打算做兼容性处理，使用instanceof运算符判断，将对象和数组区分开 
:::   
示例
```js
const data = {
  id: '123',
};
const descriptors = {
  id: {
    type: String,
  },
};
// 校验通过
ModelCheck(data, descriptors);
const descriptors1 = {
  id: {
    type: Number,
  },
};
// 抛出类型错误
ModelCheck(data, descriptors1);
const descriptors2 = {
  // 只要满足其中任意一种数据类型
  id: {
    type: [Number, String],
  },
};
// 校验通过
ModelCheck(data, descriptors2);
```
<coder module="modelCheck" default-input="
const data = {
  id: '123',
};
const descriptors = {
  id: [Number],
};
ModelCheck(data, descriptors)"></coder>

---

required：字段是否必需，传入的数据没有字段属性时会抛出错误  
::: warning
注意：required是校验传入的数据是否存在属性，并不会对属性值是否是真值(truth-value)校验
:::
示例
```js
const data = {
  id: '123',
};
const descriptors = {
  id: {
    type: String,
  },
  name: {
    required: true,
  },
};
// 校验失败
// 描述对象指定了name属性是必须的，但是传入的data数据中并没有这个字段
ModelCheck(data, descriptors);
```
<coder module="modelCheck" default-input="
const data = {
  id: '123',
};
const descriptors = {
  id: {
    type: String,
  },
  name: {
    required: true,
  },
};
ModelCheck(data, descriptors)"></coder>

---

validator：(value: any, key: string) => any.数据有效性验证。如果返回Error的实例或者为false则表示数据不通过  
如果指定了errorMsg字段则错误信息使用errorMsg  
::: warning
注意：<b>errorMsg只是针对validator校验结果的提示，这是因为validator通常是针对用户输入数据的校验，而type，required等字段校验错误应该是开发者开发过程中就处理好</b>  
validateBeforeReplace功能同validator，只是在执行replace操作前进行数据验证
:::
示例
```js
const data = {
  id: '123',
};
const descriptors = {
  id: {
    type: String,
    validateBeforeReplace() {
      return true;
    },
    validator() {
      return false;
    },
  },
  name: {
    required: true,
  },
};
// 校验失败
ModelCheck(data, descriptors);
```
<coder module="modelCheck" default-input="
const data = {
  id: '123',
};
const descriptors = {
  id: {
    type: String,
    validator() {
      return false;
    },
  },
  name: {
    required: true,
  },
};
ModelCheck(data, descriptors)"></coder>

### 数据修剪
default：当字段的键值为undefined时则会使用default值，一般配合ifNoPropCreate使用  
   
示例
```js
const data = {
  id: '123',
  name: undefined
};
const descriptors = {
  id: {
    type: String,
  },
  name: {
    default: '张三',
    required: true,
  },
};
// 最后得到的name值为张三
ModelCheck(data, descriptors);
```
<coder module="modelCheck" default-input="
const data = {
  id: '123',
  name: undefined
};
const descriptors = {
  id: {
    type: String,
  },
  name: {
    required: true,
    default: '张三',
  },
};
ModelCheck(data, descriptors)"></coder>

---

replace：(value: any, key: string) => any.替换原值为此值，如果为function则为函数返回的值，function接受一个被替换前的value参数（此值可能是原本的值，也有可能是取自default的值）  
示例
```js
const data = {
  id: '123',
  name: undefined
};
const descriptors = {
  id: {
    type: String,
  },
  name: {
    default: '张三',
    required: true,
    replace: '李四',
  },
};
// 最后得到的name值为李四
ModelCheck(data, descriptors);
```
<coder module="modelCheck" default-input="
const data = {
  id: '123',
  name: undefined
};
const descriptors = {
  id: {
    type: String,
  },
  name: {
    required: true,
    default: '张三',
    replace: '李四',
  },
};
ModelCheck(data, descriptors)"></coder>

---

ifNoPropCreate：默认false；当为true，则如果payload中不存在此key则创建，并使用default为默认值 
示例
```js
const data = {
  id: '123',
};
const descriptors = {
  id: {
    type: String,
  },
  name: {
    ifNoPropCreate: true,
    default: '张三',
  },
};
// 最后得到的name值为张三
ModelCheck(data, descriptors);
```
<coder module="modelCheck" default-input="
const data = {
  id: '123',
};
const descriptors = {
  id: {
    type: String,
  },
  name: {
    ifNoPropCreate: true,
    default: '张三',
  },
};
ModelCheck(data, descriptors)"></coder>

---

remove：只针对数组，如果数组某项指定了remove=true，那么此项会被移除
```js
const data = [1, 2, 3];
const descriptors = {
  model(value, idx) {
    return {
      remove: idx === 1,
    };
  },
};
// 第1项将会被移除
ModelCheck(data, descriptors);
```
<coder module="modelCheck" default-input="
const data = [1, 2, 3];
const descriptors = {
  model(value, idx) {
    return {
      remove: idx === 1,
    };
  },
};
ModelCheck(data, descriptors)"></coder>

---
如果指定了[MoreOption](#moreoption)中的onlyModelDesciprtors=true(默认为true)，那么只返回model中定义的key值

```js
const data = {
  s1: '111',
  s2: '222',
};
const descriptors = {
  s1: {},
};
// data中的s2会被舍弃掉
ModelCheck(data, descriptors
```

<coder module="modelCheck" default-input="
const data = {
  s1: '111',
  s2: '222',
};
const descriptors = {
  s1: {},
};
ModelCheck(data, descriptors)"></coder>

### 对子级数据描述
我们可以指定model字段来对子级进行描述  
对于对象则需要指出需要描述的key，对于数组则不需要。  
model字段支持使用一个工厂函数返回一个对象，工厂函数接收两个参数，第一个为当前项的值，第二个为数组索引值或对象的key

---
对象的子级描述
<coder module="modelCheck" default-input="
const data = {
  o: {
    o1: {
      o11: {
        text: 'hello world!',
      },
    },
    o2: {
      o21: {
        text: 'wow!!!',
      },
    },
  },
};
const descriptors = {
  o: {
    type: Object,
    model: {
      o1: {
        type: Object,
        model: {
          o11: {
            type: Object,
            model: {
              text: {
                type: String,
                validator(v) {
                  return v === 'hello world!';
                },
              },
            },
          },
        },
      },
      o2: {
        type: Object,
        model: {
          o21: {
            type: Object,
            model: {
              text: String,
            },
          },
        },
      },
    },
  },
};
ModelCheck(data, descriptors)"></coder>

::: tip
我们还可以使用namespace方式来缩减代码。不过这种方式并不推荐。
:::
<coder module="modelCheck" default-input="
const data = {
  o: {
    o1: {
      o11: {
        text: 'hello world!',
      },
    },
    o2: {
      o21: {
        text: 'wow!!!',
      },
    },
  },
};
const descriptors = {
  o: {
    type: Object,
    model: {
      o1: {
        type: Object,
        model: {
          o11: {
            type: Object,
            model: {
              text: {
                type: String,
                validator(v) {
                  return v === 'hello world!';
                },
              },
            },
          },
        },
      },
      'o2.o21.text': {
        type: String,
      },
    },
  },
};
ModelCheck(data, descriptors)"></coder>

----
数组的子级描述
<coder module="modelCheck" default-input="
const data = {
  o: {
    o1: [1, {
      text: 'hello world!',
    }],
  },
};
const descriptors = {
  o: {
    type: Object,
    model: {
      o1: {
        type: Array,
        model(v, idx) {
          switch (idx) {
            case 0:
              return {
                type: Number,
              };
            case 1: 
              return {
                type: Object,
                model: {
                  text: {
                    type: String,
                    validator(v) {
                      return v === 'hello world!';
                    },
                  },
                },
              };
            default:
              return {};
          }
        },
      },
    },
  },
};
ModelCheck(data, descriptors)"></coder>

::: tip
数组同样支持namespace方式来缩减代码。不过这种方式并不推荐。
:::

<coder module="modelCheck" default-input="
const data = {
  o: {
    o1: [1, {
      text: 'hello world!',
    }],
  },
};
const descriptors = {
  o: {
    type: Object,
    model: {
      'o1.1.text': {
        type: String,
        validator(v) {
          return v === 'hello world!';
        },
      },
    },
  },
};
ModelCheck(data, descriptors)"></coder>
