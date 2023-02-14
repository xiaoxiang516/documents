
VsCode下载，使用国内镜像秒下载

傲过 于 2021-06-11 13:31:13 发布

还在因为vscode官方下载慢而头疼嘛，按这个步骤来直接起飞兄弟萌

首先进入vscode官方网站然后选择对应版本下载
然后进入浏览器下载页面
复制下载链接粘贴到地址栏
将地址中的/stable前换成vscode.cdn.azure.cn
即可实现超速下载

下面是一个国内镜像的下载链接

https://vscode.cdn.azure.cn/stable/b4c1bd0a9b03c749ea011b06c6d2676c8091a70c/VSCodeUserSetup-x64-1.57.0.exe
————————————————
版权声明：本文为CSDN博主「傲过」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/bielaiwuyang1999/article/details/117814237

[visualstudio](https://code.visualstudio.com/)
名字来源
VisualStudio 技术运用
visual studio 可视化工作室
## 发明者：Erich Gamma
Erich Gamma 是《设计模式》一书的作者之一

# [Visual Studio Code 教程](https://www.w3cschool.cn/vscode/)
https://www.w3cschool.cn/vscode/vscode-intro.html

# [VScode专栏](https://www.kancloud.cn/shangyewangchuan/vs_code/972681)

# VScode查看word文档方法介绍

在扩展界面的[搜索框中输入“office viewer”安装。Office Viewer(Markdown Editor)


[VSCode打断点](https://blog.csdn.net/mygoes/article/details/115363628)
[visualstudio - debugging](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## 断点：



菜单栏：运行-新建断点
![Alt](vscode_chrome.jpg)

## 插件安装，效率提升


vscode 写作计划
安装插件
![](./docs/images/extension.png)

VSCode 发展历史
2011 年底，微软从 IBM 请来了 Erich Gamma。Erich Gamma 是《设计模式》一书的作者之一，曾和肯特·贝克（Kent Beck） 一起发明了 JUnit，并且在 IBM 领导 Java 开发工具的开发工作。微软把他请过来，就是希望他能够打造一款在线的开发工具，让开发者们能够在浏览器里获得 IDE 般的开发体验，这也就是之后为人所知的 Monaco Editor。

Erich Gamma 见证了 Eclipse 从崛起到逐渐臃肿，再逐渐式微的整个历程，他深刻认识到 Eclipse 成功的一部分原因是极度的可定制化特性，任何功能在Eclipse中都可以用插件来实现；但是由于 Eclipse 的插件跟核心代码运行在同一个进程内，随着插件的增多，核心功能经常会被插件拖累，也就更加让人觉得笨重。

因此，在打造 Monaco Editor 时，开发团队非常注重核心功能的性能，尽可能地保持轻量，而对资源和性能消耗较大的功能，则运行在其他的进程之中。

2015 年，Erich Gamma 带领团队把 Monaco Editor 移植到桌面平台上，也就是这个专栏的主角 Visual Studio Code，即 VS Code。

# 111
VS Code 继承了 Monaco Editor 的设计原则，其核心是做一个高性能的轻量级编辑器；个性化的功能，则交给插件系统来完成。
这一点可以说是师承 Eclipse，但同时又吸取了 Eclipse 的教训，把插件系统运行在主进程之外，高度可定制但同时又是可控的。

与此同时，VS Code 也有自己的使命，那就是让开发者在编辑器里拥有 IDE 那样的开发体验，比如对源代码有智能的理解、图形化的调试工具、版本管理等等。

不难发现，VS Code 希望在编辑器和 IDE 之间找到一个平衡。在这样的设计思路下，你打开编辑器，不需要创建任何的项目工程文件就可以开始使用，并高效便捷地操作文本；同时在编程语言插件的支持下能够得到语法检查、智能提示；你还可以借助丰富的插件 API 拓展 VS Code 以满足自己的需求。

要达成这样的目标，难度可以说是非常大的，但 VS Code 取得了不错的成果。究其原因，在我看来就是微软打造了一个开放的平台。虽然有“马后炮”的嫌疑，但让我们一起来看看这样的一个开放平台是怎么助力 VS Code 的吧。