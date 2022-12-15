## ajax get
主要是接口怎么封装，url怎么处理参数，params怎么传递
<details>
    <summary>参数准备</summary>
    url：参数拼接方式
    域名写不写，
    vue配置开发、测试、生产环境（不同环境，不同命令）
    Token与特殊字符与encodeURIComponent
</details>


3.Ajax的参数

```js
$.ajax({
  url: urlUploadPart,
  type: "POST",
  data: partData, // 二进制 file.slice(start, end)
  async: true,
  processData: false,
  contentType: false,
  success: function(d){
    if (!d  || !d.data || !d.data.success){
      item.failedPartNumbers.push(partNumber);
      return
    }
    item.successAmount++
    resolve(d.data)
  },
  error:(err) => {
    item.status = 'requestErr'
    console.log('err', err)
  }
});
/**
 * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
 * @param uriComponent A value representing an encoded URI component.
 */
declare function encodeURIComponent(uriComponent: string | number | boolean): string;

let url = baseurl + `/file-service/api/file/v1/upload/uploadByBody?accesstoken=${_this.token}&`
for (const key in params) {
  url = url + key + `=${params[key] || ''}&`
}
encodeURIComponent(file.name)
```


监听数组的变化，在变化后执行某个东西
数组不可监听，那么就在每次引起数组变化的地方执行那项操作
Promise与(async (resolve, reject)
Promise.all
error: (err) => {}



### this.ajax
```js
 this.ajax({
	type: "POST",
	url: window.webConfig.baseUrl + "/api/pdm/validate/api/plat/system/verifyCode/generate",
	success: function (res) {
		let data = JSON.parse(res);
		_this.imagePath = `data:image/gif;base64,${data.Data.VerifyImage._buffer}`
		_this.verifyCodeKey = data.Data.VerifyCodeKey
	}
});

ajax() {
	function convertData(data) {
		if (typeof data === 'object') {
			var convertResult = "";
			for (var c in data) {
				convertResult += c + "=" + data[c] + "&";
			}
			convertResult = convertResult.substring(0, convertResult.length - 1);
			return convertResult;
		} else {
			return data;
		}
	}

	var ajaxData = {
		type: arguments[0].type || "GET",
		url: arguments[0].url || "",
		async: arguments[0].async || "true",
		data: arguments[0].data || null,
		dataType: arguments[0].dataType || "text",
		contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
		beforeSend: arguments[0].beforeSend || function () {},
		success: arguments[0].success || function () {},
		error: arguments[0].error || function () {}
	}
	ajaxData.beforeSend();
	var xhr = new XMLHttpRequest();

	//xhr.responseType = ajaxData.dataType;
	xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
	xhr.setRequestHeader("Content-Type", ajaxData.contentType);
	xhr.setRequestHeader("Authorization", globalConfig.authorization);

	xhr.send(convertData(ajaxData.data));
	xhr.timeout ? (xhr.timeout = 115000) : "";
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				ajaxData.success(xhr.response)
			} else {
				ajaxData.error(xhr.response)
			}
		}
	}
	xhr.ontimeout = function (event) {
		Vue.msg(this.$t('networkTimeout'));
	}

	xhr.error = function (event) {
		Vue.msg(this.$t('unknownMistake'));
	}
},

$.ajax({
	type : 'get',  //提交方式
	url : url,//路径
	contentType: "application/json;charset=UTF-8",
	//data : '',//数据，这里使用的是Json格式进行传输
	headers: {
		  "Authorization": sessionStorage.token_type + " " + sessionStorage.access_token,
		},
  success : function(result) {//返回数据根据结果进行相应的处理
	//console.log('外部链接响应',result)
	if(result.data.length > 0){
	  view.ProductFamilyList = result.data;
	}
	},
	error : function(result, errorInfo, XMLObject) {//异常返回数据根据结果进行相应的处理
	}
});
```

## $get调用
```js
this.$get('', this.params, res => {
	this.tableData = res.Rows
	this.paginationOpt.pageTotal = res.Total
})
```

```js
/**
 * description get获取数据
 * @params {String} url：链接(必填)
 * @params {Object} params：参数(可选)
 * @params {Function} success: 成功回调方法(可选)
 * @params {Function} error：失败时的回调方法(可选)
 * **/
  Vue.prototype.$get = function (url, params, success, error) {
	  <!-- xx调用函数-->
      ajaxMethod.call(this, url, params, success, error, 'get')
  }
```
```js
/** success 只有Code===0时才会执行，其他都为error**/

  function ajaxMethod (url, data, success, error, method) {
      var _this = this,
          sParams = {},
          autoCloseLoading = true,
          sSuccess = success || function () {
          },
          sError = error || function () {
          }
      if (!url) {
          console.error('请输入链接')
          return
      }

      var isUpdate = method === 'post' || method === 'put'

      if (isUpdate && !data) {
          Vue.msg('请输入参数')
          return
      }
      if (['post', 'put'].includes(method)) {
          _this.$loadingOpen({ 'background-color': 'rgba(2,2,2,0.2)'})
      } else {
          _this.$loadingOpen()
      }
      if (data) {
          if (typeof data === 'function') {
              sSuccess = data
              sError = success || sError
          } else {
              sParams = data
          }
      }

      var menuid = ''
      var route = this.$route
      var routeName
      if (route) {
          menuid = route.query.menuId || sessionStorage.getItem('activeMenuId')
          routeName = route.name
      }

  // if (sParams.autoOpenLoading !== false) {
  //   _this.$loadingOpen();
  // } else {
  //   autoCloseLoading = false;
  //   delete sParams.autoOpenLoading;
  // }

      var config = {
          headers: {
              'MenuId': menuid
          }
      }
      var arrs = []
      arrs.push(url)
      if (isUpdate) {
          _this.disabled !== undefined ? _this.disabled = true : ''
          arrs.push(sParams)
      } else if (method === 'delete') {
          arrs.push({ data: sParams })
      } else {
          config.params = sParams
      }
      arrs.push(config)

      axios[method].apply(null, arrs).then(function (data) {
          var res = data.data
          _this.$loading(false)
          if (res.Code === 999999999) {
              Vue.errorMsg(res.Message)
              sError.call(_this, res, res)
          }
          if (res.Code === 0) {
              if (method === 'get') {
                  sSuccess.call(_this, res.Data, res)
              } else {
                  sSuccess.call(_this, res, res)
              }
          } else {
      // 判断返回是否为字符串 主要考虑下载时调用获取接口会返回字符串的情况
              if (res && !(res.Code)) {
                  if (typeof (res) === 'string') {
                      sSuccess.call(_this, res)
                  } else {
                      Vue.msg(_this.$t('ajaxCallError.1'))
                  }
              }
      // if (res.Code > 0) {
      //   var resData = res.Data;
      //   var resOption;
      //   if (typeof resData === "number") {
      //    resOption = {
      //     0: resData
      //    }
      //   } else if (Array.isArray(resData)) {
      //    resOption = {};
      //    resData.forEach(function (data, index) {
      //     resOption[index] = data;
      //    });
      //   }
      //   //layer.msg(res.Message, {icon: 2});
      //   Vue.errorMsg(res.Message);
      // }
              if (typeof error !== 'function' && res.Code < 0) {
                  var errorFn = function (text1, text2, text3, text4) {
                      var dom = document.querySelector('body>.dialog-error')

                      var clickFn = function () {
                          if (!dom) {
                              return
                          }
                          dom.outerHTML = ''
                          dom.removeEventListener('click', clickFn)
                          dom = null
                      }

                      if (!dom) {
                          var div = document.createElement('div')
                          var id = 'dialog-error-id-' + Math.ceil(Math.random() * 1000000)

                          div.id = id
                          div.className = 'dialog-error'
                          div.innerHTML = '<div class="dialog-error-box"><div class="dialog-error-box-close"><i class="el-icon-close dialog-error-box-close-btn"></i></div><div class="dialog-error-box-text1"></div><div class="dialog-error-box-text2"></div><div class="dialog-error-box-text3"></div><div class="dialog-error-box-text4"></div></div>'
                          document.body.appendChild(div)
                          dom = document.getElementById(id)

                          dom.querySelector('.dialog-error-box-close').addEventListener('click', clickFn, false)
                      }

                      dom.querySelector('.dialog-error-box-text1').innerText = text1
                      dom.querySelector('.dialog-error-box-text2').innerText = text2
                      dom.querySelector('.dialog-error-box-text3').innerText = text3
                      dom.querySelector('.dialog-error-box-text4').innerText = text4

                      setTimeout(function () {
                          clickFn()
                      }, 60000)
                  }
                  errorFn('系统错误', '请联系：李燕【liyan476】【18790129880】', '梁子厚【liangzihou】【13926128469】', '陈容容【chenrongrong14】【18061883502】')
        // Vue.errorMsg("系统错误，请联系管理员");
        // this.$waringTips("系统错误，请联系管理员", ".form-error-tips");
              }
              sError.call(_this, res)
          }

          _this.$loadingClose()
          _this.disabled !== undefined ? _this.disabled = false : ''
          autoCloseLoading && _this.$loadingClose()
      }).catch(function (err) {
          error403.call(_this, err)
          sError.call(_this, err)
          _this.$loadingClose()
          _this.$loading(false)
          _this.disabled !== undefined ? _this.disabled = false : ''
          autoCloseLoading && _this.$loadingClose()
      })
  }
```

## $promiseGet

```js
Vue.prototype.$promiseGet = requestTypeFactory('get');

this.$promiseGet(`/api/plat/categories/${this.value}/hasNewDrawFile`)
	.then((res) => {
	 
	});
	
function requestTypeFactory(type) {
	return function(url, data, model) {
		return new Promise((resolve, reject) => {
			let flag = true;
			const $data = (() => {
				if (model) {
					try {
						return modelCheck(data, model);
					} catch (error) {
						reject(errorHandler(error));
						flag = false;
					}
				}
				return data;
			})();
			if (!flag) {
				return false;
			}
			if (debug) {
				console.log(`[promiseRequest:${type.toUpperCase()}]`, url, $data);
			}
			Vue.prototype[`$${type}`].call(this, url, deepClone($data), function(resData, res) {
				resolve(res, resData);
			}, function(error) {
				reject(errorHandler(error));
			});
			return true;
		});
	};
};	


/**
 * @param {object} payload
 * @param {...Model} model - 对payload进行检测的数据模型描述
 * @param {boolean} [cloneData=true] - 默认:true;是否克隆payload数据
 * @param {boolean} [onlyModelDesciprtors=true] - 默认:true;指定为true，则只返回model中定义的key值
 * @param {boolean} [warnAsError=true] - 默认:true;是否将警告以错误抛出
 * @param {function} [errorReceiver=null] - (Error) => any // 注入外部方法来接收错误信息
 * @returns {object}
 */
export default function modelCheck (payload, model, {
  onlyModelDesciprtors = true,
  cloneData = true,
  warnAsError = true,
  errorReceiver = null,
} = {}) {
  if (!isObject(payload) && !isArray(payload)) {
    throw new TypeError('Expected Object or Array');
  }
  if (!isObject(model)) {
    throw new TypeError('Expected Object');
  }
  const options = {
    onlyModelDesciprtors,
    cloneData,
    warnAsError,
    errorReceiver,
  };
  // 对payload是数组的情况也进行支持
  if (isArray(payload)) {
    return modelCheck({ 0: payload }, { 0: model }, options)[0];
  }
  // 解除引用
  const data = cloneData ? deepClone(payload) : payload;
  Object.entries(model).forEach(([k, v]) => {
    const defaultArg = {
      required: false,
      type: [],
      default: undefined,
      ifNoPropCreate: false,
      // replace?: any,
      // model?: object,
      // validateBeforeReplace?: (value, key) => any
      // validator?: (value, key) => any,
      // errorMsg?: string|error,
      // remove?: boolean, // only for array model
    };
    if (isObject(v)) {
      defaultArg.required = isFunction(v.required) ? v.required() : !!v.required;
      defaultArg.type = getType(v.type, warnAsError, errorReceiver);
      defaultArg.default = isFunction(v.default) ? v.default() :  v.default;
      defaultArg.ifNoPropCreate = !!v.ifNoPropCreate;
      // 如果有replace字段则将其加入到defaultArg
      if (hasNamespace('replace', v)) {
        defaultArg.replace = v.replace;
      }
      if (hasNamespace('validateBeforeReplace', v)) {
        defaultArg.validateBeforeReplace = v.validateBeforeReplace;
      }
      if (hasNamespace('validator', v)) {
        defaultArg.validator = v.validator;
      }
      if (hasNamespace('errorMsg', v)) {
        defaultArg.errorMsg = v.errorMsg;
      }
    } else {
      // 认为是默认值
      // defaultArg.default = isFunction(v) ? v() :v;
      // defaultArg.type = ['*'];

      // 默认是类型
      defaultArg.type = getType(v, warnAsError, errorReceiver);
    }
    let isExistKey = hasNamespace(k, data, false); // 排除原型链属性
    if (!defaultArg.ifNoPropCreate && defaultArg.required && !isExistKey) {
      // throw new ReferenceError(`${k} is required`);
      warn(`property ${k} is required`, warnAsError, errorReceiver);
    }
    let valueToCheck = defaultArg.default;
    if (isExistKey) {
      const $ref = getNamespaceReference(k, data);
      valueToCheck = $ref.object[$ref.key];
    }
    if (isUndefined(valueToCheck)) {
      valueToCheck = defaultArg.default;
    }
    // 在replace前验证数据有效性
    if (isFunction(defaultArg.validateBeforeReplace)) {
      validate(defaultArg.validateBeforeReplace, {
        value: valueToCheck,
        key: k,
        errorMsg: defaultArg.errorMsg,
        errorReceiver,
      });
    }
    if (hasNamespace('replace', defaultArg)) {
      valueToCheck = isFunction(defaultArg.replace) ? defaultArg.replace(valueToCheck, k) : defaultArg.replace;
    }
    typeCheck(k, valueToCheck, defaultArg.type, warnAsError, errorReceiver);
    if (isExistKey) {
      setNamespaceValue(k, data, valueToCheck);
    } else if (defaultArg.ifNoPropCreate) {
      setNamespaceValue(k, data, valueToCheck, false, true);
    }
    isExistKey = hasNamespace(k, data, false);
    if (defaultArg.required && !isExistKey) {
      // throw new ReferenceError(`${k} is required`);
      warn(`property ${k} is required`, warnAsError, errorReceiver);
    }
    // 如果存在model字段描述，可以是object和function
    if (isObject(v.model) || isFunction(v.model)) {
      const $model = isFunction(v.model) ? v.model(valueToCheck, k) : v.model;
      if (isArray(valueToCheck)) {
        const itemsToRemove = [];
        for (let i = 0; i < valueToCheck.length; i += 1) {
          const itemModel = isFunction(v.model) ? v.model(valueToCheck[i], i) : v.model;
          // 如果有remove字段标识，则数组此项会被移除
          if (itemModel.remove) {
            itemsToRemove.push(i);
          } else {
            // 对数组的每一项使用model描述进行验证
            valueToCheck[i] = modelCheck({ [i]: valueToCheck[i] }, { [i]: itemModel }, options)[i];
          }
        }
        valueToCheck = valueToCheck.filter((item, idx) => !itemsToRemove.includes(idx));
      } else if (isObject(valueToCheck)) {
        valueToCheck = modelCheck(valueToCheck, $model, options);
      }
      if (hasNamespace(k, data, false)) {
        setNamespaceValue(k, data, valueToCheck);
      }
    }
    // 验证数据有效性
    if (isFunction(defaultArg.validator)) {
      validate(defaultArg.validator, {
        value: valueToCheck,
        key: k,
        errorMsg: defaultArg.errorMsg,
        errorReceiver,
      });
    }
  });
  // 只使用model中定义的key
  if (onlyModelDesciprtors) {
    const tData = [];
    Object.keys(model).forEach((key) => {
      if (hasNamespace(key, data, false)) {
        const $ref = getNamespaceReference(key, data);
        const value = $ref.object[$ref.key];
        tData.push([key, value]);
      }
    });
    return createNestedObject(tData);
  }
  return data;
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
```