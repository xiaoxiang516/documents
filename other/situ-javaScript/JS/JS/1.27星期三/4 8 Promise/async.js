// ES7 出现了async/await
// await关键字可以阻塞await后面代码的执行，await后面要跟一个表达式语句，表示等待表式语句任务
// 的完成，完成后才会继续执行await后面的代码，

// ES7规定:
// 1. await 只能出现在async修饰的函数中
// 2. await 后面跟的表达式一定会返回一个promise对象, 如果表达式不返回一个promise, 那么await
// 会帮你封成一个promise, 如果提供的就是一个promise对象,那么就不帮我们封装了
// 3. 整个await表达式的结果是, await 后面promise对象成功后携带的数据
// 4. await 如果等来的是一个失败的promise 会报异常, 所以我们往往要把await 代码放在一个 try块里进行异常捕获处理
 //以提高代码的健壮性， 其实不管也行， 并不影响后续执行
 //5. await 关键字后面紧跟的表达式是立即执行的， 不算是异步任务，算当前时间片下的同步任务，但await语句后面跟着的语句
 // 全自动算作异步任务吗放入微任务队列中,在下一时间片执行
// 优点:像写同步代码一样来写异步代码，不用函数传来传去，只要把延时执行的代码写在await的下面 即可。
// 缺点:没有

// async 出现修饰函数， 99%都是因为函数中出现了await
/* async 修饰的函数必定返回一个promise对象， 如果async 修饰的函数没有显示的return一个promise对象
那么async 会帮我们悄悄的创建一个成功的promise对象，并携带return 后面的数据， 如果没有return 那么就携带undefined
如果函数执行错误， 或抛出异常， 返回一个失败的promise对象，并携带错误异常对象
总结: async/await其实是generate* + yield + next的语法糖(一种简写);但要注意，并不代表学会了
async/await就永远都用不到generate* +yield + next, 有的特殊情况，必须要用generate* +yield + next
来搞定! */

// async await	

async function fun() {
	// let result = await 100;
	let result = await console.log("000");
	console.log(456);
}
fun();
console.log(123);

