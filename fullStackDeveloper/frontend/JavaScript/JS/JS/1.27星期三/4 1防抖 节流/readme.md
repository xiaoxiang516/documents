```javascript
export default {
  watch: {
    maxSaleRatios(val) {
      this.debounce(this.searchData, 500);
    },
  },
  methods: {
    // 防抖
    debounce(fn, wait) {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(fn, wait);
    },
  },
};
```

```javascript
// commonMethods.js文件
/**
 * 函数防抖 (只执行最后一次操作)
 * @param fn    // 延时调用函数
 * @param wait  // 等待多长时间执行
 * @returns {Function}
 * @constructor
 */
export function debounce(fn, wait) {
  var timer = null;
  return function () {
    var args = arguments;
    // var context = args.length ? args[0]: this  //如果传了this参数过来就用第一个参数作为this
    var context = this;
    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}
```

### debounce

去抖  
来自 lodash

- @param {Function} func - 目标函数
- @param {Number} await - 间隔毫秒数
- @param {Object} options
- @param {Boolean} options.leading - 默认 false 函数在每个等待时延的开始被调用
- @param {Boolean} options.trailing - 默认 true 函数在每个等待时延的结束被调用
- @param {Number} options.maxWait - 最大的等待时间，因为如果 debounce 的函数调用时间不满足条件，可能永远都无法触发

```js
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
  if (typeof func !== "function") {
    throw new TypeError("debounce 需要一个function类型参数");
  }

  // 对间隔时间的处理
  wait = toNumber(wait) || 0;

  // 对options中传入参数的处理
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing
      ? nativeMax(toNumber(options.maxWait) || 0, wait)
      : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
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
    return (
      lastCallTime === undefined || // 首次执行
      timeSinceLastCall >= wait || // 距离上次被调用已经超过 wait
      timeSinceLastCall < 0 || // 系统时间倒退
      (maxing && timeSinceLastInvoke >= maxWait)
    ); //超过最大等待时间
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
```

<coder module="util" default-input="var acc = 0;
var debounced = debounce(() => {
  acc += 1;
}, 2e2);
debounced();
debounced();
debounced();
setTimeout(() => {
  alert(acc);
}, 2e2);">
</coder>

### throttle

节流  
来自 lodash

- @param {Function} func - 目标函数
- @param {Number} await - 间隔毫秒数
- @param {Object} options
- @param {Boolean} options.leading - 默认 false 函数在每个等待时延的开始被调用
- @param {Boolean} options.trailing - 默认 true 函数在每个等待时延的结束被调用
- @param {Number} options.maxWait - 最大的等待时间，因为如果 debounce 的函数调用时间不满足条件，可能永远都无法触发

```js
export function throttle(func, wait, options) {
  assertFunction(func);
  let leading = true,
    trailing = true;
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  });
}
```

<coder module="util" default-input="var acc = 0;
var throttled = throttle(() => {
  acc += 1;
}, 2e2);
throttled();
throttled();
throttled();
setTimeout(() => {
  alert(acc);
}, 2e2);"></coder>
