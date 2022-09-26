
首发于
分享前端开发的心得

写文章
点击打开潇湘的主页
Element-UI 技术揭秘（2）- 组件库的整体设计
黄轶
黄轶
热爱技术，热爱分享
已关注
84 人赞同了该文章
需求分析

当我们去实现一个组件库的时候，并不会一上来就撸码，而是把它当做产品一样，思考一下我们的组件库的需求。那么对于 element-ui，除了基于 Vue.js 技术栈开发组件，它还有哪些方面的需求呢。

丰富的 feature：丰富的组件，自定义主题，国际化。
文档 & demo：提供友好的文档和 demo，维护成本小，支持多语言。
安装 & 引入：支持 npm 方式和 cdn 方式，并支持按需引入。
工程化：开发，测试，构建，部署，持续集成。


需求有了，接下来就需要去思考如何去实现，本文会依据 element-ui 2.11.1 版本的源码来分析这些需求是如何实现的。当然，element-ui 早期一定不是这样子的，我们分析的这个版本已经是经过它多次迭代优化后的，如果你想去了解它的发展历程，可以去 GitHub 搜索它的历史版本。

丰富的 feature
丰富的组件
组件库最核心的还是组件，先来看一下 element-ui 组件的设计原则：一致、反馈、效率、可控。具体的解释在官网有，我就不多贴了，在 element-ui 开发团队背后，有一个强大的设计团队，这也得益于 element-ui 的创始人 sofish 在公司的话语权和地位，争取到这么好的资源。所以 element-ui 组件的外型、配色、交互都做的非常不错。

作为一个基础组件库，还有一个很重要的方面就是组件种类丰富。elemen-ui 官方目前有 55 个组件，分成了 6 大类，分别是基础组件、表单类组件、数据类组件、提示类组件、导航类组件和其它类型组件。这些丰富的基础组件能很好地满足大部分 PC 端 to B 业务开发需求。

开发这么多组件，需要大量的时间和精力，所以这里要非常感谢 element-ui 团队，为我们提供了这些基础组件，我们基于它们做二次开发，节约了非常多的时间。
element-ui 的组件源码在 packages 目录里维护，而并不在 src 目录中。这么做并不是为了要实现 monorepo，我也并没有找到 lerna 包管理工具，这么做的目的我猜测是为了让每个组件可以单独打包，支持按需引入。但实际上想达到这个目的也并一定需要这么去组织维护代码，我更推荐把组件库中的组件代码放在 src/components 目录中维护，然后通过修改 webpack 配置脚本也可以做到每个组件单独打包以及支持按需引入，源码放在 src 目录总是更合理的。

自定义主题
element-ui 的一大特色是支持自定义主题，你可以使用在线主题编辑器，可以修改定制 Element 所有全局和组件的 Design Tokens，并可以方便地实时预览样式改变后的视觉。同时它还可以基于新的定制样式生成完整的样式文件包，供直接下载使用，那么它是如何做到这点的呢？




element-ui 组件的样式、公共样式都在 packages/theme-chalk 文件中，并且它是可以独立发布的。element-ui 组件样式中的颜色、字体、线条等等样式都是通过变量的方式引入的，在 packages/theme-chalk/src/common/var.scss 中我们可以看到这些变量的定义，这样就给做多主题提供了方便，因为我只要修改这些变量，就可以实现组件的主题改变。

了解了基本原理，做在线替换主题也并不是难事了，我并不会详细去讲在线定制主题前端交互部分，感兴趣的同学可以自己去看源码，都在 examples 目录中，我这里只说一下本质的原理。

想要做到在线换肤，并且实时预览，需要借助 server 的帮助，比如主题可以通过一个配置去维护，用户做一系列操作后，会生成新的主题配置，把这个配置通过接口提交的方式告诉 server，然后 server 会根据这个配置做返回生成新的 CSS（具体的实施的方案未开源，大致会做一些变量替换，然后编译），新的 CSS 的样式就会覆盖默认的样式，达到了切换主题的目的。

我们可以在主题编辑页面打开网络面板，可以看到有 2 个 xhr 请求，如图：





其中，updateVarible 是一个 POST 请求，他会把你修改的的主题配置提交到后端 server，提交的数据你可以自己去查看它的 Request Payload，这个 POST 请求会返回一段 CSS 文本，然后会动态插入到 head 标签的底部，来覆盖默认样式，你可以通过审查元素看到 head 底部会动态插入一个 id 为 chalk-style 的标签。

下图就是该请求返回的样式文本 ：





相关代码在 examples/components/theme/loader/index.vue 中。

    onAction() {
      this.triggertProgressBar(true);
      const time = +new Date();
      updateVars(this.userConfig)
        .then(res => {
          this.applyStyle(res, time);
        })
        .catch(err => {
          this.onError(err);
        })
        .then(() => {
          this.triggertProgressBar(false);
        });
    },
    applyStyle(res, time) {
      if (time < this.lastApply) return;
      this.updateDocs(() => {
        updateDomHeadStyle('chalk-style', res);
      });
      this.lastApply = time;
    }

onAction 函数中的 updateVars 就是去发送 POST 请求，而 applyStyle 函数就是去修改和覆盖默认样式，updateDocs 函数会去更新默认主题颜色，updateDomHeadStyle 样式会添加或者修改 id 为 chalk-style 的 style 标签，目的就是覆盖默认样式，应用新主题样式。

updateVars 请求在页面加载的时候会发起，在你修改完主题配置后也会发起。

再来看一下 getVarible 请求，它是一个 GET 请求，返回的内容是主题配置页面右侧配置面板的数据源，如下图所示：





主题配置面板根据该数据源生成，并且当你去编辑其中一项的时候，又会发起 updateVars POST 请求，把更新的配置提交，然后后端会返回新的 CSS 并在前端生效。

另外，用户修改的配置还利用了 localStorage 在本地保存了一份，这样用户每次编辑都可以保存一份主题，下次也可以继续基于某个主题继续编辑。

不过，这么实现多主题也并非完美，为了编译加速，element-ui 把样式部分单独抽离出单独的文件，这样给开发组件的同学带来很大的不便，当你去编写组件的样式的时候，需要在多个文件中来回切换，而且这样也不符合组件就近管理的原则。但是如果把样式写在组件中，server 端去编译生成单独样式文件的时间就会增长（需要从组件中提取 CSS），所以这是一个需要权衡的问题。

国际化
说到 Vue 的国际化方案，大家很容易会联想到 vue-i18n 方案，element-ui 并未引入 vue-i18n，不过它是可以很好地与 vue-i18n 兼容的。

所有的国际化方案都会用到语言包，语言包通常会返回一个 JSON 格式的数据，element-ui 组件库的语言包在 src/locale/lang 目录下，以英语语言包为例：

export default {
  el: {
    colorpicker: {
      confirm: 'OK',
      clear: 'Clear'
    }
    // ...
  }
}

在 packages/color-picker/src/components/picker-dropdown.vue 中，我们在模板部分可以看到这个语言包的使用：

<el-button
  size="mini"
  type="text"
  class="el-color-dropdown__link-btn"
  @click="$emit('clear')">
  {{ t('el.colorpicker.clear') }}
</el-button>
<el-button
  plain
  size="mini"
  class="el-color-dropdown__btn"
  @click="confirmValue">
  {{ t('el.colorpicker.confirm') }}
</el-button>


模板中用到的 t 函数，它定义在 src/mixins/locale.js 中：



import { t } from 'element-ui/src/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    }
  }
};

实际上是在 src/locale/index.js 中定义的 t 函数：

export const t = function(path, options) {
  let value = i18nHandler.apply(this, arguments);
  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};

这个函数是根据传入的 path 路径，比如我们例子中的 el.colorpicker.confirm，从语言包中找到对应的文案。其中 i18nHandler 是一个 i18n 的处理函数，这块逻辑就是用来兼容外部的 i18n 方案如 vue-i18n。

let i18nHandler = function() {
  const vuei18n = Object.getPrototypeOf(this || Vue).$t;
  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(
        Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, arguments);
  }
};

export const i18n = function(fn) {
  i18nHandler = fn || i18nHandler;
};

export const use = function(l) {
  lang = l || lang;
};

可以看到 i18nHandler 默认会尝试去找 Vue 原型中的 $t 函数，这是 vue-i18@5.x 的实现，会在 Vue 的原型上挂载 $t 方法。

另外它也暴露了 i18n 方法，可以外部传入其它的 i18n 方法，覆盖 i18nHandler。

如果没有外部提供的 i18n 方法，那么就直接找到当前的语言包 let current = lang;，接下来的逻辑就是从这个语言包对象中读到对应的字符串值，当然如果字符串需要格式化则调用 format 函数，这块逻辑同学们感兴趣可以自己看。

因此在使用对应的语言包的时候一定要注册：

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// 设置语言
locale.use(lang)

这样就注册了英文语言包，在模板中就可以正常使用并找到对应的语言了。

如果你要开发一个国际化项目，在运行时才能知道用户的语言，可以考虑使用异步动态加载的方式，在渲染页面前先获取语言包，另外也可以考虑做缓存优化，不过这个话题延伸起来就有点多了，未来我可能会单开一个主题去分享业务如何做国际化。

文档 & demo
作为一个优秀的开源组件库，友好的文档和 demo 是必不可少的，它也能帮你招揽到不少用户。作为一个组件库的开发者和维护者，也希望用最小的成本来维护文档和 demo。




element-ui 的文档和 demo 是融为一体的，我们打开它的文档，可以看到文档不仅介绍了每个组件的使用方式，还展示了组件的各种示例，并且还可以清楚地看到每个示例的源码，对用户而言非常友好。那么 element-ui 内部是如何去编写这些 demo 和文档的呢？
实际上，每个组件的文档和 demo 都是通过一个单独的 .md 文件生成的，那么它又是如何做到这点的呢？

element-ui 的 demo 源码都在 examples 目录中维护，当我们在 element-ui 工程下运行 npm run dev 的时候，会启动它的开发调试模式，并且运行官方文档和 demo。

看一下 npm scripts：

"scripts": {
    "bootstrap": "yarn || npm i",
    "build:file": "node build/bin/iconInit.js & node build/bin/build-entry.js & node build/bin/i18n.js & node build/bin/version.js",
    "dev": "npm run bootstrap && npm run build:file && cross-env NODE_ENV=development webpack-dev-server --config build/webpack.demo.js & node build/bin/template.js",
}

我们省略了其它的 scripts，重点看 dev 和相关的几个命令，其中 bootstrap 的作用是安装依赖，build:file 的作用是运行 build 目录下几个命令，包括对 icon、entry、i18n、version 等初始化。
在执行完 bootstrap 和 build:file 后，通过 webpack-dev-server 运行 build/webpack.demo.js，这个是重点，我们来看一下这个 webpack 的配置文件。

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: isProd ? {
    docs: './examples/entry.js',
    'element-ui': './src/index.js'
  } : (isPlay ? './examples/play.js' : './examples/entry.js'),
  output: {
    path: path.resolve(process.cwd(), './examples/element-ui/'),
    publicPath: process.env.CI_ENV || '',
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8085,
    publicPath: '/',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      }
    ]
  }
};

由于整个配置文件内容比较长，我只保留了重点的部分，重点看一下 entry 和 module 下的 rules。

element-ui 官网本质上就是一个用 vue 开发的应用，当我们运行 npm run dev 的时候，入口文件是 examples 目录下的 entry.js：

import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import Element from 'main/index.js';
import hljs from 'highlight.js';
import routes from './route.config';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './i18n/title';

import 'packages/theme-chalk/src/index.scss';
import './demo-styles/index.scss';
import './assets/styles/common.css';
import './assets/styles/fonts/style.css';
import icon from './icon.json';

Vue.use(Element);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

const globalEle = new Vue({
  data: { $isEle: false } // 是否 ele 用户
});

Vue.mixin({
  computed: {
    $isEle: {
      get: () => (globalEle.$data.$isEle),
      set: (data) => {globalEle.$data.$isEle = data;}
    }
  }
});

Vue.prototype.$icon = icon; // Icon 列表页用

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Element';
  ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');

入口文件做的事情很简单，全引入的方式注册了 element-ui 组件库，注册了一些官网用到的组件，注册了路由以及路由的全局钩子函数。

这里我们要重点关注路由部分，路由的配置都在 examples/route.config.js 中：

import navConfig from './nav.config';
import langs from './i18n/route';

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
    'zh-CN');
  },
  'en-US': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/en-US/${name}.vue`)),
    'en-US');
  },
  'es': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/es/${name}.vue`)),
    'es');
  },
  'fr-FR': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/fr-FR/${name}.vue`)),
    'fr-FR');
  }
};

const load = function(lang, path) {
  return LOAD_MAP[lang](path);
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN');
  },
  'en-US': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/en-US${path}.md`)),
    'en-US');
  },
  'es': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/es${path}.md`)),
    'es');
  },
  'fr-FR': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/fr-FR${path}.md`)),
    'fr-FR');
  }
};

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${ lang }/component`,
      redirect: `/${ lang }/component/installation`,
      component: load(lang, 'component'),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

const generateMiscRoutes = function(lang) {
  let guideRoute = {
    path: `/${ lang }/guide`, // 指南
    redirect: `/${ lang }/guide/design`,
    component: load(lang, 'guide'),
    children: [{
      path: 'design', // 设计原则
      name: 'guide-design' + lang,
      meta: { lang },
      component: load(lang, 'design')
    }, {
      path: 'nav', // 导航
      name: 'guide-nav' + lang,
      meta: { lang },
      component: load(lang, 'nav')
    }]
  };

  let themeRoute = {
    path: `/${ lang }/theme`,
    component: load(lang, 'theme-nav'),
    children: [
      {
        path: '/', // 主题管理
        name: 'theme' + lang,
        meta: { lang },
        component: load(lang, 'theme')
      },
      {
        path: 'preview', // 主题预览编辑
        name: 'theme-preview-' + lang,
        meta: { lang },
        component: load(lang, 'theme-preview')
      }]
  };

  let resourceRoute = {
    path: `/${ lang }/resource`, // 资源
    meta: { lang },
    name: 'resource' + lang,
    component: load(lang, 'resource')
  };

  let indexRoute = {
    path: `/${ lang }`, // 首页
    meta: { lang },
    name: 'home' + lang,
    component: load(lang, 'index')
  };

  return [guideRoute, resourceRoute, themeRoute, indexRoute];
};

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang));
});

route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
});

let userLanguage = localStorage.getItem('ELEMENT_LANGUAGE') || window.navigator.language || 'en-US';
let defaultPath = '/en-US';
if (userLanguage.indexOf('zh-') !== -1) {
  defaultPath = '/zh-CN';
} else if (userLanguage.indexOf('es') !== -1) {
  defaultPath = '/es';
} else if (userLanguage.indexOf('fr') !== -1) {
  defaultPath = '/fr-FR';
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);

export default route;

这个路由配置文件提供了指南、组件、主题、资源等多个路由页面的配置，并且支持了多语言，我们重点关注一下组件路由是如何生成的，它主要通过 registerRoute(navConfig) 方法生成。

其中 navConfig 读取的是 examples/nav.config.json 文件，这个配置文件太长我就不贴了，它包括了多个语言的配置，维护了左侧组件导航菜单路径映射关系。

registerRoute 函数内部就是遍历 navConfig，根据它内部元素的数据结构生成路由配置，如果数据中有 children 则生成子路由。

我们知道 Vue Router 的本质是根据不同的 URL path，<router-view> 组件映射到对应的路由组件，对于每一个组件的路由，都是通过 addRoute(nav, lang, index) 方法生成的，该方法内部又调用了 loadDocs(lang, page.path) 获取到对应的路由组件。

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN');
  },
  'en-US': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/en-US${path}.md`)),
    'en-US');
  },
  'es': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/es${path}.md`)),
    'es');
  },
  'fr-FR': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/fr-FR${path}.md`)),
    'fr-FR');
  }
};

以中文为例，我们获取到某个 path 下的路由组件就是一个工厂函数，它对应加载的组件路径是 exmaples/docs/zh-CN/${path}.md。这里要注意的是，和我们普通的异步组件加载方式不同，这里加载的居然是一个 .md 文件，而并非一个 .vue 文件，但却能和 .vue 文件一样能渲染成一个 Vue 组件，这是如何做到的呢？

我们知道，webpack 的理念是一切资源都可以 require，只要配置了对应的 loader。回到 build/webpack.demo.js，我们发现对于 .md 文件我们配置了相应的 loader：

  {
    test: /\.md$/,
    use: [
      {
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        loader: path.resolve(__dirname, './md-loader/index.js')
      }
    ]
  }


对于 .md 文件，这里 use 数组中配置了 2 项，它们执行顺序是逆序的，也就是先执行 md-loader，再执行 vue-loader，md-loader 的代码在 build/md-loader/index.js 中：

const {
  stripScript,
  stripTemplate,
  genInlineComponentText
} = require('./util');
const md = require('./config');

module.exports = function(source) {
  const content = md.render(source);

  const startTag = '<!--element-demo:';
  const startTagLen = startTag.length;
  const endTag = ':element-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = '';
  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    let demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `element-demo${id}`;
    output.push(`<template slot="source"><${demoComponentName} /></template>`);
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑
  let pageScript = '';
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  return `
    <template>
      <section class="content element-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;
};


webpack loader 的原理很简单，输入是文件的原始内容，返回的是经过 loader 处理后的内容。对于 md-loader，输入的是 .md 文档，输出的则是一个 Vue SFC 格式的字符串，这样它的输出就可以作为下一个 vue-loader 的输入做处理了。



我们来简单看一下 md-loader 中间处理过程。首先执行了 md.render(source) 对 md 文档解析，提取文档中 :::demo {content} ::: 内容，分别生成一些 Vue 的模板字符串，
然后再从这个模板字符串中循环查找 <!--element-demo: 和 :element-demo--> 包裹的内容，从中提取模板字符串到 output 中，提取 script 到 componenetsString 中，然后构造 pageScript，最后返回的内容就是：

  return `
    <template>
      <section class="content element-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;


最终生成的字符串满足我们通常编写的 .vue SFC 格式，它会作为下一个 vue-loader 的输入，所以这样我们就相当于通过加载一个 .md 格式的文件的方式加载了 Vue 组件。

这里面还有很多和 .md 文件解析的细节，如果你对最终生成的 output 和 pageScript 代码是什么感兴趣，建议你自己调试一番。

element-ui 这种文档和 demo 的实现方式是非常巧妙的，大大减少了 demo 和文档的维护成本，并且对于用户来说也非常友好，如果你也为自己的库构建文档，不妨参考它的实现。

安装 & 引入
通常 JS 库都会支持 npm 和 CDN 2 种安装方式，element-ui 也不例外。

先说一下 CDN 的安装方式，实际上 element-ui 会把所有组件打包生成一份 CSS 和 JS，官方也提供了例子：

<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

CDN 安装方式有它的好处，不需要构建工具，开箱即用，但缺点也很明显，全量引入了所有组件，体积非常大。

由于大部分人在开发 Vue 项目都是基于 vue-cli 脚手架初始化项目的，所以更推荐使用 npm 方式安装。

npm i element-ui -S


说到 npm 安装，不得不提 element-ui 提供的 2 种组件引入方式，完整引入和部分引入。

支持完整引入非常容易，把所有组件打包成一份 CSS 和 JS，并且在 package.json中配置：

 "main": "lib/element-ui.common.js"

这样当用户执行 import ElementUI from 'element-ui' 的时候就可以完整引入了组件的 JS 代码了。正如我们之前说的，element-ui 会单独发布 CSS，所以你还需要 import 'element-ui/lib/theme-chalk/index.css'。

完整引入的好处是方便，只需要 2 行代码就可以完整地使用 element-ui 所有的组件，但缺点也很明显，引入的组件包体积很大，通常一个项目也用不到所有的组件，会有资源浪费。

因此最佳实践就是按需引入：

import Vue from 'vue'
import { Button } from 'element-ui'

Vue.component(Button.name, Button)

大部分人这么用的时候会觉得理所当然，不知道大家有没有想过：为什么这种引入方式可以实现按需引入呢？要搞清楚这个问题，就要搞清楚 import { Button } from 'element-ui' 这个背后都做了什么。

其实官网已经有答案了，在使用按需引入的时候，要借助 babel-plugin-component这个 webpack 插件，并且配置 .babelrc：

{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

实际上它是把 import { Button } from 'element-ui' 转换成：

var button = require('element-ui/lib/button')
require('element-ui/lib/theme-chalk/button.css')


这样我们就精准地引入了对应 lib 下的 Button 组件的 JS 和 CSS 代码了，也就实现了按需引入 Button 组件。

element-ui 这种按需引入的方式虽然方便，但背后却要解决几个问题，由于我们支持每个组件可以单独引入，那么如果产生了组件依赖并且同时按需引入的时候，代码冗余问题怎么解决。举个例子，在 element-ui 中，Table 组件依赖了 CheckBox 组件，那么当我同时引入了 Table 组件和 CheckBox 组件的时候，会不会产生代码冗余呢？

import { Table, CheckBox } from 'element-ui'


如果你不做任何处理的话，答案是会，你最终引入的包会有 2 份 CheckBox 的代码。那么 element-ui 是怎么解决这个问题的呢？实际上只是部分解决了，它的 webpack 配置文件中配置了 externals，在 build/config.js 中我们可以看到这些具体的配置：

var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`element-ui/packages/${key}`] = `element-ui/lib/${key}`;
});

externals['element-ui/src/locale'] = 'element-ui/lib/locale';
utilsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/utils/${file}`] = `element-ui/lib/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/mixins/${file}`] = `element-ui/lib/mixins/${file}`;
});
transitionList.forEach(function(file) {
  file = path.basename(file, '.js');
  externals[`element-ui/src/transitions/${file}`] = `element-ui/lib/transitions/${file}`;
});

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];


externals 可以防止将这些 import 的包打包到 bundle 中，并在运行时再去从外部获取这些扩展依赖。

我们来看一下打包后的 lib/table.js，我们可以看到编译后的 table.js 对 CheckBox 组件的依赖引入：

module.exports = require("element-ui/lib/checkbox");

这么处理的话，就不会打包生成 2 份 CheckBox JS 部分的代码了，但是对于 CSS 部分，element-ui 并未处理冗余情况，可以看到 lib/theme-chalk/checkbox.css 和 lib/theme-chalk/table.css 中都会有 CheckBox 组件的 CSS 样式。

其实，要解决按需引入的 JS 和 CSS 的冗余问题并非难事，可以用后编译的思想，即依赖包提供源码，而编译交给应用处理，这样不仅不会有组件冗余代码，甚至连编译的冗余代码都不会有，实际上我们基于 element-ui fork 的组件库 zoom-ui 就应用了后编译技术，之前在滴滴搞的开源组件库cube-ui 组件库也是这么玩的。更多后编译相关介绍可以参考滴滴团队在掘金发布的 《webpack 应用编译优化之路》。

工程化
前端对于工程化的要求越来越高，element-ui 作为一个组件库，它在工程化方面做了哪些事情呢？

首先是开发阶段，为了保证大家代码风格的一致性，使用了 ESLint，甚至专门写了 eslint-config-elemefe 作为 ESint 的扩展规则配置；为了方便本地开发调试，借助了 webpack 并配置了 Hot Reload；利用模块化开发的思想把组件依赖的一些公共模块放在了 src 目录，并依据功能拆分出 directives、locale、mixins、transitions、utils 等模块。

其次是测试方面，使用了 karma 测试框架，为每一个组件编写了单元测试，并且利用 Travis CI 集成了测试。

接着是构建方面，element-ui 编写了很多 npm scripts，以 dist 这个 script 为例：

 "dist": "npm run clean && npm run build:file && npm run lint && webpack --config build/webpack.conf.js && webpack --config build/webpack.common.js && webpack --config build/webpack.component.js && npm run build:utils && npm run build:umd && npm run build:theme"


它内部会依次执行多个命令，最终会生成 lib 目录和打包后的文件。我并不打算介绍所有的命令，感兴趣同学可自行研究，这里我想介绍一下 build:file 这个 script 做的事情：

"build:file": "node build/bin/iconInit.js & node build/bin/build-entry.js & node build/bin/i18n.js & node build/bin/version.js",
这里会依次执行 build/bin 目录下的一些 Node 脚本，对 icon、entry、i18n、version 等做了一系列的初始化工作，它们的内容都是根据一些规则做文件的 IO，这么做的好处就是完全通过工具的手段自动化生成文件，比人工靠谱且效率更高，这波操作非常值得我们学习和应用。

最后是部署，通过 pub 这个 npm script 完成：

 "pub": "npm run bootstrap && sh build/git-release.sh && sh build/release.sh && node build/bin/gen-indices.js && sh build/deploy-faas.sh"

主要是通过运行一系列的 bash 脚本，实现了代码的提交、合并、版本管理、npm 发布、官网发布等，让整个发布流程自动化完成，脚本具体内容感兴趣的同学可自行查看。

总结
至此，element-ui 的组件库的整体设计介绍完毕，可以看到除了这些丰富的组件背后，还有很完整的一套解决方案，很多经验都值得我们学习和借鉴，不完美的地方也值得我们去思考，其中有很多技术细节可以深入挖掘。

把不会的东西学会了，那么你就进步了，如果你觉得这类文章有帮助，也欢迎把它推荐给你身边的小伙伴。

下一篇预告 ：Element-UI 技术揭秘（3）— Layout 布局组件的设计与实现。

另外，我最近刚开了公众号「老黄的前端私房菜」，《Element-UI 技术揭秘》系列文章会第一时间在公众号更新和发布，除此之外，我还会经常分享一些前端进阶知识，干货，也会偶尔分享一些软素质技能，欢迎大家关注喔~



