
[node版本切换](../../NodeJs/nvm/nvm-node.md)

常用命令

npm get config registry
npm config set registry https://registry.npm.taobao.org
npm config set registry https://npm.countrygarden.com.cn/
淘宝镜像源（单次安装）：npm install --registry=https://registry.npmmirror.com     
碧桂园内网源（单次安装）：npm install --registry=https://npm.countrygarden.com.cn/

1、查看一下当前源
yarn config get registry
2、切换为淘宝源
yarn config set registry https://registry.npm.taobao.org
3、或者切换为自带的
yarn config set registry https://registry.yarnpkg.com

### 工作
首先：npm安装yarn
## node-sass安装
在，淘宝镜像，提示，yarn安装node-sass，不必用到pathyon,

yarn设置镜像为碧桂园镜像，然后直接
淘宝镜像源（单次安装）：npm install --registry=https://registry.npmmirror.com     
碧桂园内网源（单次安装）：npm install --registry=https://npm.countrygarden.com.cn/

npm install --save md5


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