### 参考文章
- [阮一峰](https://www.bookstack.cn/read/git-tutorial/docs-commands-git-branch.md)


git操作流程
阮一峰的这篇文章，在介绍操作流程时结合原理论述
### 新建一个分支
- 安装git
- 提交用户名和电子邮件
  $ git config --global user.name "Some One"

  $ git config --global user.email "someone@gmail.com"

- git init：新建一个git库
- git status：查看目前状态
- git add <文件名>：添加文件从工作区到暂存区
- git commit -m “提示信息”：从暂存区提交到代码仓库
- git log：查看提交commit的信息
- git remote add origin https://github.com/try-git/try_git.git : 添加远程指针
- git push -u origin master：将本地的master分支推送到远程origin主机，-u参数表示记住对应关系，- 下次可以直接git push推送。
- git pull origin master：将远程主机origin的代码取回本地，与本地的master分支合并
- git diff HEAD：查看与上一次commit的区别


### git clone
```
$ git clone https://gitee.com/xiaoxiang516/cascadingStyleSheets.git
Cloning into 'cascadingStyleSheets'...
...
```
### git branch
```
直接在git branch后面跟上分支名，就表示新建该分支。
$ git branch develop
```
## git stash某一个文件
git stash push src/views/co/contractPerformance/claimEvent/inventory/stop/MainContent.vue

git pull
# 合并指定分支到当前分支
$ git pull . topic/branch
即使当前分支有没有 commit 的变动，也可以使用git pull从远程拉取分支。
>拉取分支的条件是什么，
拉取

git commit

git push

