[nvm](https://nvm.uihtm.com/)
npm -v 6.11.3
node -v v12.12.0
nvm install
nvm use 16.4.0
nvm list

nvm的使用
nvm 主要是用来管理 nodejs 和 npm 版本的工具，可以用来切换不同版本的 nodejs。

nvm 安装
使用前先删除掉本机已安装过的 nodejs（如果已安装的 nodejs 的话）

// 下载地址
https://github.com/coreybutler/nvm-windows/releases
// 下载安装包
nvm-setup.zip

// 如果 node 和 npm 安装很慢或失败：(切换镜像)
C:\Users\xx\AppData\Roaming\nvm\settings.txt（nvm安装目录下的该文件）
node_mirror:https://npm.taobao.org/mirrors/node/
npm_mirror:https://npm.taobao.org/mirrors/npm/
注意：

nvm 的安装目录不能有中文，否则会出现如下问题
nvm could not be found or does not exist. Exiting.
1
安装的路径有可能会出现权限问题，所以有时需要用管理员权限（管理员方式打开cmd），否则可能会出现如下问题
nvm exit status 1乱码
1
常见使用命令：
在 cmd 控制台直接输入 nvm 就可以查看 nvm 的全部帮助命令了，下面是列举几个常用的 ：

nvm list：查看当前本机使用 nvm 已安装的nodejs的版本列表
nvm arch：查看当前本机是 32 bit 还是 64 bit
nvm install node@版本号：安装指定版本的 nodejs
nvm install latest：安装最新版本的 nodejs
nvm install 14.18.1：安装 14.18.1 版本的 nodejs
nvm uninstall node@版本号：卸载指定版本的 nodejs
nvm uninstall 14.18.1：卸载 14.18.1 版本的 nodejs
nvm use node@版本号：使用指定版本的 nodejs(该版本是已经安装过后的)
nvm use 14.18.1：使用已安装的 14.18.1 版本的 nodejs
nvm root：查看本机安装的 nvm 的安装目录地址
使用管理员身份打开cmd，然后使用 nvm use 14.18.1使用指定版本的node，查看node版本号 node -v
————————————————
版权声明：本文为CSDN博主「风如也」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_38157825/article/details/121324461


https://blog.csdn.net/m0_48276047/article/details/113926266

解决‘vue‘ 不是内部或外部命令，也不是可运行的程序 或批处理文件的方法

D.U.S.Tべ

创建Vue项目 vue-cli脚手架的安装使用

1.输入命令找到npm 的配置路径npm config list

2.查看此路径下有没有vue.cmd

3.如果有vue.cmd，将当前路径复制添加到path环境变量
步骤：桌面右击“我的电脑”-属性-高级系统设置-环境变量

环境变量 两种添加方式：
①直接新建-规范取一个变量名-将vue.cmd所在路径复制到变量值

然后在path中添加此变量名，注意用%号包裹住

②第二种就是直接复制vue.cmd所在的路径，然后不用点击新建，找到path点击编辑，在里面新建将路径放进去即可

环境变量配置保存好之后，打开cmd,输入vue -V查看版本，输入vue查看详细

4.如果没有vue.cmd的情况下，打开cmd
输入命令npm install -g vue-cli,会自动下载模板，下载好之后，从上面第一步到第三步来一遍。

————————————————
版权声明：本文为CSDN博主「D.U.S.Tべ」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_48276047/article/details/113926266
