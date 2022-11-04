`关注数据`

数据打印: `做需求时写关键测试代码,在做需求时也在为做测试做准备`

组件prop用到接口调用的数据，组件使用加渲染条件v-if

## `代码规范`

任何代码改了都要测一下,从头走一遍流程



## 梳理流程
- 是否已有参考的页面或代码
- 逻辑流程
postman造数据,熟悉业务流程，熟悉组件参数定义明确传值
接口暴露
测试工具、开发测试工具

## 怎样造数据
数据重复利用
产品造数据
测试造数据
自己造数据
- 可以造
- 无法造
## 代码验证及走流程
```
在写代码时，或在写完后要对数组的使用和对象的使用进行默认值或存在性的检查,包括其属性的默认值或存在性的检查
```

`表达式：存在性校验`：row.Rldays， row.Rqdays
row.Yfdays = row.Rldays - row.Rqdays - row.Fyfdays
  row.Yfdays = isNaN(row.Yfdays) ? '' : row.Yfdays
  row.Sfmzyq = row.Yfdays > 0 ? "" : "X"

  

sit
有楼栋的合同编号：
BGY-30-1001-202206-00081
[佛肇区域-佛山南海区桂城街道碧桂园-一期][总包][1][2022]

无效成本数据
http://localhost:9528/co/#/contPetf/visaChangeMgmt/visa-onsite
sit环境    签证编号：BGY-30-1001-202206-00072-现场签证-001

事件决策
停缓-数据
http://localhost:9528/co/#/contPetf/claimEvent/claim-event-detail?guid=00505684A4ED1EDD8FFD33AF7A3C264B&sjStatus=50&sjjd=05&SjcjNum=01&Zrf=01

http://localhost:9528/co/#/contPetf/claimEvent/claim-event-detail?guid=00505684A4ED1EED94BB169ED774DB8F&sjStatus=50&sjjd=02&SjcjNum=01&Zrf=01

http://localhost:9528/co/#/contPetf/claimEvent/claim-event-detail?guid=00505684A4ED1EDD8FFD33AF7A3C264B&sjStatus=50&sjjd=05&SjcjNum=01&Zrf=01
赶工-数据
http://localhost:9528/co/#/contPetf/claimEvent/claim-event-detail?guid=00505684A4ED1EDD8FFE64C2A825C673&sjStatus=50&sjjd=02&SjcjNum=04&Zrf=01


处置方案
新增
http://localhost:9528/co/#/contPetf/claimEvent/claim-event-detail?guid=00505684A4ED1EDD8FFD33AF7A3C264B&sjStatus=50&sjjd=05&SjcjNum=01&Zrf=01

现场盘点
停缓新增
http://localhost:9528/co/#/contPetf/claimEvent/claim-event-detail?guid=00505684A4ED1EDD9585D4EB4F96615B&sjStatus=50&sjjd=04&SjcjNum=01&Zrf=01
编辑
http://localhost:9528/co/#/contPetf/claimEvent/claim-event-detail?guid=00505684A4ED1EDD8B9D8D7B5139B21D&sjStatus=50&sjjd=05&SjcjNum=02&Zrf=01

赶工
http://localhost:9528/co/#/contPetf/claimEvent/claim-event-detail?guid=00505684A4ED1EDD8AFF69CEEBDC2D33&sjStatus=50&sjjd=04&SjcjNum=04&Zrf=01



费用审核
http://localhost:9528/co/#/contractPerformance/k2/expense-audit-review?SN=366767_106&workId=84963

反索赔
处置方案
http://localhost:9528/co/#/contPetf/claimEvent/counterclaim-detail?guid=00505684A4ED1EED8EE10A67B227346E&sjStatus=50&sjjd=01&SjcjNum=07&Zrf=02
