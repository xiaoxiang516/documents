// yield 表达式参与运算（难点）
// yield后面的表达式如果很长要加小括号; yield整个表达式如果参与运算要用小括号括起来

function* test(x) {
	let y = 2 * (yield ( x + 1));
	let z = yield (y / 3);
	console.log(`x=${x}, y=${y}, z=${z}`);
	return x+y+z;
}
let testGe = test(5);
console.log(testGe.next());	//第一次不用参数
console.log(testGe.next(12));
console.log(testGe.next(13));

// 总结:	next函数的参数决定了上一次yield表达式的值，第一次next前没有yield就不用传参数，
// 上次yield没有参与本次next触发执行的代码中用不到就不用给参数，给了也没有意义
// 范围 yield 之间
// 第一次next  (yield ( x + 1)
// 第二次next	let y = 2 * ;	let z = yield (y / 3);
// 第三次next	let z = ; console.log(`x=${x}, y=${y}, z=${z}`); return x+y+z;
	


// { value: 6, done: false }
// { value: 8, done: false }
// x=5, y=24, z=13
// { value: 42, done: true }
// 总结: next函数调用时给的参数决定了 上一次yield表达式将以一 个什么值参与本次next触发
// 的代码的执行!
