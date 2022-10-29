记录下写得好的操作文档 文章收录

[Github 官方文档](https://docs.github.com/cn)



git笔记整理git笔记整理git笔记整理
在Github上查看.docx文件，并使用.docx文件格式的git diff
inisi 发布于 2019-05-05 • 在 git • 最后更新 2019-05-05 22:52 • 153 浏览

我有两个问题：

有没有办法查看Github上的.docx文件？我们已将所有作业上传到Github上，但我们无法在浏览器中查看它。如果我们可以在浏览器中查看这些.docx文件而不下载文件，那将会很好。
如何在.docx文件格式上使用git diff？我试图使用catdoc，但它不适合我。我想我以前在.doc格式上使用过git diff，但在Mac上它不适用于我。



快速设置— 如果你知道该怎么操作，直接使用下面的地址
 
https://gitee.com/xiaoxiang516/Locker.git
我们强烈建议所有的git仓库都有一个README, LICENSE, .gitignore文件

Git入门？查看 帮助 , Visual Studio / TortoiseGit / Eclipse / Xcode 下如何连接本站, 如何导入仓库

简易的命令行入门教程:
Git 全局设置:

git config --global user.name "潇湘"
git config --global user.email "7959773+xiaoxiang516@user.noreply.gitee.com"


zhuqizhong@BDR23M70BKCPR MINGW64 /d/Gitee/Locker (master)
$ git remote -v
origin  https://gitee.com/xiaoxiang516/Locker.git (fetch)
origin  https://gitee.com/xiaoxiang516/Locker.git (push)

Git基本命令【查看配置信息】【获取help帮助查看命令使用方法】



【1】查看配置信息，在终端输入git config --list --global查看全局配置信息
git config --list --global


或者输入git config {某个信息} 如 git config user.name 获取指定的一个信息的值
git config user.email


【2】获取帮助信息，在终端输入git help {命令} 会在浏览器中打开关于此命令的说明文档，如
git help config

或者输入git {命令} -h 直接在终端中查看说明文档，如
git config -h


查看git全局设置信息?

git config -l



















https://oomake.com/question/6507043

[以下来源参考链接](https://cdn.modb.pro/db/327342):

### Issue小知识：

Issue 指的是一项待完成的工作，通常与系统的改进相关，中文可以译为"问题"或"事务"。下面这些都是 Issue 的例子。

一个软件的 bug

一项功能建议

一项待完成的任务

文档缺失的报告



每个 Issue 应该包含该问题的所有信息和历史，使得后来的人只看这个 Issue，就能了解问题的所有方面和过程。

历史上，Issue 起源于客服部门。用户打电话反映问题，客服就创建一个工单（ticket），后续的每一个处理步骤、每一次与用户的交流，都要更新工单，记录全部信息。这就是 Issue 的前身。因此，Issue 的原始功能是问题追踪和工单管理，后来不断扩展，逐渐演变成全功能的项目管理工具，还可以用于制定和实施软件的开发计划。


### Pull Request小知识：

Github 官方文档的定义如下:

"Pull Request 是一种通知机制。你修改了他人的代码，将你的修改通知原来的作者，希望他合并你的修改，这就是 Pull Request。"

Pull Request 本质上是一种软件的合作方式，是将涉及不同功能的代码，纳入主干的一种流程。这个过程中，还可以进行讨论、审核和修改代码。

