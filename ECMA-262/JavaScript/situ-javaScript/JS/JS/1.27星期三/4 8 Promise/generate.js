//ES6里新加的关键字yield

//	Generate生成器函数
function* fun() {	//*
	console.log('第一个任务完成');
	yield 100; //yield 后面跟表达式
	console.log('第二个任务完成');
	yield;
	console.log('第三个任务完成');
	yield [1,2,3];
	//return 99;
} //yield把函数分成了四段

let funGe = fun();
console.log(funGe);//Object [Generator] {}
// console.log(funGe.next());	// next { value: 100, done: false }
// console.log(funGe.next());	// { value: undefined, done: false }
// console.log(funGe.next());	// { value: [ 1, 2, 3 ], done: false }
// console.log(funGe.next());	// { value: undefined, done: true }	函数没有返回值默认返回undefined


