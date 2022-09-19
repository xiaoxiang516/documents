---
title: 代码目录结构
---
[[toc]]

产品线按照当前平台的架构，目录结构大致如下
```
|-- src
    |-- components [这个文件夹下基本是平台的组件代码]
    |-- config
        |-- config.js [多页面打包配置项，一般不需要动]
    |-- directives [平台指令代码]
    |-- pages [业务页面代码]
        |-- flow [平台流程相关代码，一般不需要动]
        |-- home [里面包含登录，首页，导航栏头部，403，404等页面组件代码]
        |-- notifications [平台消息通知相关代码，一般不需要动，可能需要配置相关业务流程弹窗]
        |-- pdm [产品页面模块代码全在此目录下书写]
            |-- components
            |-- directives
            |-- static
                |-- css [公用样式文件可在此目录中查找]
                |-- imgages
                |-- js [公用js放在此目录]
            |-- pageA [菜单A页面代码]
                |-- views [页面视图代码]
                    |-- main
                        |-- index.vue
                |-- main.js [必需，页面导出口]
                |-- page.js [打包的配置文件，决定生成的html文件名及其它会注入HtmlWebpackPlugin的配置项]
                |-- router.js [必需，页面路由配置表]
    |-- static [同pdm下结构]
        |-- css
        |-- external [此目录下的文件不参与编译，打包时会拷贝过去]
        |-- i18n [多语言化]
        |-- images
        |-- js
        |-- config.dev.js [开发环境下的配置，定义了api地址及其他配置]
        |-- config.product.js 
        |-- config.stage.js 
        |-- config.test.js 

```
### 新建业务菜单
代码目录建立在pages/pdm目录下，目录使用camelCase命名方式，目录命名要符合业务模块功能   
目录大致如下
```
|-- pageA [菜单A功能模块]
    |-- components [pageA下的不能独立作为页面的组件代码，如果具有普适性，应该抽出放置到pdm目录下]
    |-- defs [定义文件，文件以.def.js结尾，只是字段定义，不作功能实现]
        |-- status.def.js
    |-- models [给ModekCheck使用的数据校验模型描述文件，多用于数据请求的数据校验，以.model.js结尾]
        |-- view.model.js
    |-- views [页面视图代码]
        |-- main [如果一个菜单模块会有多个子菜单，应该在views下建立各个独立文件目录来区分]
            |-- index.vue
    |-- main.js [必需，页面导出口]
    |-- page.js [打包的配置文件，决定生成的html文件名及其它会注入HtmlWebpackPlugin的配置项]
    |-- router.js [必需，页面路由配置表]
```
::: warning
虽说使用Vue开发都是作为组件模式来开发，但是我们还是要区分一下一个完整的页面视图和无法作为独立页面而只能被其他组件引用的功能组件  
所以可独立作为页面视图存在的应放入views目录，功能组件放入components目录
:::
