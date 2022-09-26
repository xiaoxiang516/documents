/**
 * @author hyk
 * @description 一些基础方法。es6代码，需要polyfill。在浏览器中测试请指定script标签type=module.
 * @module Util
 */

 export const noop = () => {};
 /**
 * 获取全局对象
 * @date 2019/10/21
 * 注意：使用Function('return this')获取全局对象可能会导致CSP问题
 * 目前tc39有一个提案使用globalThis作为全局对象，但兼容性不乐观
 */
export function getGlobal() {
  if (typeof globalThis !== 'undefined') { return globalThis; }
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
}
 // 获取对象类型
 export function isType(param) {
   return Object.prototype.toString.call(param).slice(8, -1).toLowerCase();
 }
 export function isArray(arg) {
   return isType(arg) === 'array';
 }
 export function isNull(arg) {
   return isType(arg) === 'null';
 }
 /**
  * 对象宽松的判断。 不包括null和数组，但是包括HTMLElement，Date等等其他对象
  */
 export function isLooseObject(arg) {
   return typeof arg === 'object' && !isNull(arg) && !isArray(arg);
 }
 /**
  * 是否是对象，等同于 isLooseObject
  */
 export function isObject(arg) {
   // return Object.prototype.toString.call(arg) === '[object Object]';
   return isLooseObject(arg);
 }
 /**
  * 严格的对象判断
  */
 export function isStrictObject(arg) {
   return isType(arg) === 'object';
 }
 
 export function isString(arg) {
   return isType(arg) === 'string';
 }
 
 export function isNumber(arg) {
   return isType(arg) === 'number';
 }
 
 export function isBoolean(arg) {
   return isType(arg) === 'boolean';
 }
 
 export function isFunction(arg) {
   return isType(arg) === 'function';
 }
 
 export function isDate(arg) {
   return isType(arg) === 'date';
 }
 
 export function isNaN(arg) {
   // eslint-disable-next-line
   return isNumber(arg) && arg !== arg;
 }
 
 export function isUndefined(arg) {
   return isType(arg) === 'undefined';
 }
 
 export function isNullOrUndefined(arg) {
   return isNull(arg) || isUndefined(arg);
 }
 export function isSymbol(arg) {
   return isType(arg) === 'symbol';
 }
 /**
  * 是否是引用类型
  */
 export function isReferenceType(arg) {
   return isLooseObject(arg) || isArray(arg) || isFunction(arg);
 }
 export function isPrimitive(arg) {
   return !isReferenceType(arg);
 }
 /**
  * 是否是Dom元素
  * @update 2019/07/25
  * 很重要：代码全改，先前代码有很严重的bug
  */
 export function isDom(el) {
   return el === window || el === document || el instanceof HTMLElement;
 }
 /**
  * 是否继承自Object.prototype
  * @example
  *  var a = { a: 'a' } // true
  *  var b = Object.create(null) // false
  *  var function Apple() {}
  *  var apple = new Apple(); // false
  */
 export function isPlainObject(o) {
   return (isObject(o) && Object.getPrototypeOf(o) === Object.prototype);
 }
 
 /**
  * 空对象
  */
 export function isEmptyObject(o) {
   return isObject(o) && !Object.keys(o).length;
 }
 /**
  * 判断目标的长度为0。对于数组和字符串，它检查length属性，对于对象，它检查可枚举属性的数量
  * @param {string|object|array} arg
  */
 export function isEmpty(arg) {
   composeAssert(arg, [isString, isArray, isObject]);
   if (isString(arg) || isArray(arg)) {
     return !arg.length;
   }
   return isEmptyObject(arg);
 }
 /**
  * 是否是数字型数据。包含String
  * @update 2019/06/05 排除诸如[1], ['1']等会隐式转为字符'1'
  */
 export function isNumeric(num) {
   return !isArray(num) && /^[+-]?[0-9]\d*$|^[+-]?[0-9]\d*\.\d+$/g.test(num);
 }
 /**
  * 整数。包含String
  */
 export function isInteger(arg) {
   return isNumeric(arg) && Math.floor(arg) === +arg;
 }
 /**
  * 是否是浮点数。包含String
  * 基本行为与isNumeric一致
  * @update 2019/05/08 增加containInteger
  * @param {Boolean} [containInteger=false] - 是否包含整数
  */
 export function isFloatNumber(num, containInteger = false) {
   return isNumeric(num) && (containInteger || /^[+-]?[0-9]\d*\.\d+$/g.test(num));
 }
 /*#################################################*/
 
 /**
  * @namespace validatorsMap
  * @type {map}
  * @private
  */
 const CIRCULAR_STRUCTURE_TIP = 'has circular structure';
 
 const validatorsMap = new Map([
   [isArray, 'Array'],
   [isObject, 'Object'],
   [isLooseObject, 'LooseObject'],
   [isStrictObject, 'StrictObject'],
   [isPlainObject, 'PlainObject'],
   [isNull, 'Null'],
   [isUndefined, 'Undefined'],
   [isNaN, 'NaN'],
   [isString, 'String'],
   [isNumber, 'Number'],
   [isBoolean, 'Boolean'],
   [isFunction, 'Function'],
   [isDate, 'Date'],
   [isSymbol, 'Symbol'],
   [isDom, 'HTMLElement'],
   [isPrimitive, 'Primitive value'],
 ]);
 
 export function assertFactory(validator, type) {
   return function (arg, msg) {
     if (!validator(arg)) {
       throw new TypeError(msg || `Expected ${type || validatorsMap.get(validator)}`);
     }
     return true;
   }
 }
 export const assertArray = assertFactory(isArray);
 export const assertObject = assertFactory(isObject);
 export const assertLooseObject = assertFactory(isLooseObject);
 export const assertStrictObject = assertFactory(isStrictObject);
 export const assertPlainObject = assertFactory(isPlainObject);
 export const assertNull = assertFactory(isNull);
 export const assertUndefined = assertFactory(isUndefined);
 export const assertNaN = assertFactory(isNaN);
 export const assertString = assertFactory(isString);
 export const assertNumber = assertFactory(isNumber);
 export const assertBoolean = assertFactory(isBoolean);
 export const assertFunction = assertFactory(isFunction);
 export const assertDate = assertFactory(isDate);
 export const assertSymbol = assertFactory(isSymbol);
 export const assertDom = assertFactory(isDom);
 export const assertPrimitive = assertFactory(isPrimitive);
 /**
  * 断言值是否在给定列表里
  * @param {*} arg - input
  * @param {array} enums - 枚举列表
  */
 export const assertEnum = function assertEnum(arg, enums) {
   assertArray(enums);
   if (!enums.includes(arg)) {
     throw new RangeError(`input param should in [${enums.join(',')}]`);
   }
   return true;
 };
 
 /**
  * 组合使用验证器
  * @param {*} arg
  * @param {function|function[]} validator - 各种验证器
  * @param {string} [op=or] - op [and|or]
  * @param {string} [msg] - msg
  */
 export function composeAssert(arg, validator, op = 'or',  msg) {
   if (!isFunction(validator) && !isArray(validator)) {
     throw new TypeError('Expected Function or Array');
   }
   assertEnum(op, ['and', 'or']);
   const validators = isFunction(validator) ? [validator] : validator;
   const handler = op === 'and' ? Array.prototype.every : Array.prototype.some;
   const text = msg || `Expected ${validators.map(item => validatorsMap.get(item)).join(` ${op} `)}`;
   if (!handler.call(validators, invoke => invoke(arg))) {
     throw new TypeError(text);
   }
   return true;
 }
 /*###########################################*/
 
 /**
  * 是否在变量内部引用了自身
  * @add 2019/05/31
  * @param {object|array} arg
  * @param {object|array} root - 某些时候需要指定顶级入口；如 o = { s: { s1: o } };_isReferencedInsideSelf(o.s.s1, o)
  * @param {set} [stack=new Set()] - 暂存池
  * @param {object|array} rawArg - arg本身
  * @param {boolean} [containProto=false] - 是否包含原型
  */
 function _isReferencedInsideSelf(arg, root = null, stack = new Set(), rawArg, containProto = false) {
   if (rawArg === arg) {
     return true;
   }
   if (stack.has(arg) && rawArg !== arg) {
     return false;
   }
   stack.add(arg);
   const properties = isObject(arg) ? getAllKeys(arg, false) : Object.keys(arg);
   const flag = properties.some((prop) => {
     /**
      * 例如
      * const o = { s1: { s2: { s3: o } } }
      * 如果不传root，那么o.s1，o.s1.s2都是循环引用的，这显然有时不符合预期
      */
     if (root && root === arg[prop]) {
       return false;
     }
     if (isObject(arg[prop]) || isArray(arg[prop])) {
       return _isReferencedInsideSelf(arg[prop], root, stack, rawArg || arg);
     }
     return false;
   });
   if (containProto) {
     return flag || _isReferencedInsideSelf(getPrototype(arg), root, stack, rawArg || arg);
   }
   return flag;
 }
 /**
  * 是否在变量内部引用了自身
  * @add 2019/05/31
  * @param {object|array} arg
  * @param {object|array} root - 某些时候需要指定顶级入口；如 o = { s: { s1: o } };_isReferencedInsideSelf(o.s.s1, o)
  * @param {boolean} [containProto=false] - 是否包含原型
  */
 export function isReferencedInsideSelf(arg, root, containProto = false) {
   composeAssert(arg, [isObject, isArray]);
   composeAssert(root, [isObject, isArray, isNull, isUndefined]);
   return _isReferencedInsideSelf(arg, arg === root ? undefined : root, undefined, undefined, containProto);
 }
 /**
  * 是否有循环引用结构，这里偷懒直接使用JSON.stringify
  * @add 2019/05/31
  * @param {object|array} arg
  * @param {boolean} [containProto=false] - 是否包含原型
  */
 export function hasCircularStructure(arg, containProto = false) {
   composeAssert(arg, [isObject, isArray]);
   try {
     JSON.stringify(arg);
     if (containProto) {
       JSON.stringify(getPrototype(arg));
     }
   } catch (error) {
     return true;
   }
   return false;
 }
 /**
  * 获取循环引用结构
  * @add 2019/05/31
  * @param {object|array} arg
  * @param {object|array} rawArg
  * @param {string[]} [key] - 循环结构的key名
  * @param {[][]} [result] - 结果，[[[k], v]]
  * @param {boolean} [containProto=false] - 是否包含原型
  * @param {boolean} [checkReferContainProto=false] - 使用isReferencedInsideSelf判断时是否包含原型
  * @returns {[][]}
  * @private
  */
 function _getCircularStructure(arg, rawArg, key, result = [], containProto = false, checkReferContainProto = false) {
   if (isReferencedInsideSelf(arg, rawArg || arg, checkReferContainProto)) {
     result.push([key || [], arg]);
   }
   const properties = isObject(arg) ? getAllKeys(arg, false) : Object.keys(arg);
   properties.forEach((prop) => {
     if (isObject(arg[prop]) || isArray(arg[prop])) {
       const keyPath = (key || []).concat(prop);
       if (isReferencedInsideSelf(arg[prop], rawArg || arg, checkReferContainProto)) {
         result.push([keyPath, arg[prop]]);
       } else {
         _getCircularStructure(arg[prop], rawArg || arg, keyPath, result, false, checkReferContainProto);
       }
     }
   });
   if (containProto) {
     return _getCircularStructure(getPrototype(arg), rawArg || arg, ['__proto__'], result, false, checkReferContainProto);
   }
   return result;
 }
 /**
  * 获取循环引用结构
  * @add 2019/05/31
  * @param {object|array} arg
  * @param {object|array} root - 根节点对象
  * @param {boolean} [containProto=false] - 是否包含原型
  * @param {boolean} [checkReferContainProto=false] - 使用isReferencedInsideSelf判断时是否包含原型
  */
 export function getCircularStructure(arg, root, containProto = false, checkReferContainProto = false) {
   composeAssert(arg, [isObject, isArray]);
   return _getCircularStructure(arg, root, undefined, undefined, containProto, checkReferContainProto);
 }
 
 /**
  * @param {object} prototype 
  * @param {object} descriptors 
  */
 export function objectCreate(prototype, descriptors) {
   return Object.create(prototype, descriptors);
 }
 export function getPrototype(o) {
   return Object.getPrototypeOf(o);
 }
 export function typeIsArrayOrObject(arg) {
   return isType(arg) === 'object' || isType(arg) === 'array';
 }
 /**
  * 首字母大写, 其它的小写
  * @param {string} word
  */
 export function capitalize(word) {
   assertString(word);
   return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
 }
   /**
  * 第一个字母大写
  */
 export function capitalizeFirstLetter(word) {
   assertString(word);
   return word.replace(/([a-zA-Z])/, letter => letter.toUpperCase());
 }
 /**
 * 获取函数名称
 * @method getFunctionName
 * @param {Function} fn
 * @return {String}
 * @example
 * var result = getFunctionName(Object) // 'Object'
 * function A() {}
 * result = getFunctionName(A) // 'A'
 */
 export function getFunctionName(fn) {
   assertFunction(fn);
   return fn.name || fn.toString().match(/^function\s*?(\w+)\(/) || 'anonymous';
 }
 /**
  * 驼峰式命名。将aa-bb-xx 转为aaBbXx
  */
 export function camelCase(str) {
   assertString(str);
   return str.replace(/([:\-_]+(.))/g, (_, separator, letter, offset) => (offset ? letter.toUpperCase() : letter));
 }
 /**
  * 帕斯卡命名。将aa-bb-xx转为AaBbXx
  * @param {string} str - input
  */
 export function pascalCase(str) {
   assertString(str);
   return capitalizeFirstLetter(camelCase(str));
 }
 /**
  * 短折线命名。将aaBbXx 转为 aa-bb-xx
  * @update 2019/07/25
  * feat:trimHeadKebab
  * @param {boolean} trimHeadKebab - AaBbXx -》-aa-bb-xx trimHeadKebab=true则舍弃首部-字符
  */
 export function kebabCase(str, trimHeadKebab = false) {
   assertString(str);
   const res = str.replace(/([A-Z])/g, letter => (`-${letter.toLowerCase()}`));
   return trimHeadKebab ? res.replace(/^-/, '') : res;
 }
 /**
  * 对象是否有非继承属性
  * @param {object} obj
  * @param {string} prop
  * @returns {boolean}
  */
 export function hasOwn(obj, prop) {
   return Object.prototype.hasOwnProperty.call(obj, prop);
 }
/**
 * 数组填充默认数据
 * @param {array} arr - 要填充的数组
 * @param {*} fill - 填充值。如果是一个工厂函数则使用返回值。对于strictObject和数组会解除引用 
 */
export function arrayFill(arr, fill) {
  assertArray(arr);
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = isFunction(fill) ? fill(i) : deepClone(fill, true);
  }
  return arr;
}
 /**
  * 数组去重
  * 利用ES6的Set去重。
  * 引用地址相同的对象视为重复对象
  * @update 2019/05/05 支持项指定key去重
  * @param {array} arr
  * @param {string} [key]
  */
 export function arrayUnique(arr, key) {
   assertArray(arr);
   if (key) {
     const hash = [];
     const keys = [];
     arr.forEach((item) => {
       if (!keys.includes(item[key])) {
         keys.push(item[key]);
         hash.push(item);
       }
     });
     return hash;
   }
   return [...new Set(arr)];
 }
 /**
  * 对数组做并集
  * @param {Array} arr1 
  * @param {Array} arr2
  * @param {String} [key] - 如果数组的项是对象，key作为每一项的唯一标记
  * @returns {Array} - 返回一个新的数组
  */
 export function arrayUnion(arr1, arr2, key) {
   assertArray(arr1);
   assertArray(arr2);
   const arr1Keys = arr1.map(item => (key ? item[key] : item));
   return arr1.concat(arr2.filter(v => !arr1Keys.includes((key ? v[key] : v))));
 }
 /**
  * 对数组做差集
  * @param {Array} arr1 
  * @param {Array} arr2
  * @param {String} [key] - 如果数组的项是对象，key作为每一项的唯一标记
  * @returns {Array} - 返回一个新的数组
  */
 export function arrayDiffer(arr1, arr2, key) {
   assertArray(arr1);
   assertArray(arr2);
   const arr1Keys = arr1.map(item => (key ? item[key] : item));
   const arr2Keys = arr2.map(item => (key ? item[key] : item));
   return arr1.concat(arr2).filter(v => arr1Keys.includes((key ? v[key] : v))
     && !arr2Keys.includes((key ? v[key] : v)));
 }
 /**
  * 对数组做交集
  * @param {Array} arr1 
  * @param {Array} arr2
  * @param {String} [key] - 如果数组的项是对象，key作为每一项的唯一标记
  * @returns {Array} - 返回一个新的数组
  */
 export function arrayInter(arr1, arr2, key) {
   assertArray(arr1);
   assertArray(arr2);
   const arr1Keys = arr1.map(item => (key ? item[key] : item));
   const arr2Keys = arr2.map(item => (key ? item[key] : item));
   return arrayUnion(arr1, arr2, key).filter(v => arr1Keys.includes((key ? v[key] : v))
     && arr2Keys.includes((key ? v[key] : v)));
 }
 /**
  * 获取数组的补集
  * 备注：这里并没有判断arr2是否是属于arr1的（arr1是否是arr2的全集）
  * @param {Array} arr1 
  * @param {Array} arr2
  * @param {String} [key] - 如果数组的项是对象，key作为每一项的唯一标记
  * @returns {Array} - 返回一个新的数组
  */
 export function arrayComple(arr1, arr2, key) {
   assertArray(arr1);
   assertArray(arr2);
   const arr2Keys = arr2.map(item => (key ? item[key] : item));
   return arr1.filter(v => !arr2Keys.includes((key ? v[key] : v)));
 }
 /**
  * 获取对象的key名，包含不可枚举属性，不包含symbol
  * 注意此方法不会去查找原型的原型，也就是最多只查找原型链上的第一级
  * @param {object|array} obj
  * @param {boolean} [containProto=false] - 包含原型上的property，如果包含原型，可能会得到同名property
  * @return {array}
  */
 export function getPropertyNames(obj, containProto = false) {
   try {
     composeAssert(obj, [isObject, isArray]);
   } catch (error) {
     return [];
   }
   const $return = [];
   [].push.apply($return, Object.getOwnPropertyNames(obj));
   if (containProto) {
     [].push.apply(
       $return,
       Reflect.getPrototypeOf(obj)
         ? ['__proto__', ...getPropertyNames(getPrototype(obj))]
         : getPropertyNames(getPrototype(obj),
       false));
   }
   return $return;
 }
 /**
  * 获取对象或数组所有键名，包含symbol
  * 注意此方法不会去查找原型的原型，也就是最多只查找原型链上的第一级
  * @update 2019/06/01对数组也进行支持
  * @param {object|array} obj
  * @param {boolean} [containProto=false] - 如果包含原型，可能会得到同名property
  * @returns {array}
  */
 export function getAllKeys(obj, containProto = false) {
   try {
     composeAssert(obj, [isObject, isArray]);
   } catch (error) {
     return [];
   }
   const $return = [];
   [].push.apply($return, Reflect.ownKeys(obj));
   if (containProto) {
     [].push.apply(
       $return,
       Reflect.getPrototypeOf(obj)
         ? ['__proto__', ...getAllKeys(getPrototype(obj))]
         : getAllKeys(getPrototype(obj),
       false));
   }
   return $return;
 }
 /**
  * 某个对象是否存在指定命名空间，包含不可枚举类型和原型链属性，不包括symbol属性
  * 注意：原型链上的属性 a 是等价于 __proto__.a 的
  * @update 2019/06/01 对数组也进行支持
  * @param {Boolean} [containProto=false] - 是否包含原型链
  * @example
  * var o = { a: { b: 'b' }, 'b.c': 'hhhh', b: { 'c.d': 'sss' } }
  * hasNamespace('a', o) // true
  * hasNamespace('c', o) // false
  * hasNamespace('a.b', o) // true
  * hasNamespace('a.c', o) // false
  * hasNamespace('b.c', o) // true
  * hasNamespace('b.c.d', o) // true
  */
 export function hasNamespace(scheme, root, containProto = false) {
   assertString(scheme);
   composeAssert(root, [isObject, isArray]);
   const props = scheme.split('.');
   let tar = root;
   let flag = false;
 
   props.some((key, index) => {
     // 对诸如 a.b.c 属性名进行支持
     const nativeKey = props.slice(index).join('.');
     const properties = getPropertyNames(tar, containProto);
     if (properties.includes(nativeKey)) {
       // 存在类似 a.b.c 属性名
       flag = true;
       return true;
     } else if (properties.includes(key)) {
       if (index === props.length - 1) {
         flag = true;
         return true;
       }
       tar = tar[key];
     } else {
       flag = false;
       return true;
     }
     return false;
   });
   return flag;
 }
 /**
  * 返回对象指定的命名空间下的值，若其中一环某个属性值非Object则直接返回undefined
  * 包括原型链
  * @update 2019/07/17 fixbug:数组支持
  * @update 2019/06/01对数组也进行支持
  * @param {String} namespace  - 命名空间名称，用“.”相连接
  * @param {Object|array} root  - 指定根对象
  * @param {Boolean} [containProto=false]  - 是否包含原型链属性
  * @return {undefined|*}
  * @example
  *   var obj = {
  *      a:{
  *          b:{
  *              c:0
  *          }
  *      }
  *   }
  *   var b = namesapce('a.b', obj); // 返回obj.a.b
  */
 export function namespace(scheme, root, containProto = false) {
   assertString(scheme);
   composeAssert(root, [isObject, isArray]);
   const props = scheme.split('.');
   let res = root;
   props.some((key, index) => {
     // 对 诸如 a.b.c的属性名进行支持
     const nativeKey = props.slice(index).join('.');
     const properties = getPropertyNames(res, containProto);
     if (properties.includes(nativeKey)) {
       res = res[nativeKey];
       // 直接存在名如 a.b.c形式的属性
       return true;
     } else if (properties.includes(key)) {
       res = res[key];
       if (index === props.length - 1) {
         return true;
       }
     } else {
       // 不存在属性
       res = undefined;
       return true;
     }
     if (!isObject(res) && !isArray(res)) {
       // 中间环节存在非对象值
       res = undefined;
       return true;
     }
     return false;
   });
   return res;
 }
 /**
  * 获取属性路径
  * 优选选择自身属性
  * @update 2019/06/01 对数组也进行支持
  * @param {Boolean} [containProto=false] - 是否包含原型链
  * @return {Array}
  * @example
  *  o = { a: { b: 'bbbb', c: 'cccc' }, 'a.b': 'a.b-value' }
  *  namespacePath('a.b', o) // [{ depth: 1, name: 'a.b', value: 'a.b-value', exist: true, status: 'finish' }]
  *  namespacePath('a.c', o) //
  *  [
  *   { depth: 1, name: 'a', value: { b: 'bbbb', c: 'cccc' }, exist: true, status: 'pending' },
  *   { depth: 2, name: 'c', value: 'cccc', exist: true, status: 'finish' }
  *  ]
  *  namespacePath('a.c.d', o) //
  *  [
  *   { depth: 1, name: 'a', value: { b: 'bbbb', c: 'cccc' }, exist: true, status: 'pending' },
  *   { depth: 2, name: 'c', value: 'cccc', exist: true, status: 'pending' },
  *   { depth: 3, name: 'd', value: null, exist: false, status: 'finish' }
  *  ]
  *  namespacePath('a.c.d.e', o) // 在a.c.d时已经不存在属性了，status为abort，表示为中断了
  *  [
  *   { depth: 1, name: 'a', value: { b: 'bbbb', c: 'cccc' }, exist: true, status: 'pending' },
  *   { depth: 2, name: 'c', value: 'cccc', exist: true, status: 'pending' },
  *   { depth: 3, name: 'd', value: null, exist: false, status: 'abort' }
  *  ]
  */
 export function namespacePath(scheme, root, containProto = false) {
   assertString(scheme);
   composeAssert(root, [isObject, isArray]);
   // depth深度作为key
   const $o = {};
   const props = scheme.split('.');
   let res = root;
   props.some((key, index) => {
     // 对 诸如 a.b.c的属性名进行支持
     const nativeKey = props.slice(index).join('.');
     const properties = getPropertyNames(res, containProto);
     const depth = index + 1;
     $o[depth] = $o[depth] || {};
     $o[depth].depth = depth;
     $o[depth].name = key;
     if (properties.includes(nativeKey)) {
       // 直接存在名如 a.b.c形式的属性
       $o[depth].name = nativeKey;
       $o[depth].value = res[nativeKey];
       $o[depth].exist = true;
       $o[depth].status = 'finish';
       return true;
     } else if (properties.includes(key)) {
       $o[depth].value = res[key];
       $o[depth].exist = true;
       $o[depth].status = 'pending';
       if (index === props.length - 1) {
         $o[depth].status = 'finish';
         return true;
       }
       res = res[key];
     } else {
       // 不存在属性
       $o[depth].value = null;
       $o[depth].exist = false;
       $o[depth].status = (index === props.length - 1) ? 'finish' : 'abort';
       return true;
     }
     return false;
   });
   const keys = Object.keys($o).sort();
   const $return = [];
   keys.forEach((k) => {
     $return.push($o[k]);
   });
   return $return;
 }
 /**
  * @typedef {object} getNamespaceReferenceReturns
  * @property {object|array|null} lastObject
  * @property {object} object - namespace存在的话则对应的值为object[key]
  * @property {object|array|null} nextObject
  * @property {string} key - 当前正遍历的key名
  * @property {string} reached - 已遍历过的key路径
  * @property {string} unReached - 未遍历的key路径
  */
 
 
 /**
  * 获取namesapce属性引用
  * 使用此方法最好先判断属性是否存在
  * @update 2019/06/01 对数组也进行支持
  * @param {Boolean} [containProto=false] - 是否包含原型链。默认false
  * @param {Boolean} [silent=false] - 为true则不抛出属性不存在错误
  * @returns {getNamespaceReferenceReturns}
  * @example
  * o = { a: { b: 'bbbbb' } }
  * getNamespaceReference('a.b', o) // { object: { b: 'bbbb' }, key: 'b', unReached: '' }
  * getNamespaceReference('a.c.d', o) // { object: { b: 'bbbb' }, key: 'c', unReached: 'd' }
 */
 export function getNamespaceReference(scheme, root, containProto = false, silent = false) {
   assertString(scheme);
   composeAssert(root, [isObject, isArray]);
   if (!silent && !hasNamespace(scheme, root, containProto)) {
     throw new ReferenceError(`不存在对应属性 ${scheme}`);
   }
   const path = namespacePath(scheme, root, containProto);
   const $return = {
     '-1': root,
   };
   let reachedIdx = -1;
   const reached = [];
   path.forEach((item, index) => {
     if (item.exist) {
       reachedIdx = index;
       $return[index] = $return[index - 1][item.name];
       reached.push(item.name);
     }
   });
   const reachedStr = reached.join('.');
   let unReached = reachedStr ? `.${scheme}.`.replace(`.${reachedStr}.`, '') : scheme;
   if (reachedStr + unReached !== scheme) {
     if (scheme.startsWith(reachedStr)) {
       unReached = unReached.replace(/\.$/, '');
     }
     if (scheme.endsWith(reachedStr)) {
       unReached = unReached.replace(/^\./, '');
     }
   }
   const lastObject = $return[reachedIdx - 2] || null;
   const object = $return[reachedIdx - 1];
   const key = reached[reached.length - 1];
   const nextObject = (isObject($return[reachedIdx]) || isArray($return[reachedIdx])) ? $return[reachedIdx] : null;
   // namespace对应的值为object[key]
   return {
     lastObject,
     object,
     nextObject,
     key,
     reached: reachedStr,
     // 剩余未被遍历的key路径
     unReached,
   };
 };
 /**
  * 对指定key路径赋值
  * 使用此方法最好先判断属性是否存在
  * 注意：这并不能保证赋值一定成功。例如目标属性writable:false
  * @update 2019/06/01 对数组也进行支持
  * @param {Boolean} [force=false] - 如果属性不存在，则新增。不推荐。除非清楚知道目标对象结构
  * @example
  * var o = { a: 'aa', b: { b1: 'bbbb1' } }
  * setNamespaceValue('b.b1', o, 'b1值更新了'); // { a: 'aa', b: { b1: 'b1值更新了' } }
  */
 export function setNamespaceValue(scheme, root, value, containProto = false, force = false) {
   assertString(scheme);
   composeAssert(root, [isObject, isArray]);
   if (!force && !hasNamespace(scheme, root, containProto)) {
     throw new ReferenceError('不能对一个不存在的属性设值');
   }
   const $ref = getNamespaceReference(scheme, root, containProto, force);
   // 对于namspace 如 proto.a.c，如果proto.a已经不存在，proto是对象，那么最后会添加object.proto['a.c']
   // 对于namspace 如 proto.a.c，如果proto.a 不是一个对象，则什么都不做
   if ($ref.unReached && (isObject($ref.nextObject) || isArray($ref.nextObject))) {
     $ref.nextObject[$ref.unReached] = value;
   } else if ($ref.unReached) {
     console.warn(`不能添加属性 ${$ref.unReached} 到 ${$ref.nextObject}`);
   } else if (isObject($ref.object) || isArray($ref.object)) {
     $ref.object[$ref.key] = value;
   } else {
     console.warn(`不能添加属性 ${$ref.key} 到 ${$ref.object}`);
   }
 }
 /**
  * 创建一个形如 { a : { a1: '' } } 对象
  * @param {array[]} descriptors - 每项都是一个数组，arr[0]表示key名，arr[1]表示key值
  * @example
  * descriptors = [ ['a', 'aaa'], ['b.c', 'sssss'] ] // 请不要使用让人困惑的属性描述。例如 b..c 或 .b.c等
  * createNestedObject(descriptors) // 输出 { a: 'aaaa', b: { c: 'sssss' } }
  */
 export function createNestedObject(descriptors) {
   assertArray(descriptors);
   const hoster = {};
   descriptors.forEach(([k, v]) => {
     const keys = k.split('.');
     if (keys.length > 1) {
       keys.reduce((o, k1, idx1) => {
         o[k1] = isObject(hoster[k1]) ? o[k1] : {};
         o[k1] = idx1 === keys.length - 1 ? v : o[k1];
         return o[k1];
       }, hoster);
     } else {
       hoster[keys[0]] = v;
     }
   });
   return hoster;
 }
 /**
  * 深度克隆，解除引用
  * 目标： 只对strictObject和数组解除引用
  * 注意：
  * 1.对于循环引用对象抛出错误
  * 2.原型的处理只会对自己本身的原型进行处理，不处理内部属性对象的原型
  * 3.数组的原型永远是Array.prototype，并且不论copyAll是否为true，数组总是会有length属性
  * 4.舍弃set和get方法。
  * 5.没有做尾递归优化，拷贝层级深的对象，可能会出现堆栈溢出情况
  * 对于vue等框架变量是响应式的，这里舍弃set和get方法，毕竟是只关心拷贝后的值，一般只做数据备份而已
  * @update 2019/06/11 逻辑大改
  * @param {*} param - 要克隆的目标
  * @param {Boolean} [copyAll=false] - 是否克隆所有自身属性，例如不可枚举属性，Symbol属性，注意：数组的length属性总是会有的
  * @param {Boolean} [copyProto=true] - 是否复制原型，否则会使用Object.create(null)创建一个没有原型的对象;
  * @param {object} [theNewProto=null] - 当copyProto=false时，如果提供了此值则会作为新的原型
  * @returns {*}
  */
 export function deepClone(param, copyAll = false, copyProto = true, theNewProto = null) {
   // 非array或isType === 'object' 返回本身
   if (!typeIsArrayOrObject(param)) {
     return param;
   }
   const descriptors = {};
   const descriptorsArr = [];
   // copyAll=false只拷贝可遍历属性
   getAllKeys(param).forEach((k) => {
     const descriptor = Reflect.getOwnPropertyDescriptor(param, k);
     if (copyAll || (!copyAll && descriptor.enumerable)) {
       descriptors[k] = descriptor;
       descriptorsArr.push([k, descriptor]);
     }
   });
   descriptorsArr.forEach(([k, v]) => {
     if (hasOwn(v, 'value') && typeIsArrayOrObject(v.value)) {
       // 对于循环引用对象抛出错误
       if ((isObject(v.value) || isArray(v.value)) && hasCircularStructure(v.value)) {
         throw new Error(CIRCULAR_STRUCTURE_TIP);
       }
       descriptors[k].value = deepClone(v.value, copyAll, true, null);
     } else {
       if (hasOwn(v, 'get')) {
         // 舍弃get
         const getResult = v.get();
         // 对于循环引用对象抛出错误
         if ((isObject(getResult) || isArray(getResult)) && hasCircularStructure(getResult)) {
           throw new Error(CIRCULAR_STRUCTURE_TIP);
         }
         descriptors[k].value = deepClone(getResult, copyAll, true, null);
         Reflect.deleteProperty(v, 'get');
       }
       if (hasOwn(v, 'set')) {
         // 舍弃set
         Reflect.deleteProperty(v, 'set');
         // 设置可写属性
         v.configurable = true;
         v.writable = true;
       }
     }
     return true;
   });
   if (isArray(param)) {
     // 对于数组单独设置不可遍历的属性length
     descriptors.length = descriptors.length || {
       value: param.length,
       enumerable: false,
       configurable: false,
       writable: true,
     };
     return Array.from(Object.create(Array.prototype, descriptors));
   }
   const prototype = (() => {
     if (copyProto) {
       return getPrototype(param);
     } else if (theNewProto) {
       return theNewProto;
     }
     return null;
   })();
   return Object.create(prototype, descriptors);
 }
 /**
  * @description 变换对象的key名。key值支持namespace形式，如果目标key不可配置，则无法替换。不包含原型链
  * @param {Object} root - 目标对象
  * @param {Array[]} model - 二维数组。每一项为[k, v]，k表示将要被替换的root中的key，v表示将要替换成的key名
  * @param {Boolean} [silent=false] - 要替换的key不存在则提示key不存在的错误。true则忽略继续执行
  * @returns {Object}
  * @example
  * root = { a: 'a', b: 'b', c: { c1: 'c1' } } // 请不要使用让人困惑的属性描述。例如 b..c 或 .b.c等
  * tranformObjectKeys(root, [['a', 'A'], ['b', 'B'], ['c.c1', 'C1']]); // 返回：{ A: 'a', B: 'b', c: { C1: 'c1' } }
  * // 注意先后顺序
  * tranformObjectKeys(root, [['a', 'A'], ['b', 'B'], ['c': 'C'], ['c.c1', 'C1']]); // 返回：{ A: 'a', B: 'b', c: { C1: 'c1' } }
  * tranformObjectKeys(root, [['a', 'A'], ['b', 'B'], ['c.c1', 'C1'], ['c': 'C']]); // 返回：{ A: 'a', B: 'b', C: { C1: 'c1' } }
  */
 export function tranformObjectKeys(root, model, silent = false) {
   assertObject(root);
   assertArray(model);
   const hoster = root;
   model.forEach(([k, v]) => {
     const existKey = hasNamespace(k, root, false); // 不包含原型链
     if (!silent && !existKey) {
       console.warn(`${k}属性名不存在`);
     }
     if (existKey) {
       // 本身存在诸如a.b这样的属性
       if (hasOwn(hoster, k)) {
         if (hasOwn(hoster, v)) {
           console.warn(hoster, `已存在属性名${v}，忽略对此属性名${k}转换`);
         } else {
           // 先删除再创建一个新key
           // 注意：Reflect.deleteProperty和Reflec.defineProperty只会对本身属性操作
           // 如果目标key不可配置，即configurable: false, 那么不会删除此key
           const desc = Reflect.getOwnPropertyDescriptor(hoster, k);
           if (Reflect.deleteProperty(hoster, k)) {
             Reflect.defineProperty(hoster, v, desc);
           }
         }
       } else {
         // 请不要使用让人困惑的属性描述。例如 b..c 或 .b.c等
         const keys = k.split('.');
         if (keys.length > 1) {
           keys.reduce((o, k1, idx1) => {
             if (idx1 === keys.length - 1) {
               if (hasOwn(o, v)) {
                 console.warn(o, `已存在属性名${v}，忽略对此属性名${k1}转换`);
                 return false;
               }
               const desc = Reflect.getOwnPropertyDescriptor(o, k1);
               if (Reflect.deleteProperty(o, k1)) {
                 return Reflect.defineProperty(o, v, desc);
               }
               return false;
             }
             return o[k1];
           }, hoster);
         }
       }
     }
   });
   return hoster;
 }
 /**
  * 深度合并
  * @param {object|array} toMerge
  * @param {object|array} arg
  * @return {*}
  */
 export function deepMerge(toMerge, arg) {
   if (!isObject(toMerge) && !isArray(toMerge)) {
     return arg;
   }
   if (!isObject(arg) && !isArray(arg)) {
     return arg;
   }
   const merged = toMerge;
   Object.keys(arg).forEach((key) => {
     if ((isObject(toMerge[key]) && isObject(arg[key])) || ((isArray(toMerge[key]) && isArray(arg[key])))) {
       deepMerge(merged[key], arg[key]);
     } else {
       merged[key] = arg[key];
     }
   });
   return merged;
 }
 
 /**
  * 合并对象或数组,可合并多个
  * 注意这不会解除引用关系，多个对象合并则原始对象都会受到影响
  * 想返回一个全新的对象，第一个参数传空对象就行，相当于浅克隆，注意这并不能对对象里面的属性解除引用
  * 最后一个参数传Boolean可决定是否深度merge。
  * --> 例如 { a: { a1: 'a1', a2: 'a2' } } 和 { a: { a1: 'a2', a3: 'a3' }, b: 'b' }
  * --> 深度合并为 { a: { a1: 'a2', a2: 'a2', a3: 'a3' }, b: 'b' }
  * @param {Object} parent
  * @param {...any} children
  * @return {*}
  */
 export function merge(parent, ...children) {
   composeAssert(parent, [isObject, isArray]);
   const o = parent;
   if (!children || !children.length) {
     return parent;
   }
   let len = children.length;
   let deep = false; // 是否深度merge
   if (isBoolean(children[len - 1])) {
     if (len < 2) {
       return parent;
     }
     deep = children[len - 1];
     len -= 1;
   }
   for (let i = 0; i < len; i += 1) {
     if (isObject(children[i]) || isArray(children[i])) {
       Object.keys(children[i]).forEach((key) => {
         o[key] = deep
           ? deepMerge(parent[key], children[i][key])
           : children[i][key];
       });
     }
   }
   return o;
 }
 /**
  * 根据URL获取参数对象
  * 带地址参数跳转的时候，一定要 转码 encodeURIComponent
  * @param {String} url
  * @param {Boolean} [decode=true] - 是否解码
  * @param {string} [mode=query] - 模式。[query|hash]
  * query:普通的?后面的参数
  * hash:#后面字符串的参数
  * @returns {Object}
  */
 export function getRequest(url, mode = 'query', decode = true) {
   assertString(url);
   assertEnum(mode, ['query', 'hash']);
   if (mode === 'hash') {
     const hashReg = /(?:#(.+))/;
     const hashStrRes = hashReg.exec(url);
     const hashStrings = hashStrRes ? hashStrRes[1] : '';
     return getRequest(hashStrings, 'query', decode);
   }
   const urlPath = url.split('#')[0];
   const theRequest = {};
   const queryReg = /(?:\?(.+))/;
   const queryStrRes = queryReg.exec(urlPath);
   const queryStrings = queryStrRes ? queryStrRes[1] : '';
   const strs = queryStrings ? queryStrings.split('&') : [];
   for (let i = 0; i < strs.length; i += 1) {
     const arr = strs[i].split('=');
     theRequest[arr[0]] = decode && arr[1] ? decodeURIComponent(arr[1]) : arr[1];
   }
   return theRequest;
 }
 /**
  * 解析query和hash参数
  * @param {string} url - 合理的url地址
  * @param {boolean} [decode=true]
  * @returns {object}
  */
 export function urlParser(url, decode = true) {
   assertString(url);
   return {
     url,
     query: getRequest(url, 'query', decode),
     hash: getRequest(url, 'hash', decode),
   };
 }
 /**
  * 地址栏参数转换
  * @param {String} url
  * @param {Object} [extQuery] 往url中添加参数
  * @param {Array<object>} [rmQuery] 移除url中的参数，可以是正则表达式（必需为正则对象）
  * @param {Boolean} [encode=true] 是否对键值编码 默认true
  * @param {string} [mode=query] - 模式.[query|hash]
  * @return {String}
  */
 export function extendUrl(url, extQuery = {}, rmQuery = [], mode = 'query', encode = true) {
  assertString(url);
  assertObject(extQuery);
  assertArray(rmQuery);
  assertEnum(mode, ['query', 'hash']);
  const query = getRequest(url, mode, encode);
  const querys = [];
  const urlSplits = url.split('#');
  const urlPath = urlSplits[0];
  const queryReg = /(?:\?(.+))/;
  const hashReg = /(?:#(.+))/;
  const queryRes = queryReg.exec(urlPath);
  const hashRes = hashReg.exec(url);
  const hashStr = hashRes ? hashRes[1] : '';
  const hashQueryRes = queryReg.exec(hashStr);
  let queryStr = queryRes ? queryRes [1] : '';
  let hashQueryStr = hashQueryRes ? hashQueryRes[1] : '';
  const queryMark = `@query${Date.now()}@`;
  const hashQueryMark = `@hash${Date.now()}@`;
  let $url = url;
  if (queryStr) {
    $url = $url.replace(queryStr, queryMark)
  }
  if (hashQueryStr) {
    $url = $url.replace(hashQueryStr, hashQueryMark);
  }
  merge(query, extQuery);
  Object.keys(query).forEach((key) => {
    const flag = rmQuery.some((item) => {
      if (Object.prototype.toString.call(item) === '[object RegExp]') {
        return item.test(key);
      }
      return item === key;
    });
    if (!flag) {
      querys.push([`${key}=${encode ? encodeURIComponent(query[key]) : query[key]}`]);
    }
  });
  const path = querys.join('&');
  switch(mode) {
    case 'query':
      queryStr = path;
      if ($url.indexOf(queryMark) < 0) {
        $url = urlSplits[0]
          + queryMark
          + (url.indexOf('#') > -1 ? `#${urlSplits[1]}` : (urlSplits[1] || ''));
      }
      if (path && !/\?$/.test($url.split(queryMark)[0])) {
        queryStr = `?${queryStr}`;
      }
      break;
    case 'hash':
      hashQueryStr = path;
      if ($url.indexOf(hashQueryMark) < 0) {
        $url = ($url.indexOf('#') > -1 ? $url : `${$url}#`) + hashQueryMark;
      }
      if (path && !/\?$/.test($url.split(hashQueryMark)[0])) {
        hashQueryStr = `?${hashQueryStr}`;
      }
      break;
  }
  return $url.replace(queryMark, queryStr).replace(hashQueryMark, hashQueryStr);
}
 /**
  * 产生唯一标识 uuid
  *
  * @param {Number} len
  * @param {Number} _radix - 基数 2~36
  * @returns {string}
  */
 /* eslint-disable no-bitwise */
 export function generateUuid(len, _radix) {
   const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
   const uuid = [];
   let i = 0;
   const radix = _radix || chars.length;
   if (len) {
     // Compact form
     for (i = 0; i < len; i += 1) uuid[i] = chars[0 | Math.random() * radix];
   } else {
     let r;
     uuid[8] = '-';
     uuid[13] = '-';
     uuid[18] = '-';
     uuid[23] = '-';
     uuid[14] = '4';
     for (i = 0; i < 36; i += 1) {
       if (!uuid[i]) {
         r = 0 | Math.random() * 16;
         uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
       }
     }
   }
   return uuid.join('');
 }
 /**
  * 产生唯一id
  * @param {String} format - 使用大写X表示占位
  */
 export function guid(format = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX') {
   return format.replace(/X+/g, function (m) { return generateUuid(m.length, 16); });
 }
 /**
  * 转义正则表达式元字符
  */
 export function transferMetaCharacters (raw) {
   return raw.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$&");
 }
 /**
  * 获取树形数据完整路径
  * @param {Array} tree - 原始数据
  * @param {String|Number} id - 查找的节点id
  * @param {Object} props - 参数配置 { id, children }
  * @returns {Array}
  */
 export function getTreeFullPath(tree, id, props = { id: 'id', children: 'children' }) {
   assertArray(tree);
   composeAssert(id, [isString, isNumber]);
   assertObject(props);
   if (!props.id) {
     throw new Error('needs id prop');
   }
   if (!props.children) {
     throw new Error('needs children prop');
   }
   if (!tree || !tree.length) {
     return [];
   }
   const results = [];
   const flag = tree.some((item) => {
     if (item[props.id] === id) {
       results.push(item);
       return true;
     }
     const children = item[props.children];
     if (children && children.length) {
       const res = getTreeFullPath(children, id, props);
       if (res.length) {
         results.push(item);
         results.push(...res);
       }
       return res.length > 0;
     }
     return false;
   });
   return flag ? results : [];
 }
 /**
  * 根据唯一节点id查找此节点的数据
  * 深度搜索
  * @param {Array} tree - 树结构数据
  * @param {String|Number} nodeId - 要查找的节点id
  * @param {Object} props - 键名配置 { id, children }
  */
 export function getTreeNodeDataById(tree, nodeId, props = { id: 'id', children: 'children' }) {
   assertArray(tree);
   composeAssert(nodeId, [isString, isNumber]);
   assertObject(props);
   if (!props.id) {
     throw new Error('needs id prop');
   }
   if (!props.children) {
     throw new Error('needs children prop');
   }
   if (!tree || !tree.length) {
     return null;
   }
   let tar = null;
   const flag = (tree || []).some((item) => {
     if (item[props.id] === nodeId) {
       tar = item;
       return true;
     }
     if (item[props.children] && item[props.children].length) {
       tar = getTreeNodeDataById(item[props.children], nodeId, props);
     }
     return !!tar;
   });
   return flag ? tar : null;
 }
 /**
  * 模糊搜索树所有结果
  * @update 2019/05/05 添加onlyLeaf和多个label匹配
  * @param {String} label - 需要查找的节点属性，匹配多个请使用,分割
  * @param {Boolean} onlyLeaf - 默认只查找叶子节点数据
  * @returns {Array}
  */
 export function searchTreeHazily (tree, text, { label = 'label', children = 'children', onlyLeaf = true } = {}) {
   assertArray(tree);
   assertString(text);
   if (!label) {
     throw new Error('needs label prop');
   }
   if (!children) {
     throw new Error('needs children prop');
   }
   const results = [];
   (tree || []).forEach((item) => {
     const isLeaf = !item[children] || !item[children].length;
     if (isLeaf && onlyLeaf || !onlyLeaf) {
       const labels = label.split(',');
       if (labels.some(la => new RegExp(transferMetaCharacters(text), 'i').test(item[la]))) {
         results.push(item);
       }
     }
     results.push(...searchTreeHazily(item[children], text, { label, children, onlyLeaf }));
   })
   return results;
 }
 /**
  * 获取树高度
  * @date 2019/07/24
  * @param {object<>}
  * @param {string} childrenProp - 子级字段名
  * @returns {number}
  */
 export function getTreeHeight(tree, childrenProp, level = 0, height = 0) {
   assertArray(tree);
   assertString(childrenProp);
   if (tree.length) {
     level += 1;
     tree.forEach((item) => {
       const children = item[childrenProp];
       if (children && children.length) {
         height = getTreeHeight(children, childrenProp, level, height);
       }
     });
   }
   return Math.max(level, height);
 }
 /**
  * 平铺树结构数据
  * @date 2019/07/24
  * @returns {array}
  */
 export function flatTreeData(tree, childrenProp, result = []) {
   assertArray(tree);
   assertString(childrenProp);
   tree.forEach((child) => {
     result.push(child);
     const children = child[childrenProp];
     if (isArray(children)) {
       flatTreeData(children, childrenProp, result);
     }
   });
   return result;
 }
 /**
  * element-ui 级联选择器最后一级的children给空数组会显示空白列表
  * 这里将最后一级children置为null
  * @update 2019/10/30
  * childrenProp允许支持对象类型，新增对disabled字段支持
  * @date 2019/08/06
  * @param {Array<object>} tree
  * @param {string | { children: string, disabled?: any }} childrenProp
  */
 export function pruneTreeDataForElementUICascaderComponent(tree, childrenProp) {
  composeAssert(childrenProp, [isString, isObject]);
  const children = isString(childrenProp) ? childrenProp : childrenProp.children;
  const disabled = isObject(childrenProp) ?  childrenProp.disabled : undefined;
  if (!children) {
    throw new Error('[pruneTreeDataForElementUICascaderComponent] missing required children field');
  }
  if (Array.isArray(tree)) {
    tree.forEach((item) => {
      if (isFunction(disabled)) {
        Object.assign(item, { disabled: disabled(item) });
      }
      if (item[children] && item[children].length) {
        pruneTreeDataForElementUICascaderComponent(item[children], childrenProp);
      } else {
        // 级联选择器最后一级的children给空数组会显示空白列表
        Object.assign(item, { [children]: null });
      }
    });
  }
  return tree;
}
 /**
  * @description 将整数分割为对应的进制加数因子
  * @param {Number} n
  * @param {Number} radix - 2 ~ 36
  * @returns {number[]}
  * @example
  * decomposeInteger(112, 2) // [16, 32, 64]
  * decomposeInteger(112, 3) // [1, 3, 27, 81]
  * decomposeInteger(112, 8) // [48, 64]
  * decomposeInteger(112, 10) // [2, 10, 100]
  * decomposeInteger(112, 16) // [112]
  * decomposeInteger(112, 32) // [96]
  * decomposeInteger(112, 36) // [4, 108]
  */
 export function decomposeInteger(n, radix = 10) {
   if (!isInteger(n)) {
     throw new TypeError('Expected Integer')
   }
   // step1.将n转为rdix进制字符串,并转为数组，再将数组倒序
   const binaryCharArr = [...n.toString(radix)].reverse();
   // step2.计算每个字符对应的radix进制值
   const results = [];
   binaryCharArr.forEach((num, idx) => {
     const res = num * (radix ** idx);
     if (res > 0) {
       results.push(res);
     }
   });
   return results;
 }
 /**
  * fn至少执行一次，fn返回值为真值，则fn后续不再执行
  */
 export function truthFunction(fn) {
   assertFunction(fn);
   let ins = false;
   return function (...args) {
     if (!ins) {
       ins = fn.apply(this, args);
     }
     return ins;
   };
 }
 /**
  * fn至少执行一次，fn返回值为假值，则fn后续不再执行
  */
 export function falsityFunction(fn) {
   assertFunction(fn);
   let ins = true;
   return function (...args) {
     if (ins) {
       ins = fn.apply(this, args);
     }
     return ins;
   };
 }
 /**
  * 延时函数
  * @param {Number} t - 毫秒数
  * @param {function} callback
  * @returns {Object}
  */
 export function delay(t, callback) {
   let tId = null;
   let timeEnded = true;
   let resolver = null;
   return {
     start() {
       if (!tId) {
         timeEnded = false;
         tId = setTimeout(() => {
           timeEnded = true;
           if (isFunction(callback)) {
             callback();
           }
           if (resolver) {
             resolver();
           }
         }, t);
       }
       return this;
     },
     stop() {
       if (tId) {
         clearTimeout(tId);
         tId = null;
         timeEnded = true;
         resolver = null;
       }
       return this;
     },
     untilEnd() {
       return new Promise((resolve) => {
         if (timeEnded) {
           resolve();
         }
         resolver = resolve;
       });
     },
   };
 }
 /**
  * 去抖
  * 来自lodash
  * @param func {Function} 目标函数
  * @param await {Number} 间隔毫秒数
  * @param options {Object}
  * @param options.leading {Boolean} 默认false 函数在每个等待时延的开始被调用
  * @param options.trailing {Boolean} 默认true 函数在每个等待时延的结束被调用
  * @param options.maxWait {Number} 最大的等待时间，因为如果debounce的函数调用时间不满足条件，可能永远都无法触发
  */
 export function debounce(func, wait, options) {
   const nativeMax = Math.max;
   const nativeMin = Math.min;
   function toNumber(arg) {
     return +arg;
   }
   function now() {
     return Date.now();
   }
 
   let lastArgs,
     lastThis,
     maxWait,
     result,
     timerId,
     lastCallTime,
     // func 上一次执行的时间
     lastInvokeTime = 0,
     leading = false, // 函数在每个等待时延的开始被调用
     maxing = false,
     trailing = true; // 函数在每个等待时延的结束被调用
 
   // func必须是函数
   if (typeof func !== 'function') {
     throw new TypeError('debounce 需要一个function类型参数');
   }
 
   // 对间隔时间的处理
   wait = toNumber(wait) || 0;
 
   // 对options中传入参数的处理
   if (isObject(options)) {
     leading = !!options.leading;
     maxing = 'maxWait' in options;
     maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
     trailing = 'trailing' in options ? !!options.trailing : trailing;
   }
 
   // 执行要被触发的函数
   function invokeFunc(time) {
     const args = lastArgs;
     let thisArg = lastThis;
     lastArgs = lastThis = undefined;
     lastInvokeTime = time;
     result = func.apply(thisArg, args);
     return result;
   }
 
   // 在leading edge阶段执行函数
   function leadingEdge(time) {
     // Reset any `maxWait` timer.
     lastInvokeTime = time;
     // 为 trailing edge 触发函数调用设定定时器
     timerId = setTimeout(timerExpired, wait);
     // leading = true 执行函数
     return leading ? invokeFunc(time) : result;
   }
 
   // 剩余时间
   function remainingWait(time) {
     // 距离上次debounced函数被调用的时间
     const timeSinceLastCall = time - lastCallTime;
     // 距离上次函数被执行的时间
     const timeSinceLastInvoke = time - lastInvokeTime;
     // 用 wait 减去 timeSinceLastCall 计算出下一次trailing的位置
     const result = wait - timeSinceLastCall;
     // 两种情况
     // 有maxing: 比较出下一次maxing和下一次trailing的最小值，作为下一次函数要执行的时间
     // 无maxing: 在下一次trailing时执行timerExpired
     return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
   }
 
   // 根据时间判断 func 能否被执行
   function shouldInvoke(time) {
     const timeSinceLastCall = time - lastCallTime;
     const timeSinceLastInvoke = time - lastInvokeTime;
     // 几种满足条件的情况
     return (lastCallTime === undefined // 首次执行
       || (timeSinceLastCall >= wait) // 距离上次被调用已经超过 wait
       || (timeSinceLastCall < 0) // 系统时间倒退
       || (maxing && timeSinceLastInvoke >= maxWait)); //超过最大等待时间
   }
 
   // 在 trailing edge 且时间符合条件时，调用 trailingEdge函数，否则重启定时器
   function timerExpired() {
     const time = now();
     if (shouldInvoke(time)) {
       return trailingEdge(time);
     }
     // 重启定时器
     timerId = setTimeout(timerExpired, remainingWait(time));
   }
 
   // 在trailing edge阶段执行函数
   function trailingEdge(time) {
     timerId = undefined;
     // 有lastArgs才执行，
     // 意味着只有 func 已经被 debounced 过一次以后才会在 trailing edge 执行
     if (trailing && lastArgs) {
       return invokeFunc(time);
     }
     // 每次 trailingEdge 都会清除 lastArgs 和 lastThis，目的是避免最后一次函数被执行了两次
     // 举个例子：最后一次函数执行的时候，可能恰巧是前一次的 trailing edge，函数被调用，而这个函数又需要在自己时延的 trailing edge 触发，导致触发多次
     lastArgs = lastThis = undefined;
     return result;
   }
 
   // cancel方法
   function cancel() {
     if (timerId !== undefined) {
       clearTimeout(timerId);
     }
     lastInvokeTime = 0;
     lastArgs = lastCallTime = lastThis = timerId = undefined;
   }
 
   // flush方法--立即调用
   function flush() {
     return timerId === undefined ? result : trailingEdge(now());
   }
 
   function debounced() {
     const time = now();
     //是否满足时间条件
     const isInvoking = shouldInvoke(time);
     lastArgs = arguments;
     lastThis = this;
     lastCallTime = time; //函数被调用的时间
     // 无timerId的情况有两种：
     // 1.首次调用
     // 2.trailingEdge执行过函数
     if (isInvoking) {
       if (timerId === undefined) {
         return leadingEdge(lastCallTime);
       }
       if (maxing) {
         // Handle invocations in a tight loop.
         timerId = setTimeout(timerExpired, wait);
         return invokeFunc(lastCallTime);
       }
     }
     // 负责一种case：trailing 为 true 的情况下，在前一个 wait 的 trailingEdge 已经执行了函数；
     // 而这次函数被调用时 shouldInvoke 不满足条件，因此要设置定时器，在本次的 trailingEdge 保证函数被执行
     if (timerId === undefined) {
       timerId = setTimeout(timerExpired, wait);
     }
     return result;
   }
 
   debounced.cancel = cancel;
   debounced.flush = flush;
   return debounced;
 }
 /**
  * 节流
  * 来自lodash
  */
 export function throttle(func, wait, options) {
   assertFunction(func);
   let leading = true,
       trailing = true;
   if (isObject(options)) {
     leading = 'leading' in options ? !!options.leading : leading;
     trailing = 'trailing' in options ? !!options.trailing : trailing;
   }
   return debounce(func, wait, {
     leading,
     maxWait: wait,
     trailing,
   });
 }
 /**
  * 简单实现顺序预先填充参数，想要更加完善的功能请使用lodash或underscore
  * @param {function} func
  * @param  {...any} partials
  * @returns {function}
  */
 export function partial(func, ...partials) {
   assertFunction(func);
   return function (...args) {
     return func.call(this, ...partials, ...args);
   }
 }
 /**
  * 简单实现预先填充右边参数，想要更加完善的功能请使用lodash或underscore
  * @param {function} func
  * @param  {...any} partials
  * @returns {function}
  */
 export function partialRight(func, ...partials) {
   assertFunction(func);
   return function (...args) {
     return func.call(this, ...args, ...partials);
   }
 }
 /**
  * 顺序舍弃参数
  * @param {function} func
  * @param  {number} [len=1] - 要舍弃的参数个数
  * @returns {function}
  */
 export function dropParams(func, len = 1) {
   assertFunction(func);
   if (!isNumber(len)) {
     throw new TypeError('Expected Number');
   }
   return function (...args) {
     return func.apply(this, args.slice(Math.max(len, 0)));
   }
 }
 /**
  * 舍弃右边参数
  * @param {function} func
  * @param  {number} [len=1] - 要舍弃的参数个数
  * @returns {function}
  */
 export function dropRightParams(func, len = 1) {
   assertFunction(func);
   if (!isNumber(len)) {
     throw new TypeError('Expected Number');
   }
   return function (...args) {
     return func.apply(this, args.slice(0, (- Math.max(len, 0)) || args.length));
   }
 }
 /**
  * 保留指定参数位
  * @param {function} func
  * @param {number[]} [indexArr] - 要保留的参数索引列表
  * @returns {function}
  * @example
  * function A(a, b, c) {
  *  return [a, b, c];
  * }
  * const reserveA = reserveParams(A, [0, 2]); // 只保留传递的参数的0和2位置的参数
  * console.log(reserveA(1, 2, 3, 4, 5)); // [1, 3, undefined]
  */
 export function reserveParams(func, indexArr) {
   assertFunction(func);
   if (!indexArr) {
     return func;
   }
   assertArray(indexArr);
   return function(...args) {
     return func.apply(this, args.filter((item, idx) => (indexArr).includes(idx)));
   }
 }
 /**
  * 获取父级vue组件实例
  * @date 2019/07/24
  * @param {object} currentComponentIns - 当前vue组件实例
  * @param {string} componentName - $options中应指定componentName
  */
 export function getParentVueComponent(currentComponentIns, componentName) {
   let parent = currentComponentIns.$parent || currentComponentIns.$root;
   let name = parent.$options.componentName;
 
   while (parent && (!name || name !== componentName)) {
     parent = parent.$parent;
 
     if (parent) {
       name = parent.$options.componentName;
     }
   }
   return parent;
 }
 /**
  * 数字千分位展示，例如1234567.001 => 1,234,567.001
  * @date 2019/09/07
  * @param {string|number} num
  * @param {number} [fixed=2] - 小数保留位数
  */
 export function numberThousandthDisplay(num, fixed = 2) {
  if (!isFloatNumber(num)) {
    return '';
  }
  const $0 = `${(+num).toFixed(fixed)}`.split('.');
  const $1 = $0[0];
  const $2 = $0[1] || '';
  return [...[...$1].reverse().join('').replace(/\d{3}/g, '$&,')]
    .reverse().join('').replace(/^,|,$/g, '')
    + ($2 ? `.${$2}` : '');
}
 //
 export default 'MODIFY_THIS_SCRIPT_CAREFULLY';
 