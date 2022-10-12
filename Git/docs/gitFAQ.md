！！！切换分支到dev，需要再拉代码，因为切换到的是本地的dev分支,而远程的dev分支可能有本地没有的代码（其他人合过）

## master、origin master 与 origin/master 有什么区别？

公孙元二 于 2021-12-13 09:14:35 发布

如果没有特意去了解 master、origin master 与 origin/master 的区别的话，经常会导致在使用的时候模糊两者之间的区别。那么它们是怎样的区别呢？

- master 这个很好理解，它代表本地的某个分支名。

- origin master 代表着两个概念，前面的 origin 代表远程名，后面的 master 代表远程分支名

- origin/master 只代表一个概念，即远程分支名，是从远程拉取代码后在本地建立的一份拷贝（因此也有人把它叫作本地分支）。

举几个例子可能会更加清晰地说明问题：

- 执行 git fetch origin master 时，它的意思是从名为 origin 的远程上拉取名为 master 的分支到本地分支
origin/master 中。既然是拉取代码，当然需要同时指定远程名与分支名，所以分开写。
- 执行 git merge origin/master 时，它的意思是合并名为 origin/master
的分支到当前所在分支。既然是分支的合并，当然就与远程名没有直接的关系，所以没有出现远程名。需要指定的是被合并的分支。
- 执行 git push origin master 时，它的意思是推送本地的 master 分支到远程
origin，涉及到远程以及分支，当然也得分开写了。
- 还可以一次性拉取多个分支的代码：git fetch origin master stable oldstable；
- 也还可以一次性合并多个分支的代码：git merge origin/master hotfix-2275 hotfix-2276
hotfix-2290；
- 执行 git branch -a 可以查看所有的分支名：
```
root@localhost:/dat/taoblog# git branch -a
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/api
  remotes/origin/draft
  remotes/origin/master
  remotes/origin/rsync
  remotes/origin/waterfall
  ```



  >Git

版本管理node,npm,elementui,



```
D:\otherSystem\group-integrationiplatform-frontend-co>git push
To https://git.bgy.com.cn/pt00278/group-integrationiplatform-frontend-co.git
 ! [rejected]          dev -> dev (non-fast-forward)
error: failed to push some refs to 'https://git.bgy.com.cn/pt00278/group-integrationiplatform-frontend-co.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

解决： [npm install 报错 ‘The operation was rejected by your operating system‘](https://blog.csdn.net/Run_youngman/article/details/113987836)
![1664423082230](image/gitFAQ/1664423082230.png)