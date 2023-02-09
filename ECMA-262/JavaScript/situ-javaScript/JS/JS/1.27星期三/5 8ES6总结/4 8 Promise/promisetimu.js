// 第一大块
console.log(1);
// 第二大块
setTimeout(() => {
	console.log(2);
	process.nextTick(() => { console.log(3); });
	new Promise(resolve => {
		console.log(4);
		resolve();
	}).then(() => { console.log(5);});
});
// 第三大块
new Promise(resolve => {
	console.log(7);
	resolve();
}).then(() => { console.log(8); });
// 第四大块
process.nextTick(() => { console.log(6); });
// 第五大块
setTimeout(() => {
	console.log(9);
	process.nextTick(() => { console.log(10); });
	new Promise(resolve => {
		console.log(11);
		resolve();
	}).then(() => { console.log(12); })
});

// 每一行代码在javascript看来就是一个一个的任务， 一个函数其实是一个大任务 !
// 能在当前时间片中执行的任务我们认为是同步任务，不能在当前时间片中执行的任务我们称为异步任务
// javascript把异步任务分为:异步宏任务macro task、 异步微任务micro task
// javascript在内存中维护了两个队列:宏任务队列、微任务队列
// 宏先微后、微全部宏一个
// 宏任务: setTimeout和setInterval开启的任务、全局代码
// 微任务: then的参数函数、process.NextTick开启的任务(会插队)
// 要注意: new Promise时提供的参数函数不算异步任务算当前时间片下的同步任务立即执行

// 当前时间片 下一个时间片         !!!!!!!!!!在移动到任务队列时要去掉标识

// 10毫秒以后把第一个参数函数任务放入宏任务队列中
// setTimeout(function() {
// 	console.1og(1);
// },10);
// console.log(2);
 
