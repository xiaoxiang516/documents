---
title: 数据请求
---

避免传统的函数回调地狱，代码对原本的ajax请求方法再次封装，返回Promise链  
原始处理逻辑在common.js中的ajaxMethod  
强烈建议数据请求使用[async/await异步函数](http://es6.ruanyifeng.com/#docs/async)

### 使用
```js
import Vue from 'vue';
import promiseRequest from '@/static/js/utils@hyk/promiseRequest';

Vue.use(promiseRequest);
```

```vue
<template>
</template>

<script>
export default {
  created() {
    this.fetchData(),
  },
  methods: {
    async fetchData() {
      return await this.$promisGet('/api/list');
    },
  },
}
</script>
```

::: warning 注意
ajaxMethod里使用了指向vue实例的this，所以这里只能将方法挂载到Vue原型链上
:::

### promiseRequest
基本请求方法
* @param {object} config - [axios](http://www.axios-js.com/)的配置信息
* @param {[Model](/util/modelCheck.html#model)} model - 数据校验模型描述

示例
```js
export default {
  methods: {
    fetchData() {
      this.$promiseRequest({
        url: '/api/list',
        method: 'get',
        params: {
          pageIndex: 1,
          pageSize: 20,
        },
      }).then((data) => {}).catch(errorDisplay);
    },
  },
}
```

### promiseGet
get请求方法
* @param {string} url - api地址
* @param {object} data
* @param {[Model](/util/modelCheck.html#model)} model - 数据校验模型描述

示例
```js
export default {
  methods: {
    async fetchData() {
      return await this.$promiseGet('/api/list', {
        pageIndex: 1,
        pageSize: 20,
      });
    },
  },
}
```

### promisePost
post请求方法
* @param {string} url - api地址
* @param {object} data
* @param {[Model](/util/modelCheck.html#model)} model - 数据校验模型描述

示例
```js
export default {
  methods: {
    async addData() {
      return await this.$promisePost('/api/add', {
        Name: '张三',
        Age: 20,
      });
    },
  },
}
```

### promisePut
put请求方法
* @param {string} url - api地址
* @param {object} data
* @param {[Model](/util/modelCheck.html#model)} model - 数据校验模型描述

示例
```js
export default {
  methods: {
    async updateData() {
      return await this.$promisePut('/api/update', {
        Id: 1, 
        Name: '张三',
        Age: 20,
      });
    },
  },
}
```

### promiseDelete
delete请求方法
* @param {string} url - api地址
* @param {object} data
* @param {[Model](/util/modelCheck.html#model)} model - 数据校验模型描述

示例
```js
export default {
  methods: {
    async deleteData() {
      return await this.$promiseDelete('/api/delete', [1, 2]);
    },
  },
}
```

### 数据校验
我们可以指定model参数来对发送的数据进行数据校验，具体参照[这里](/util/modelCheck.html)  
  
我们可以根据后台api文档，构造一个完全一模一样的数据模型，代码更加严谨，降低错误率。  
  
这里以优秀项目库新增/编辑为例

```js
export default {
  data() {
    return {
      model: {
        // 项目id
        ProjectId: null,
        // 专业id
        ProfessionId: null,
        // 专业名称
        ProfessionName: '',
        // 是否使用流程审批
        IsUsedFlow: false,
        // 是否是打回调整编辑
        IsAdjust: false,
        //  审批状态 1-草稿 2-审批中 3-正式 4-不通过 5-撤回 6-打回
        Status: 1,
        Remark: '',
        // 专业方案附件
        ProfessionalPlans: [],
        // 封面图附件
        CoverImages: [],
        // 创建人
        CreateByName: basicInfo.AliasName || basicInfo.UserName,
      },
      // 建议使用工厂函数来构造
      descriptors: {
        ProjectId: {
          type: [String, Array],
          required: true,
          replace(v) {
            // 取级联选择器的最后一级数据
            if (Array.isArray) {
              return v[v.length - 1];
            }
            return v;
          },
          errorMsg: '请选择申请项目',
          validator: Validators.notEmpty,
          elementFormRule: [
            {
              required: true,
              message: '请选择申请项目',
              trigger: 'change',
            },
          ],
        },
        ProfessionId: {
          type: String,
          required: true,
          errorMsg: '请选择专业',
          validator: Validators.notEmpty,
          elementFormRule: [
            {
              required: true,
              message: '请选择专业',
              trigger: 'change',
            },
          ],
        },
        ProfessionName: {
          type: String,
          required: true,
          errorMsg: '请选择专业',
          validator: Validators.notEmpty,
        },
        Status: {
          type: Number,
          required: true,
        },
        IsUsedFlow: {
          type: Boolean,
          required: true,
        },
        IsAdjust: {
          type: Boolean,
          required: true,
        },
        Remark: {
          type: String,
          default: '',
        },
        CoverImages: {
          type: Array,
          model: {
            type: Object,
          },
          errorMsg: '封面图不能为空',
          validator: Validators.notEmpty,
        },
        ProfessionalPlans: {
          type: Array,
          model: {
            type: Object,
          },
          errorMsg: '方案文件不能为空',
          validator: Validators.notEmpty,
        },
      },
    };
  },
  methods: {
    /*
     * 从这里可以看出，使用了async和promise后，整个数据提交流程变得异常清晰
     * 代码自上而下逐行执行，逻辑非常清晰和容易理解。而且当后台增加或删除字段，这里的代码几乎不用变动
     * 因为我们把数据结构描述全部放入了descriptors中，后台想要什么结构，我们就构造对应的结构，专注于数据。
     * descriptors中不单描述了要发送数据的样子，而且也可以对数据有效性进行验证
     * 这样我们就把所有的逻辑分散到每个字段field上，更多地关注单个字段field所承担的角色
     */
    submit: asyncFunctionErrorCatcher(async function () {
      // 表单验证
      await this.$refs.form.validate().catch(() => { throw ({ _suppressErrorDisplay_: true }) });
      const subData = this.model;
      const serviceHandler = this.computedIsEdit ? this.$promisePut.bind(this) : this.$promisePost.bind(this);
      const res = await serviceHandler('/api/pdm/excellentProjects/request', subData, this.descriptors);
      this.$message.success(res.Message);
      return res.Data;
    }),
  },
}
```

下面是时代中国项目的出生纸模块的一个更加复杂的示例

```js
/** BirthInstructionsCreateViewModel.model.js
 * 任务执行所需数据模型
 * 具体结构参照接口 POST /api/pdm/projectTasks/{taskId}/{executionId}/taskExecutions
 * @author hyk
 * @date 2019/10/16
 */
import Validators from '@/static/js/utils@hyk/validators';
import { isNumber } from '@/static/js/utils@hyk/util';
import FieldTypeDef, { FT_CONSTS } from '../../../defs/fieldType.def';

const reDefFieldTypeDef = {};
Object.entries(FieldTypeDef).forEach(([k, v]) => {
  reDefFieldTypeDef[v] = k;
});

class FormatSelectedData {
  FormatId;
  FormatName;
  constructor() {
    this.FormatId = {
      type: String,
      required: true,
    };
    this.FormatName = {
      type: [String, null],
      required: true,
    };
  }
}

class PlanningFieldData {
  FieldId;
  FieldValue;
  FieldText;
  FieldType;
  // FieldCategory (integer, optional): 1自定义 2样板房
  FieldCategory;
  constructor(payload, key, message) {
    const fieldType = isNumber(payload.FieldType) ? reDefFieldTypeDef[payload.FieldType] : payload.FieldType;
    const isTextValue = [
      FT_CONSTS.SingleText,
      FT_CONSTS.RichText,
      FT_CONSTS.File,
      FT_CONSTS.MultiText,
    ].includes(fieldType);
    const isMultipleValue = [
      FT_CONSTS.MultiSelect,
      FT_CONSTS.Contrast,
    ].includes(fieldType);
    // 现在只做非空判断
    const errorMsg = `${message}[${payload.FieldName}]：不能为空`;

    this.FieldId = {
      type: String,
      required: true,
    };
    this.FieldValue = {
      type: [String, null],
      ifNoPropCreate: true,
      default: null,
      required: true,
      errorMsg,
      validateBeforeReplace(val) {
        if (isMultipleValue) {
          return Validators.compose(val, ['isTruthValue', 'notEmpty'], 'and');
        }
        return isTextValue || (!isTextValue && Validators.isTruthValue(val));
      },
    };
    this.FieldText = {
      type: [String, null],
      ifNoPropCreate: true,
      default: null,
      required: true,
      errorMsg,
      validateBeforeReplace(val) {
        return !isTextValue || (isTextValue && Validators.isTruthValue(val));
      },
    };
    this.FieldType = {
      type: Number,
      required: true,
      replace(val) {
        return FieldTypeDef[val];
      },
    };
    this.FieldCategory = {
      type: Number,
      required: true,
    };
  }
}

class PlanningHouseFieldData {
  SampleHousesId;
  SampleHousesName;
  HouseFields;
  constructor(payload, key, message) {
    this.SampleHousesId = {
      type: String,
      required: true,
    };
    this.SampleHousesName = {
      type: String,
      required: true,
    };
    this.HouseFields = {
      type: Array,
      required: true,
      model(val, idx) {
        return {
          type: Object,
          model: new PlanningFieldData(val, idx, message),
        };
      },
    };
  }
}

class PlanningFormatData {
  FormatId;
  FormatName;
  PlanningFields;
  PlanningHouseFields;
  constructor(payload, key, message) {
    this.FormatId = {
      type: String,
      required: true,
    };
    this.FormatName = {
      type: [String, null],
      replace(val) {
        return val || null;
      },
    };
    this.PlanningFields = {
      type: Array,
      required: true,
      model(val, idx) {
        return {
          type: Object,
          model: new PlanningFieldData(val, idx, `${message}[${payload.FormatName}][自定义字段]`),
        };
      },
    };
    this.PlanningHouseFields = {
      type: Array,
      required: true,
      model(val, idx) {
        return {
          type: Object,
          model: new PlanningHouseFieldData(val, idx, `${message}[${payload.FormatName}][样板房]`),
        };
      },
    };
  }
}

class HouseTypeInfoData {
  HouseTypeId;
  HouseTypeName;
  HouseTypeNo;
  // 户型分类（1标准/2非标/3自定义）
  HouseTypeCategory;
  TotalNumberSets;
  TotalNumberSetsRatio;
  constructor(payload, key, message) {
    const errorMsg = `${message}[${payload.HouseTypeCategory === 1 ? '标准户型' : '非标户型'}][第${+key + 1}项]`;
    this.HouseTypeId = {
      type: [String, null],
      required: true,
      errorMsg: `${errorMsg}[户型]：不能为空`,
      validator: Validators.isTruthValue,
    };
    this.HouseTypeName = {
      type: [String, null],
      required: true,
    };
    this.HouseTypeNo = {
      type: [String, null],
      required: true,
    };
    this.HouseTypeCategory = {
      type: Number,
      required: true,
    };
    this.TotalNumberSets = {
      type: [Number, String, null],
      errorMsg: `${errorMsg}[套数]：不能为空`,
      validator: Validators.isTruthValue,
    };
    this.TotalNumberSetsRatio = {
      type: [String, null],
      errorMsg: `${errorMsg}[套数比例]：不能为空`,
      validator: Validators.isTruthValue,
    };
  }
}

class HouseTypeOptionData {
  HouseTypeId;
  HouseTypeName;
  HouseTypeCategory;
  constructor() {
    this.HouseTypeId = {
      type: [String, null],
      required: true,
      errorMsg: '有户型未选择',
      validator: Validators.isTruthValue,
    };
    this.HouseTypeName = {
      type: [String, null],
      required: true,
    };
    this.HouseTypeCategory = {
      type: Number,
      required: true,
    };
  }
}

class BulidingCoreBarrelData {
  BulidingId;
  CityId;
  CityName;
  CoreBarrelId;
  CoreBarrelName;
  HouseTypeOptions;
  constructor(payload, key, message) {
    const errorMsg = `${message}[第${+key + 1}项]：`;
    this.BulidingId = {
      type: [String, null],
      required: true,
    };
    this.CityId = {
      type: [String, null],
      required: true,
      errorMsg: `${message}：请选择地区城市`,
      validator: Validators.isTruthValue,
    };
    this.CityName = {
      type: [String, null],
      required: true,
    };
    this.CoreBarrelId = {
      type: [String, null],
      required: true,
      errorMsg: `${errorMsg}请选择核心筒`,
      validator: Validators.isTruthValue,
    };
    this.CoreBarrelName = {
      type: [String, null],
      required: true,
    };
    this.HouseTypeOptions = {
      type: Array,
      required: true,
      errorMsg: `${errorMsg}有户型未选择`,
      validator() {
        return payload.HouseTypeOptions.length === payload.HouseTypeCount;
      },
      model(val, idx) {
        return {
          type: Object,
          model: new HouseTypeOptionData(val, idx, errorMsg),
        };
      },
    };
  }
}

class HouseTypeSelectedData {
  FormatId;
  FormatName;
  HouseTypeInfoes;
  BulidingCoreBarrels;
  constructor(payload, key, message) {
    this.FormatId = {
      type: String,
      required: true,
    };
    this.FormatName = {
      type: [String, null],
      replace(val) {
        return val || null;
      },
    };
    this.HouseTypeInfoes = {
      type: Array,
      required: true,
      model(val) {
        const arr = payload.HouseTypeInfoes;
        // 此处_uid需在payload中提供，只是为了标识所处序号，因为HouseTypeId可以重复
        const idx = arr.filter(p => {
          if (val.HouseTypeCategory === 1) {
            return val.HouseTypeCategory === p.HouseTypeCategory;
          }
          return [2, 3].includes(p.HouseTypeCategory);
        }).findIndex(p => p._uid === val._uid);
        return {
          type: Object,
          model: new HouseTypeInfoData(val, idx, `${message}[${payload.FormatName}]`),
        };
      },
    };
    this.BulidingCoreBarrels = {
      type: Array,
      required: true,
      errorMsg: `${message}[${payload.FormatName}]：请添加楼型`,
      validator: Validators.notEmpty,
      model(val, idx) {
        return {
          type: Object,
          model: new BulidingCoreBarrelData(val, idx, `${message}[${payload.FormatName}][楼型]`),
        };
      },
    };
  }
}
// 这里也可以导出一个构造方法
export default function (payload) {
  return {
    // 版本id
    ProductConfigurationId: {
      type: [String, null],
      required: true,
      errorMsg: '请选择出生纸版本',
      validator: Validators.isTruthValue,
    },
    // 业态列表
    Formats: {
      type: Array,
      required: true,
      errorMsg: '请选择业态',
      validator: Validators.notEmpty,
      model: {
        type: Object,
        model: new FormatSelectedData(),
      },
    },
    // 业态规划字段数据
    PlanningFormats: {
      type: Array,
      required: true,
      errorMsg: '请填写规划信息',
      // validator: Validators.notEmpty,
      model(val, idx) {
        return {
          type: Object,
          model: new PlanningFormatData(val, idx, '[规划信息]'),
        };
      },
    },
    // 业态户型选择
    HouseTypeSelectedList: {
      type: Array,
      required: true,
      errorMsg: '请填写业态户型数据',
      // validator: Validators.notEmpty,
      model(val, idx) {
        return {
          type: Object,
          model: new HouseTypeSelectedData(val, idx, '[户型选配]'),
        };
      },
    },
  };
}

```

```js
// index.vue
export default {
  methods: {
    submit: asyncFunctionErrorCatcher(async function () {
      const subData = {
        /* 构造好数据 */
      };
      const res = await this.$promisePost(/* api */, subData, BirthInstructionsCreateViewModel.call(this, subData));
      this.$message.success(res.Message);
      return res;
    }),
  },
}
```
上面这个例子，虽然看起来复杂，其实细分下去，每个结构都很清晰，而且与后台文档完全保持一致