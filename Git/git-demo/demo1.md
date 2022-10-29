

### 实验目的

1. 练习仓库创建及仓库关联

### 操作步骤
1. gitee上创建仓库

1. git bash命令行创建本地创建仓库
```bash
mkdir Locker
cd Locker
git init 
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/xiaoxiang516/Locker.git
git push -u origin "master"

已有仓库?
cd existing_git_repo
git remote add origin https://gitee.com/xiaoxiang516/Locker.git
git push -u origin "master"
```

### 注意事项
通过，不能点击gitee上的初始化按钮，要是一个远程的空仓库，不能有任何文件，但是若初始化了，则会出现以下错误

```
$ git push -u origin "master"
error: src refspec master does not match any
error: failed to push some refs to 'https://gitee.com/xiaoxiang516/Locker.git'


$ git push -u origin "master"
To https://gitee.com/xiaoxiang516/Locker.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://gitee.com/xiaoxiang516/Locker.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

$ git push --set-upstream origin master
To https://gitee.com/xiaoxiang516/Locker.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://gitee.com/xiaoxiang516/Locker.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

```

[error: failed to push some refs to如何解决](https://blog.csdn.net/qq_45893999/article/details/106273214)


### 练习

1.








