

## FAQ
权限：
分支权限
安装依赖权限

npm get config registry
npm config set registry https://npm.countrygarden.com.cn/
1、查看一下当前源
yarn config get registry
2、切换为淘宝源
yarn config set registry https://registry.npm.taobao.org
3、或者切换为自带的
yarn config set registry https://registry.yarnpkg.com


yarn的安装及使用教程

目录

一、引言
二、同为包管理工具 npm和yarn的区别
三、yarn的安装
四、总结

一、引言

        之前出过一篇关于 用 npm 创建 react 项目的介绍与使用教程，本文在此介绍并对比一下 yarn 的使用。

        yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具，yarn 是为了弥补 npm 的一些缺陷而出现的。

二、同为包管理工具 npm和yarn的区别
        1、并行安装：yarn安装包会同时执行多个任务，npm 需等待上一个任务安装完成才能运行下一个任务
        2、离线模式：如果你已经安装过一个包，用 yarn 再次安装会从缓存中获取，而 npm 会从网络下载
        3、版本锁定：yarn 默认有一个 yarn.lock 文件锁定版本，保证环境统一，而 npm 默认从网络下载最新的最稳定的，版本锁定可以解决包之间版本不兼容问题，npm 也可以通过命令实现版本锁定
        4、更简洁的输出：yarn 安装包时输出的信息较少，npm 输出信息冗余
 

三、yarn的安装
        1. nodejs下载安装：

                在 node.js 官网里推荐选择 LTS (长期支持)版本，可在命令行用node -v 查看node的安装版本。顺便 npm -v 查看npm的版本号。

        2. yarn的安装并查看版本:                

npm install -g yarn
yarn --version
 四、总结
        npm存在的一些不足：

npm install 下载速度慢，即使是重新 install 时速度依旧慢

同一个项目，安装的无法保持一致性。原因是因为 package.json 文件中版本号的特点导致在安装的时候代表不同的含义。

使用 npm 安装多个 js 包时，包会在同一时间下载和安装。安装过程中，其中一个包抛出了一个异常，但 npm 会继续安装其他包，所以错误信息就会在一大堆提示信息中丢失掉，以至于直到执行前，都不会发现实际发生的错误。

        Yarn的优点：

安装速度快 (服务器速度快 , 并且是并行下载)
版本锁定，安装版本统一
缓存机制，如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了
输出简洁并且多注册来源处理。安装包时，直观地打印出必要的信息；不管包被不同的库间接关联引用多少次，只会从一个注册来源去装，防止出现混乱不一致。
        npm 与 yarn 常用命令对比
————————————————
版权声明：本文为CSDN博主「小白目」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_37974755/article/details/124475338

npm config set registry https://npm.countrygarden.com.cn/
npm install --save md5
## vue引入md5

一. 简述
登录，修改重要信息等场景需要用到md5加密，来保证传输数据保密性，安全性。
二. 步骤

1. 引入md5：yarn add md5 -s

2. 使用md5: 在需要加密的页面，引入该模块

```js
<script>
import {post} from '@/common/net/serviceUtil.js'
import md5 from 'md5'
 
export default {
  data () {
    return {
      form: {
        password: '',
        username: ''
      }
   }
 },
  methods: {
    loginOpretion () {
       let params = {
            username: this.form.username,
            password: md5(this.form.password)
          }
    }
  }
 
}
</script>
```