---
title: vue文件书写
---

vue文件书写应该是如下代码结构
::: tip
* 代码注释要尽量多，描述要准确，某些代码可能会造成误解的一定要给出详细注释
* 函数方法注释依照[JSDoc规范](http://www.dba.cn/book/jsdoc/)
:::

```vue
<template>
  <!-- 组件的class命名不应该随便，应该与组件功能相关 -->
  <article class="sapi-demo">
    <!-- class名最好使用BEM方式 -->
    <section class="sapi-demo__section">
      <!-- 属性名很多的话，分行书写 -->
      <input
        class="demo-input"
        v-model="input"
        prop-1="prop1"
        prop-2="prop2"
        prop-3="prop3"
        readonly>
    </section>
  </article>
</template>

<script>
// 文件引入，应遵循如下顺序：样式文件，npm库，绝对地址，相对地址
// 文件引入禁止写全文件后缀名
// 这是因为webpack的resolve.mainFiles配置默认是index
// 不指定文件名后缀那么我们后续可以很方便的建立同名文件夹来扩展代码
// 使用index.js或index.vue等等resolve.extensions配置了的后缀文件来作为模块导出口
// 引入变量最好使用pascal命名
import './style.css';
import Vue from 'vue';
import SelectUser from '@/pages/pdm/components/selectUser';
import Config from '../config';

export default {
  // 每个组件最好取一个与功能模块相关的名字
  // 例如 ExcellentProjectList 从字面上就可以理解为优秀项目库的列表页
  // 使用pascal方式命名
  name: 'SapiDemo',
  // 一般情况下componentName跟name一样就可以了
  componentName: 'SapiDemo',
  // 一般很少用
  provide: [],
  inject: {},
  // 组件混入应该少用
  mixins: [],
  // 使用pascal方式命名
  components: {
    SapiDialog() {
      return import('@/components/sapi-dialog');
    },
  },
  // props重点强调
  // 一定要将类型和所需参数写出来
  // props: ['option']这种写法完全看不出option是什么类型，有什么属性，完全要去代码里查找
  // 对于一个组件，我们所关心的只是所实现功能和输入输出，输入就props输出就是各种事件回调
  // 所以一个组件对于输入应该要有详细准确的描述
  props: {
    option: {
      type: Object,
      default() {
        // 如果不需要默认值，那么一定要以注释的形式将内部属性标注出来
        return {
          // 所需id
          // id: null,
        };
      },
    },
  },
  data() {
    return {
      // 注释最好单独占一行，不要跟在后面注释
      input: null, // 这是不好的注释示范
      /*
       * 这是多行注释
       */
      remark: null,
    };
  },
  computed: {
    // 强烈建议多使用计算属性
    // 虽然字面上是计算用，但是我们可以看出它还有另一个极大的优点，就是多个变量入口合成一个变量导出
    // computed属性应该要以computed作为前缀
    // 这是因为计算属性默认只有getter，调用形式完全和data,props一样
    // 计算属性默认只读，所以使用带有computed前缀的命名可以让我们直接区分开来
    // 顺带说一句，计算属性和watch是可以监听props,data,computed等响应式变量的,
    computedInput() {
      return `--${this.input}--`;
    },
  },
  // props,data,computed,watch应该写在一起
  watch: {},
  // 生命周期应该写在一起
  beforeCreate() {},
  create() {},
  mounted() {},
  // 路由钩子应该写在一起
  beforeRouteEnter (to, from, next) {
    // ...
  },
  beforeRouteLeave (to, from, next) {
    // ...
  }，
  filters: {},
  methods: {
    /*
     * 函数注释依照jsDoc规范
     * @param {string} id
     */
    fetchData(id) {},
  },
};
</script>

<style lang="less" scoped>
  /* 样式使用less，用顶级节点包裹起来，逐级书写，避免样式冲突 */
  /* 样式名尽量使用BEM方式 */
  .sapi_demo {
    .children_nodes {
      // css properties
    }
  }
  /* 或者使用scoped，避免冲突 */
</style>
```