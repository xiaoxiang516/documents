## 常用



## Ecosystem

| Project             | Status    | Description   |
| ------------------- | --------- | ------------- |
| [Vue-router]        | [![vue-router-status]][vue-router-package]| aa |

[vue-router]: https://github.com/vuejs/vue-router

## Documentation
`潇湘`：字体颜色设置（不给具体链接）
To check out [live examples]() and docs, visit [vuejs.org]()


## **md文件在vscode中预览**
![Alt](vscode插件.jpg)
## md中引入图片
> 剪贴板截图粘贴自动生成图片目录

1. 在sublime中写markdowm，引入图片写法如下
   参考样式：![Alt](img.png)
   
2.如果想改变图片大小，写法按如下不支持
    参考样式：![Alt](img.png =30x30)

3.可以通过如下方式解决
   <img src="img.png" width="30" height="30" />


<!--
重要: 请使用以下链接创建新 issue

  https://elementui.github.io/issue-generator

未通过以上链接创建的 issue 会被机器人直接关闭。

########

IMPORTANT: Please use the following link to create a new issue:

  https://elementui.github.io/issue-generator

If your issue was not created using the app above, it will be closed immediately.
-->
# Guía para Contribuidores a `Element UI`


Please make sure these boxes are checked before submitting your PR, thank you!

* [ ] Make sure you follow Element's contributing guide ([中文](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md) | [English](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.en-US.md) | [Español](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.es.md) | [Français](https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.fr-FR.md)).
* [ ] Make sure you are merging your commits to `dev` branch.
* [ ] Add some descriptions and refer relative issues for you PR.

## Pré-requis
`Node.js 4+`, `yarn` et `npm 3+` sont requis. Note: nous utilisons yarn pour verrouiller les versions des dépendances, donc vous devriez installer les dépendances en utilisant `yarn` au lieu de `npm install`.
```shell
git clone git@github.com:ElemeFE/element.git
npm run dev

# open http://localhost:8085
```

> **Remarque** : modifiez le fichier `examples/play/index.vue`, utilisez le composant auquel vous contribuez, puis lancez `npm run dev:play`, allez sur [http://localhost:8085](http://localhost:8085), regardez le résultat rapidement et facilement.


1. 键盘#
<kbd>Backspace</kbd>

2. 路径#
   /usr/local/nginx/sbin/nginx

<span style="color:#4185c4;">/usr/local/nginx/sbin/nginx</span>

3. 彩色字体背景#
   Nginx is not running !

<b style="color:red;">Nginx&nbsp;is&nbsp;not&nbsp;running&nbsp;!</b>
Nginx is running !

<b style="color:green;">Nginx&nbsp;is&nbsp;running&nbsp;!</b>
Nginx is running !

<b style="background-color:green;color:white;"> Nginx is running ! </b>
4. 折叠#
展开查看内容
<details>
 <summary>展开查看内容</summary>
 这是展开后的内容。
</details>


<table align="center">
    <tr>
        <th rowspan="2">真实情况</th>
        <th colspan="2">预测结果</th>
    </tr>
    <tr>
        <td>正例</td>
        <td>反例</td>
    </tr>
    <tr>
        <td>正例</td>
        <td>TP(真正例)</td>
        <td>FN(假反例)</td>
    </tr>
    <tr>
        <td>反例</td>
        <td>FP(假正例)</td>
        <td>TN(真反例)</td>
    </tr>
</table>


### Font-family 代码

```css
font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
```

分割线---

---

## Introduction

Vue (pronounced `/vju:/`, like view) is a **progressive framework** for building user interfaces. 


#### Browser Compatibility

Vue.js supports all browers that are [ES5-compliant]()(IE8 and blow are not supported).

## 文档参考链接
