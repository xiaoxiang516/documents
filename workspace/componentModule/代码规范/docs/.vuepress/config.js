const path = require('path');

module.exports = {
  title: '文档',
  description: '产品的一些工具方法集合',
  markdown: {
    lineNumbers: false,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': 'src'
      },
    },
  },
  chainWebpack: (config, isServer) => {
    config.resolveLoader
      .modules
      .add(path.resolve(__dirname, './node_modules'));
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '介绍', link: '/intro/' },
      { text: '组件', link: '/components/' },
      { text: '指令', link: '/directives/' },
      { text: '工具', link: '/util/' },
    ],
    sidebar: {
      '/intro/': [
        '',
        'vueComponentSpecs',
        'codeCategoryStruct',
        'request',
        'handleErrors',
        'fire',
      ],
      '/util/': [
        '',
        'util',
        'dom',
        'formatTime',
        'validators',
        'modelCheck',
        'ticker',
        'countDownTicker',
        'device',
        'other',
      ],
    },
  }
}