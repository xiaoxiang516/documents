# 提交空文件
git设计时是不支持空文件夹提交的，这里是在文件夹里面新建.gitignore文件或者.gitkeep空文件来处理的
unity也支持忽略以.开头的文件的

新建.gitignore文件
在空文件夹下新建.gitignore文件，文件内容：

# Ignore everything in this directory
*
# Except this file
!.gitignore

这样就能提交git仓库了
我这是在windows上操作的，不能直接创建以.开头的文件，参考这篇文章Windows创建.开头的文件或者.开头的文件夹

新建.gitkeep文件
在空文件夹下新建.gitkeep文件，是空文件，这样就能提交git仓库了
————————————————
版权声明：本文为CSDN博主「 codingriver 」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/codingriver/article/details/83414795

### 增删查改
```
1.新建git仓库： git init  路径（git init D:/GIT/resposity）

2.新建用户名： git config --global user.name 用户名（ git config --global user.name array）
3.新建邮箱： git config --global user.name 邮箱

4.新增用户： git config --global --add user.name 用户名

5.查询用户： git config user.name

                        git config --get user.name

  6.获取所有用户信息： git config --list --global

7.删除用户：git config --global --unset user.name object

8.git 别名：git config --global alias.以前的变量   别名

                       git config --global alias.commit ct

9.提示快捷键  ：双击tab（比如打出conf然后双击tab会自动补全为config）
————————————————
版权声明：本文为CSDN博主「小蒋小蒋快乐成长」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/object_oriented/article/details/82385733
```


## FAQ
git.exe clone --progress --recursive -v "https://gitee.com/xiaoxiang516/component-library.git" "D:\elementui\component-library"
Cloning into 'D:\elementui\component-library'...
remote: [session-ad45e7aa] xiaoxiang516: Incorrect username or password (access token)
fatal: Authentication failed for 'https://gitee.com/xiaoxiang516/component-library.git/'


git did not exit cleanly (exit code 128) (23969 ms @ 2022/7/2 18:31:59)

## 2.登录认证：用户名与密码
成功git.exe clone --progress --recursive -v "https://gitee.com/xiaoxiang516/component-library.git" "D:\elementui\component-library"
Cloning into 'D:\elementui\component-library'...
POST git-upload-pack (185 bytes)
POST git-upload-pack (212 bytes)
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 6 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (6/6), done.

Success (47984 ms @ 2022/7/2 18:36:24)
3.




