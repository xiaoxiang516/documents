---
title: dom.js
---
一些对dom元素操作的方法
```js
import { 方法名 } from '@/static/js/utils@hyk/dom';
```
[[toc]]

### createElement
创建dom元素
* @param {string} tag - 标签名
* @param {object} attrs - 属性
* @param {...htmlelement|string} children - 子级元素

```js
export function createElement(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (let prop of Object.keys(attrs)) {
    if (prop === 'style') {
      setStyle(el, attrs[prop]);
    } else {
      el.setAttribute(kebabCase(prop), attrs[prop]);
    }
  }
  for (let child of children) {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    } else if (Array.isArray(child)) {
      const frag = document.createDocumentFragment();
      for (let greatChild of child) {
        if (typeof greatChild === 'string') {
          greatChild = document.createTextNode(greatChild);
        }
        frag.appendChild(greatChild);
      }
      child = frag;
    }
    el.appendChild(child);
  }
  return el;
}
```
<coder module="dom" default-input="var div = createElement('div', {
  style: {
    color: 'red',
    fontSize: '16px',
  },
},
[
  createElement('span', {
    class: 'div-text',
  }, '这是一个div元素'),
]);
alert(div.querySelector('.div-text').textContent)"></coder>

### removeElement
移除dom元素
* @param {htmlelement|String} ele
* @param {htmlelement} [root=document] - 根节点
* @param {Boolean} [loop=false] - 是否移除所有的找到的dom节点
```js
export function removeElement(ele, root = document, loop = false) {
  composeAssert(ele, [isString, isDom]);
  const $eles = isDom(ele)
    ? [ele]
    : (loop ? root.querySelectorAll(ele) : [root.querySelector(ele)]);
  [].slice.call($eles).forEach((node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
},
createElement('span', { class: 'remove-div--span-1' }, 'text1'),
createElement('span', { class: 'remove-div--span-2' }, 'text2'));
removeElement('.remove-div--span-1', div);
alert(div.querySelector('.remove-div--span-1'))"></coder>

### show
显示元素
* @param {htmlelement} el

```js
export function show(el) {
  el.style.display = '';
}
```
### hide
隐藏元素
* @param {htmlelement} el

```js
export function hide(el) {
  el.style.display = 'none';
}
```
### isDom
是否是Dom元素
* @param {any} el

```js
export function isDom(el) {
  return el === window || el === document || el instanceof HTMLElement;
}
```
<coder module="dom" default-input="isDom(document.createElement('div'))"></coder>

### isVNode
是否是isVNode对象
* @param {any} el

```js
export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
}
```
### isListenerSurpportPassive
addEventListener 是否支持passive

```js
export function isListenerSurpportPassive() {
  // eslint-disable-next-line
  let supportsOption = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get() {
        supportsOption = true;
      }
    }));
  } catch(e) {}
  return supportsOption;
}
```
<coder module="dom" default-input="isListenerSurpportPassive()"></coder>

### isListenerSurpportOnce
addEventListener 是否支持once

```js
export function isListenerSurpportOnce() {
  // eslint-disable-next-line
  let supportsOption = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, 'once', {
      get() {
        supportsOption = true;
      }
    }));
  } catch(e) {}
  return supportsOption;
}
```
<coder module="dom" default-input="isListenerSurpportOnce()"></coder>

### transformToDom
将字符串转为dom元素  
如果参数html不是有效的dom结构则会生成文本节点，这时会返回一个div包裹的dom元素
* @param {string} html
* @return {htmlelement}
```js
export function transformToDom(html) {
  const wrap = document.createElement('div');
  const fragment = document.createDocumentFragment();

  wrap.innerHTML = html;
  fragment.appendChild(wrap);
  const $first = fragment.firstChild;
  return $first.firstChild.nodeType !== 1 ? $first : $first.firstChild;
}
```
<coder module="dom" default-input="var html = transformToDom('<div><p>这是一段文字</p></div>');
alert(html.outerHTML)"></coder>

### event
事件方法
```js
export const event = {
export const event = {
  /**
   * 监听事件
   * @method on
   * @param {htmlElement} el - 需绑定元素
   * @param {string} event - 绑定事件名称
   * @param {function} handler - 事件执行函数
   * @param {object|boolean} [option={}] - addEventListener的第三个option参数 { capture: false, passive: false, once: false }
   */
  on(el, event, handler, option = {}) {
    assertDom(el);
    assertString(event);
    assertFunction(handler);
    return el.addEventListener(event, handler, option);
  },
  /**
   * 取消监听事件
   * 注意如果捕获型事件和冒泡型事件分别注册了，需要分别移除，两者互不干扰
   * @method off
   * @param {htmlElement} el - element元素
   * @param {stirng} event - 绑定事件名称
   * @param {function} handler - 回调函数
   * @param {boolean} [useCapture=false] 是否是捕获型
   */
  off(el, event, handler, useCapture = false) {
    assertDom(el);
    assertString(event);
    assertFunction(handler);
    return el.removeEventListener(event, handler, useCapture);
  },
  /**
   * 只绑定一次监听事件
   * @method once
   * @param {htmlElement} el - 需绑定元素
   * @param {string} event - 绑定事件名称
   * @param {function} handler - 事件执行函数
   * @param {object|boolean} [option={}] - addEventListener的第三个option参数 { capture: false, passive: false, once: false }
   */
  once(el, event, handler, option = {}) {
    const that = this;
    const listener = function listener(...args) {
      handler.apply(this, args);
      that.off(el, event, listener, isPlainObject(option) ? option.capture : option);
    }
    that.on(el, event, listener, option);
  },
};
```
### event.on
* 监听事件
* @method on
* @param {htmlElement} el - 需绑定元素
* @param {string} event - 绑定事件名称
* @param {function} handler - 事件执行函数
* @param {object|boolean} [option={}] - addEventListener的第三个option参数 { capture: false, passive: false, once: false }
### event.off
* 取消监听事件
* 注意如果捕获型事件和冒泡型事件分别注册了，需要分别移除，两者互不干扰
* @method off
* @param {htmlElement} el - element元素
* @param {stirng} event - 绑定事件名称
* @param {function} handler - 回调函数
* @param {boolean} [useCapture=false] 是否是捕获型
### event.once
* 只绑定一次监听事件
* @method once
* @param {htmlElement} el - 需绑定元素
* @param {string} event - 绑定事件名称
* @param {function} handler - 事件执行函数
* @param {object|boolean} [option={}] - addEventListener的第三个option参数 { capture: false, passive: false, once: false }

### hasClass
判断元素是否有某个className  
* @param {htmlelement} el
* @param {string} cls - 要判断的className
* @return {boolean}
```js
export function hasClass(el, cls) {
  assertDom(el);
  assertString(cls);
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className do not contains whitespace');
  }
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (` ${el.className} `).indexOf(` ${cls} `) > -1;
  }
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
});
hasClass(div, 'class2')"></coder>

### addClass
给元素添加className，添加多个类使用空格隔开
* @param {htmlelement} el
* @param {string} cls - 类名称
```js
export function addClass(el, cls) {
  assertDom(el);
  assertString(cls);
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i += 1) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ` ${clsName}`;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
});
addClass(div, 'class3 class4 class5');
alert(div.getAttribute('class'))"></coder>

### removeClass
移除元素className
* @param {htmlelement} el
* @param {string} cls - 类名称
```js
export function removeClass(el, cls) {
  assertDom(el);
  assertString(cls);

  if (cls.indexOf(' ') !== -1) {
    throw new Error('className do not contains whitespace');
  }
  const classes = cls.split(' ');
  let curClass = ` ${el.className} `;

  for (let i = 0, j = classes.length; i < j; i += 1) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(` ${clsName} `, ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = curClass.trim();
  }
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
});
removeClass(div, 'class2');
alert(div.getAttribute('class'))"></coder>

### toggleClass
存在class名则移除，否则添加
* @param {htmlelement} el
* @param {string} cls - 类名称
* @param {boolean} force 跟标准保持一致，为true则添加，为false则移除
```js
export function toggleClass(el, cls, force) {
  assertDom(el);
  assertString(cls);
  if (force === undefined) {
    if (hasClass(el, cls)) {
      removeClass(el, cls);
    } else {
      addClass(el, cls);
    }
  } else if (force) {
    addClass(el, cls);
  } else if (!force) {
    removeClass(el, cls);
  }
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
});
toggleClass(div, 'class2', true);
alert(div.getAttribute('class'))"></coder>

### getStyle
获取元素某个样式  
优先使用计算值，意味着如果使用document.createElement创建元素，但是没有append到页面中去是获取不到元素的宽高等信息的
* @param {htmlElement} el
* @param {string} styleName 样式名称
* @return {String|Number|Null}
```js
export function getStyle(el, styleName) {
  assertDom(el);
  assertString(styleName);
  const stylePro = styleName === 'float' ? 'cssFloat' : camelCase(styleName);
  const style = el.style[stylePro];
  try {
    const computed = document.defaultView.getComputedStyle(el, null);
    return computed ? computed[stylePro] : style;
  } catch (e) {
    return style;
  }
}
```
<coder module="dom" default-input="
alert(getStyle(document.body, 'width'))"></coder>

### setStyle
获取元素某个样式
* @param {htmlelement} el
* @param {String|Object} styleName - 样式名称。可使用对象.例如 { width: '100px' }，此时会忽略value参数
* @param {any} value - 设置值
```js
export function setStyle(el, styleName, value) {
  assertDom(el);
  composeAssert(styleName, [isString, isPlainObject]);

  if (isPlainObject(styleName)) {
    Object.entries(styleName).forEach(([k, v]) => {
      setStyle(el, k, v);
    });
  } else {
    styleName = camelCase(styleName)
    el.style[styleName] = value;
  }
  return true;
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
});
setStyle(div, { width: '200px', height: '100px' });
document.body.appendChild(div);
alert(getStyle(div, 'width'));
document.body.removeChild(div);"></coder>

### getDom
获取dom元素
* @param {string|htmlelement} arg
* @param {htmlelement} [root=document] - 根节点
```js
export function getDom(arg, root = document) {
  if (isDom(arg)) {
    return arg;
  } else if (isString(arg)) {
    const dom = root.querySelector(arg);
    if (!dom) {
      throw new Error(`${arg} not exist in the given root node`);
    }
    return dom;
  }
  throw new TypeError('Expected HTMLElement or valid selector');
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
},
createElement('span', { class: 'remove-div--span-1' }, 'text1'),
createElement('span', { class: 'remove-div--span-2' }, 'text2'));
alert(getDom('.remove-div--span-2', div).textContent)"></coder>

### getParentNode
获取一个元素的父元素  
如果父元素是一个shadow root，则返回父元素的host element  
如果父元素是一个插槽，则返回插槽的父元素
* @param {Node} - node The node whose parent to get.
* @return {Node|null} - The parent node or null if no parent exists.
```js
export function getParentNode(node) {
  const parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  if (parent && parent.assignedSlot) {
    // If the parent is distributed in a <slot>, return the parent of a slot.
    return parent.assignedSlot.parentNode;
  }

  return parent;
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
},
createElement('span', { class: 'remove-div--span-1' }, 'text1'),
createElement('span', { class: 'remove-div--span-2' }, 'text2'));
console.log(getParentNode(document.body));"></coder>

### containsDeep
检查一个父级元素是否包含某个元素
* @param {Node} parent The parent element.
* @param {Node} child The child element.
* @return {boolean} True if the parent node contains the child node.
```js
  export function containsDeep(parent, child) {
    assertDom(parent);
    assertDom(child);
    let node = child;
    while (node) {
      if (node === parent) return true;
  
      node = getParentNode(node);
    }
    return false;
  }
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
},
createElement('span', { class: 'remove-div--span-1' }, 'text1'),
createElement('span', { class: 'remove-div--span-2' }, 'text2'));
containsDeep(div, div.querySelector('.remove-div--span-2'))"></coder>

### getBoundingClientRect
对element.getBoundingClientRect作兼容处理
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
```js
export function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
}0;
getBoundingClientRect(div)"></coder>

### getOffset
获取ele1相对于ele2的距离
* @param {string|htmlelement} ele1
* @param {string|htmlelement} ele2
* @returns {object} distance
* @returns {number} distance.x
* @returns {number} distance.y
```js
export function getOffset(ele1, ele2) {
  const $ele1 = getDom(ele1);
  const $ele2 = getDom(ele2);
  const bcr1 = getBoundingClientRect($ele1);
  const bcr2 = getBoundingClientRect($ele2);
  return {
    x: bcr1.left - bcr2.left,
    y: bcr1.top - bcr2.top,
  };
}
```
<coder module="dom" default-input="getOffset(document.body, document)"></coder>

### isVisible
ele1是否处于ele2的可视区域中
* @param {string|htmlelement} ele1
* @param {string|htmlelement} ele2
* @returns {boolean}
```js
export function isVisible(ele1, ele2 = document.documentElement) {
  const $ele1 = getDom(ele1);
  const $ele2 = getDom(ele2);
  const bcr1 = getBoundingClientRect($ele1);
  const bcr2 = getBoundingClientRect($ele2);
  return bcr1.left >= bcr2.left
    && bcr1.right <= bcr2.right
    && bcr1.top >= bcr2.top
    && bcr1.bottom <= bcr2.bottom;
}
```
<coder module="dom" default-input="isVisible(document.body, document.documentElement)"></coder>

### isPartialVisible
ele1是否部分处于ele2的可视区域中
* @param {string|htmlelement} ele1
* @param {string|htmlelement} ele2
* @returns {boolean}
```js
export function isPartialVisible(ele1, ele2 = document.documentElement) {
  const $ele1 = getDom(ele1);
  const $ele2 = getDom(ele2);
  const bcr1 = getBoundingClientRect($ele1);
  const bcr2 = getBoundingClientRect($ele2);
  return bcr1.left >= bcr2.left && bcr1.left < bcr2.right
    || bcr1.right <= bcr2.right && bcr1.right > bcr2.left
    || bcr1.top >= bcr2.top && bcr1.top < bcr2.bottom
    || bcr1.bottom <= bcr2.bottom && bcr1.bottom > bcr2.top;
}
```
<coder module="dom" default-input="isVisible(document.body, document.documentElement)"></coder>

### getPreviousElementSibling
获取上一个兄弟元素
* @param {Node} ele
```js
export function getPreviousElementSibling(ele) {
  if(ele.previousElementSibling !== undefined) {
    // IE9+,Chrome,firefox..
    return ele.previousElementSibling;
  }
  var item = ele.previousSibling ;
  // IE8-
  while(item && item.nodeType !== 1) {
    item = item.previousSibling ;
  }
  return item;
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
},
createElement('span', { class: 'remove-div--span-1' }, 'text1'),
createElement('span', { class: 'remove-div--span-2' }, 'text2'));
alert(getPreviousElementSibling(getDom('.remove-div--span-2', div)).textContent)"></coder>

### getNextElementSibling
获取下一个兄弟元素
* @param {Node} ele
```js
export function getNextElementSibling(ele) {
  if(ele.nextElementSibling !== undefined) {
    // IE9+,Chrome,firefox..
    return ele.nextElementSibling;
  }
  var item = ele.nextSibling ;
  // IE8-
  while(item && item.nodeType !== 1) {
    item = item.nextSibling ;
  }
  return item;
}
```
<coder module="dom" default-input="var div = createElement('div', {
  class: 'class1 class2 class3',
},
createElement('span', { class: 'remove-div--span-1' }, 'text1'),
createElement('span', { class: 'remove-div--span-2' }, 'text2'));
alert(getNextElementSibling(getDom('.remove-div--span-1', div)).textContent)"></coder>