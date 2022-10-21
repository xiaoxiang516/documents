// main.js
import { area, circumference } from './circle.js';
console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));



// ###
//  `阮一峰`   
//  一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，
//  就必须使用export关键字输出该变量。下面是一个 JS 文件，里面使用export命令输出变量。

