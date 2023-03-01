
## 远程分支回退

```js
git log
git reset --hard commit-id
git push --force # 强制覆盖远程
```

## git log查看日志显示的格式
git config --global log.date format:'%Y-%m-%d %H:%M:%S'
[](https://blog.csdn.net/weixin_41287260/article/details/119955203)

默认的git log查看日志显示的格式如下：
Date: Thu Aug 16 17:44:32 2018 +0800
可能不是很容易识别。git bash中使用命令设置即可：
//修改当前仓库log date格式
git config log.date iso-strict-local

//全局设置log date格式
git config --global log.date iso-strict-local
# 修改之后的日历格式：
# Date:   2018-08-23T17:16:39+08:00

# 或者这样
git config --global log.date format:'%Y-%m-%d %H:%M:%S'
# Date:   2021-08-27 15:38:56
————————————————
版权声明：本文为CSDN博主「秦时明月之君临天下」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_41287260/article/details/119955203

