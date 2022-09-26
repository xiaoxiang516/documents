---
title: device.js
---
判断运行环境
```js
import Device, { getEnvInfo } from '@/static/js/utils@hyk/device';
```
[[toc]]

### Device.isAndroidPhone
是否是安卓手机
* {boolean}

### Device.isAndroidTablet
是否是安卓平板
* {boolean}

### Device.isAndroid
是否是安卓系统
* {boolean}

### Device.isIos
是否是ios系统
* {boolean}

### Device.isIpad
是否是ipad
* {boolean}

### Device.isIosPhone
是否是苹果手机
* {boolean}

### Device.isWindowsPhone
是否是windowsPhone手机
* {boolean}

### Device.isTablet
isAndroidTablet || isIpad
* {boolean}

### Device.isPhone
isAndroidPhone || isIosPhone || isWindowsPhone
* {boolean}

### Device.isDevice
isPhone || isTablet
* {boolean}

### Device.isDesktop
!isPhone && !isTablet
* {boolean}

### Device.isFirefox
是否是火狐浏览器
* {boolean}

### Device.isSafari
是否是safari浏览器
* {boolean}

### Device.isOpera
是否是opera浏览器
* {boolean}

### Device.isIE11
是否是ie11
* {boolean}

### Device.isIE
是否是ie浏览器
* {boolean}

### Device.isEdge
是否是edge浏览器
* {boolean}

### Device.isChrome
是否是chrome浏览器
* {boolean}

### Device.isPortrait
是否竖屏
* {boolean}

### Device.isLandscape
是否横屏
* {boolean}

### Device.androidVersion
安卓系统版本
* {number|boolean}

### Device.iosVersion
ios系统
* {number|boolean}

### Device.isWeixin
是否是微信环境
* {boolean}

### Device.isWindowsWeixin
是否是桌面版微信
* {boolean}

### Device.isMQQ
是否是移动版QQ浏览器
* {boolean}

### Device.isWeibo
微博环境
* {boolean}

### Device.isTXWeibo
腾讯微博
* {boolean}

<coder module="device" default-input="getEnvInfo()"></coder>