---
title: 数据验证器
---
一些常用的数据验证器  
通常配合[数据校验](modelCheck.html)使用  
想要更加强大的功能请使用[validator.js](https://github.com/chriso/validator.js)
```js
import Validators from '@/static/js/utils@hyk/validators';
```
[[toc]]

### Validators.is
is方法接收两个参数，第一个是规则或比较值，第二个是需要检测的值  
对于NaN与NaN判定为true
* @param {regexp | *} rule - 正则表达式，其他值则使用 === 比较，NaN 等于 NaN
* @param {string | *} value - 要验证的值
* @returns {boolean}

```js
  is(rule, value) {
    return rule === value || (isType(rule) === 'regexp'
      ? isString(value) && rule.test(value)
      : isNaN(rule) && isNaN(value));
  }
```

<coder module="validators" default-input="Validators.is(NaN, NaN)"></coder>

### Validators.compose
组合使用校验器，只接受单参数校验器
* @param {*} value -value
* @param {string|string[]} validators - validators中除了compose,is的其他校验器
* @param {string} [op=or] - and 或者 or
* @returns {boolean}

```js
compose(value, validators, op = 'or') {
    if (!isString(validators) && !isArray(validators) || !['and', 'or'].includes(op)) {
      return false;
    }
    let $validators = isString(validators) ? [validators] : validators;
    // 只接受单参数校验器，无法排除rest参数校验器
    const $includes = Object.keys(Validators).filter(item => Validators[item].length === 1);
    const $excludes = ['compose', 'is'];
    $validators = $validators.filter(item => $includes.includes(item) && !$excludes.includes(item));
    const $looper = op === 'and' ? Array.prototype.every : Array.prototype.some;
    return $looper.call($validators, item => Validators[item](value));
  }
```

<coder module="validators" default-input="Validators.compose(42, ['notNull', 'isInt'])"></coder>

### Validators.isEmail
检测邮箱地址
* @param {string} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isEmail('huyk@idea-group.cn')"></coder>

### Validators.isUrl
检测url地址(http://foo.com)   
包含ip地址
* @param {string} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isUrl('http://172.56.33.235:8087')"></coder>

### Validators.isIP
是否是ipv4或ipv6地址
* @param {string} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isIP('172.56.33.235')"></coder>

### Validators.isIPv4
是否是ipv4地址
* @param {string} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isIPv4('172.56.33.235')"></coder>

### Validators.isIPv6
是否是ipv6地址
* @param {string} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isIPv6('2002:ac38:21db::ac38:21db')"></coder>

### Validators.isNumeric
是否是数字型数据
* @param {string|number} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isNumeric('3.14159')"></coder>

### Validators.isInteger
校验整数  
别名isInt
* @alias isInt
* @param {string|number} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isInteger('3.14159')"></coder>

### Validators.isFloat
只校验存在小数位的数字，这里非传统意义上的float数据类型
* @param {string|number} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isFloat('3.14159')"></coder>

### Validators.isDecimal
校验所有数字，基本与isNumeric一致
* @param {string|number} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isDecimal('3.14159')"></coder>

### Validators.isPositiveNumber
是否是大于0的数字
* @param {string|number} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isPositiveNumber(-3.14159)"></coder>

### Validators.isZero
是否是等于0的数字
* @param {string|number} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isZero(-0)"></coder>

### Validators.notNull
非null值
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.notNull(123)"></coder>

### Validators.isNull
null值
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isNull(null)"></coder>

### Validators.notUndefined
非undefined值
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.notUndefined(null)"></coder>

### Validators.isUndefined
undefined值
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isUndefined(undefined)"></coder>

### Validators.isNullOrUndefined
undefined或null值
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isNullOrUndefined(undefined)"></coder>

### Validators.notNullAndUndefined
非undefined并且非null值
* @alias exist
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.notNullAndUndefined(undefined)"></coder>

### Validators.exist
notNullAndUndefined的别称
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.exist(undefined)"></coder>

### Validators.notEmpty
判断目标的长度为0。对于数组和字符串，它检查length属性，对于对象，它检查可枚举属性的数量
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.notEmpty([])"></coder>

### Validators.isEmpty
判断目标的长度为0。对于数组和字符串，它检查length属性，对于对象，它检查可枚举属性的数量
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isEmpty([])"></coder>

### Validators.isNullOrEmpty
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isNullOrEmpty([])"></coder>

### Validators.notNullAndEmpty
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.notNullAndEmpty(null)"></coder>

### Validators.isWhiteSpaceCharacters
校验是否全是空白字符
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isWhiteSpaceCharacters(' \u00a0 ')"></coder>

### Validators.isAlpha
校验字母
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isAlpha('abc123d')"></coder>

### Validators.isAlphanumeric
仅包含字母和数字
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isAlphanumeric('abc123d')"></coder>

### Validators.isMobilePhone
只校验大陆手机号
* @param {*} value - value
* @returns {boolean}

<coder module="validators" default-input="Validators.isMobilePhone('18126794925')"></coder>

### Validators.isDate
是否是日期格式  
* @param {string|date} value
* @returns {boolean}

<coder module="validators" default-input="Validators.isDate('2019-08-27')"></coder>

### Validators.isTruthValue
是否是真值  
* param {*} value 
* @returns {boolean}

<coder module="validators" default-input="Validators.isTruthValue([])"></coder>

### Validators.isFalseValue
是否是假值  
* param {*} value 
* @returns {boolean}

<coder module="validators" default-input="Validators.isFalseValue('')"></coder>