> 记录此项目实现过程中用到的git知识

对话形式（讨论式写作）
### [Git官网教程](https://git-scm.com/downloads)


### [阮一峰 Git 教程](https://www.bookstack.cn/read/git-tutorial/docs-basic.md)


### [廖雪峰官网](https://www.liaoxuefeng.com)
>官网下的讨论值得关注

笔记内容化见：Git_liaoxuefeng.md
### 使用git进行word版本管理

### 开发实践事件：
团队公用一个分支开发，其中一个开发操作失误，出现代码覆盖，代码丢失

@所有人 前端代码分支管理【以下要求，将从 2022.8.30  22:00 实施并执行】
1. sit/uat/prod/dev/micro-dev 分支作为保护分支，只有 maintainer 权限可以 push&merge
2. 业财（财务、投策、营销、采购）：micro-dev-integration 分支，责任人：陈露佳@高高高高高高高  maintainer 权限
3. SRM：micro-dev-srm 分支，责任人：过彪@过彪 Bryan &关华@hua  maintainer 权限
4. 成本：micro-dev-co-cost 分支，责任人：张华@张华  maintainer 权限
5. 履约：micro-dev-co-fulfill 分支，责任人：伍健聪@Tony ⁵  maintainer 权限
6. 各组责任人可 merge 本组分支到 micro-dev，注意如果有修改了除 views 文件夹的，需要知会高铭@M

