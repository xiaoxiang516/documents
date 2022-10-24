[docs-npmjs](https://docs.npmjs.com/)
Documentation for the npm registry, website, and command-line interface
Managing your profile settings
*profile*（记载个人心理或行为特点、喜好等的）档案

[npmjs](https://www.npmjs.cn/)



### 实验 搭建环境
- 安装卸载更新npm
- 安装卸载更新yarn


例子： 结合文件build-sit.sh,npm build-uat.sh
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
