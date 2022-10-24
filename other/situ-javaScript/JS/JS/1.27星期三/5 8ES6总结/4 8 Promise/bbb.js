// Promise
// 1. Promise 上挂了哪些常用的方法
// 1.1 Promise.resolve() 可以直接得到一个成功的promise对象，且携带指定的数据
// 1.2 Promise.reject() 可以直接得到一个失败的promise对象，且携带指定的数据
// 1.3 Promise.all()可以将多 个promise异步任务整合成一个 promise任务来处理
// 1.4 Promise.race()让多 个promise异步任务进行比赛，谁先完成，race就算完成
// 总结: Promise的优点是:解决了ES5回调套回调的地域回调问题; 缺点:要频繁的使用then和catch绑定回调函数,在代码格式,
// 表现上,还是会不断出现函数作为参数传递的情况,代码还是不够简洁与优雅!

 
 
 // Promise的威力在哪里: javascript代码默认是“异步无阻塞”的， 会一直从上往下依次执行，
 // 就算某一行代码是耗时的异步的任务无法马上执行完毕，但你只要执行了这行代码，开启了任
 // 务，就该下面一行执行了，下面的代码不会因为上面还没完成就等你!如果你的某行代码就是想
 // 等到上面的执行完了，再执行，就办不到。但promise办到了，promise把异步的代码封装成一
 // 一个promise对象，再把后面的要执行的代码封装成一个函数放在then里， 就会阻塞then里面
 // 函数代码的执行，这就是promise的威力





// 参数: 一个函数带有两个参数
// new Promise((resolve, reject) => resolve(100)).then(data => console.log(data));
// Promise.resolve(100).then(data => console.log(data));

// Promise.reject(101).catch(data => console.log(data));
// new Promise((resolve, reject) =>reject(102)).then(null, data => console.log(data));


// 1.3 Promise.all()可以将多个promise异步任务整合成一个 promise任务来处理

let p1 = new Promise((resolve, reject) => {
	setTimeout(() => { console.log('地拖完了'); resolve('干净的地板'); }, 5000); 
});

let p2 = new Promise((resolve, reject) => {
	setTimeout(() => { console.log('衣服洗完了');resolve('干净的衣服');  }, 8000); 
});

let p3 = new Promise((resolve, reject) => {
	setTimeout(() => { console.log('碗洗完了');  resolve('干净的碗');}, 3000); 
});

// Promise.all([p1, p2, p3]).then(data => {
// 	console.log('活干完。可以happy');
// 	console.log(data);//[p1, p2, p3]对应排放顺序
// });

// 1.4 Promise.race()让多个promise异步任务进行比赛，谁先完成，race就算完成

// Promise.race([p1, p2, p3]).then(data => {
// 	console.log(data);
// 	console.log('活干完。可以happy');
// });

// Promise.race([p1, p2, p3]).catch(data => {
// 	console.log(data);
// 	console.log('活干完。可以happy');
// });

 
 new Promise((resolve, reject) => {
	 console.log('任务已经开启了，then只是关注这件任务做完之后额外还要做的');
 });
 
 
 // 一个组件请求数据
 
 
 
 
 
 

