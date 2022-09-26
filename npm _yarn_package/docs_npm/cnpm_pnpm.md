pnpm
# 项目名称

### 项目的划分
```
packages
├── components   # 公共组件库
├── core         # 公共工具库
├── modules      # 公共业务模块库
├── inner         # 甲方端
├── outer         # 供应商端
```

### 开发指南

### 工具版本

- node 版本 `v14.17.4`
- npm  版本 `v6.14.14`
- pnpm 版本 `v6.32.8`

### 开发命令

1. 运行 `npm install pnpm -g` 全局安装pnpm
2. 运行 `pnpm install` 安装依赖包
3. 运行 `pnpm run start:inner` 启动 甲方端 dev 服务器 或 运行 `pnpm run start:outer` 启动 供应方端 dev 服务器
4. 运行 `pnpm run build` 编译发布包
5. 全局依赖
-  `pnpm install <package name> (-S | -D) -W`
-  例：`pnpm install vue -S -W`
6. 局部依赖
-  `pnpm install <package name> -r --filter <项目名>`
-  例：`pnpm install @gys/components -r --filter gys-inner`



## cnpm 配置淘宝镜像 cnpm

npm更换成淘宝镜像源cnpm
1.需求
 由于node安装插件是从国外服务器下载，受网络影响大，速度慢且可能出现异常。所以如果npm的服务器在中国就好了，所以我们乐于分享的淘宝团队（阿里巴巴旗下业务阿里云）干了这事

2.使用方法

1.使用阿里定制的 cnpm 命令行工具代替默认的 npm，输入下面代码进行安装

npm install -g cnpm --registry=https://registry.npm.taobao.org
2.检测cnpm版本，如果安装成功可以看到cnpm的基本信息。

cnpm -v
3.以后安装插件只需要使用cnpm intall即可

假如我已经习惯了npm install的安装方式，我不想去下载阿里的cnpm命令工具将命令变成cnpm怎么办？很容易我们想到，我直接将node的仓库地址改成淘宝镜像的仓库地址不就好了吗？

3.单次使用

npm install --registry=https://registry.npm.taobao.org

4.永久使用

设置成全局的下载镜像站点，这样每次install的时候就不用加--registry，默认会从淘宝镜像下载，设置方法如下：
 

1.打开.npmrc文件（nodejs\node_modules\npm\npmrc，没有的话可以使用git命令行建一个( touch .npmrc)，用cmd命令建会报错）
 
2.增加 registry =https://registry.npm.taobao.org 即可。
也可以按如下方式直接在命令行设置

npm config set registry https://registry.npm.taobao.org
检测是否成功

// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或
npm info express
这样，我们可以使用淘宝镜像还不用更换成cnpm,是不是很爽！虽然实际都是使用的是淘宝镜像。
最后附上淘宝镜像官网地址：http://npm.taobao.org/

注：如果想还原npm仓库地址，只需再把地址配置成npm镜像就可以了

npm config set registry https://registry.npmjs.org/
————————————————
版权声明：本文为CSDN博主「彭于晏之长沙分晏」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_42268834/article/details/120754181