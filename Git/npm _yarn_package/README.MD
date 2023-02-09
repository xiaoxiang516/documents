### 工作
首先：npm安装yarn
## node-sass安装
在，淘宝镜像，提示，yarn安装node-sass，不必用到pathyon,

yarn设置镜像为碧桂园镜像，然后直接
淘宝镜像源（单次安装）：npm install --registry=https://registry.npmmirror.com     
碧桂园内网源（单次安装）：npm install --registry=https://npm.countrygarden.com.cn/

### npm yarn 安装指定包
npm install --save md5

package.json
^管后面两位，取最大最新版本
```json
{
	"axios": "^0.26.0",
	"bgy-staff-pick": "^0.1.1",
}
```
^管最后一位，取最大最新版本
```json
{
	"@vue/cli-plugin-babel": "~5.0.0",
	"@vue/cli-plugin-eslint": "~5.0.0",
}
```

### npm
[docs-npmjs](https://docs.npmjs.com/)
Documentation for the npm registry, website, and command-line interface
Managing your profile settings
*profile*（记载个人心理或行为特点、喜好等的）档案

[npmjs](https://www.npmjs.cn/)

### yarn

[https://www.yarnpkg.cn/](https://www.yarnpkg.cn/)

[https://yarn.bootcss.com/](https://yarn.bootcss.com/)

- [yarn add](https://www.yarnpkg.cn/cli/add)

- [yarn install](https://www.yarnpkg.cn/cli/install)

### EPERM: operation not permitted, 
rename 'D:/otherSystem/gys-frontend/packages/gys-outer/node_modules/.vite/processing' -> 'D:/otherSystem/gys-frontend/packages/gys-outer/node_modules/.vite/deps'

npm EPERM: operation not permitted, rename解决
此问题并非权限问题！

执行如下3条命令解决：

1.清理npm缓存
npm cache clean --force

2.升级npm版本
npm install -g npm@latest --force

3.再次清理npm缓存
npm cache clean --force
　　
然后再次运行npm install 即可。


npm install jquery@3.0.0 --save
1
在package.json中可以看到：

"jquery": "^3.0.0
1、全局安装

npm install xxx -g  //模块将被下载安装到【全局目录】中
2、本地安装

npm install xxx //则是将模块下载到当前命令行所在目录
3、信息写入

npm install xxx --save   // 简写：npm install xxx -S
npm install xxx --save-dev  // 简写：npm install xxx -D
//安装的同时，将信息写入package.json中项目路径中
--save 将依赖包名称添加到 package.json 文件 dependencies 下
--save-dev 则添加到 package.json 文件 devDependencies 下
--save 是你发布之后还依赖的东西
--save-dev 是你开发时候依赖的东西
————————————————
版权声明：本文为CSDN博主「雪梅零落」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xuaner8786/article/details/81630445/











## 问题：
npm缓存的产生？





node-sass

gyp ERR! find VS msvs_version not set from command line or npm config
gyp ERR! find VS VCINSTALLDIR not set, not running in VS Command Prompt
gyp ERR! find VS checking VS2019 (16.11.31911.196) found at:
gyp ERR! find VS "C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional"
gyp ERR! find VS - found "Visual Studio C++ core features"
gyp ERR! find VS - missing any VC++ toolset
gyp ERR! find VS could not find a version of Visual Studio 2017 or newer to use
gyp ERR! find VS looking for Visual Studio 2015
gyp ERR! find VS - not found
gyp ERR! find VS not looking for VS2013 as it is only supported up to Node.js 8
gyp ERR! find VS
gyp ERR! find VS **************************************************************
gyp ERR! find VS You need to install the latest version of Visual Studio
gyp ERR! find VS including the "Desktop development with C++" workload.
gyp ERR! find VS For more information consult the documentation at:
gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
gyp ERR! find VS **************************************************************
gyp ERR! find VS
gyp ERR! configure error
gyp ERR! stack Error: Could not find any Visual Studio installation to use
gyp ERR! stack     at VisualStudioFinder.fail (D:\group-integrationiplatform-frontend\node_modules\node-gyp\lib\find-visualstudio.js:122:47)
gyp ERR! stack     at D:\group-integrationiplatform-frontend\node_modules\node-gyp\lib\find-visualstudio.js:75:16
gyp ERR! stack     at VisualStudioFinder.findVisualStudio2013 (D:\group-integrationiplatform-frontend\node_modules\node-gyp\lib\find-visualstudio.js:363:14)
gyp ERR! stack     at D:\group-integrationiplatform-frontend\node_modules\node-gyp\lib\find-visualstudio.js:71:14
gyp ERR! stack     at D:\group-integrationiplatform-frontend\node_modules\node-gyp\lib\find-visualstudio.js:384:16
gyp ERR! stack     at D:\group-integrationiplatform-frontend\node_modules\node-gyp\lib\util.js:54:7
gyp ERR! stack     at D:\group-integrationiplatform-frontend\node_modules\node-gyp\lib\util.js:33:16
gyp ERR! stack     at ChildProcess.exithandler (node:child_process:404:5)
gyp ERR! stack     at ChildProcess.emit (node:events:390:28)
gyp ERR! stack     at maybeClose (node:internal/child_process:1064:16)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (node:internal/child_process:301:5)
gyp ERR! System Windows_NT 10.0.19044
gyp ERR! command "D:\\Program\\nodejs\\node.exe" "D:\\group-integrationiplatform-frontend\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild" "--verbose" "--libsass_ext=" "--libsass_cflags=" "--libsass_ldflags=" "--libsass_library="
gyp ERR! cwd D:\group-integrationiplatform-frontend\node_modules\node-sass
gyp ERR! node -v v16.13.2



error An unexpected error occurred: "EEXIST: file already exists, mkdir 'C:\\Program Files\\nodejs'".

Error: Cannot find module 'semver/functions/satisfies' Require stack:
