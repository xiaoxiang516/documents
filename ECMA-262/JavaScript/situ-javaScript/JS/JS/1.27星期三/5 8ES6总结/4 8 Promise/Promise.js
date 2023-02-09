// Promise出现    地狱式回调

// 自己模拟实现一个Promise !    

// 一个函数如果被new来执行，则在函数执行前会在内存中创建一个空对象{} ,在函数体中可以用this访问这个空对象
// 函数如果没有明显示的return一个值，则函数默认返回this,也就是内存中创建的那个空对象

// 报警器 闹钟
// 通过改造new 某一个函数时在函数内部创建的空对象，
// 7.函数非1、2形式声明创建，且以new的方式来调用，则函数中的this指向:函数调用执行前在内存中创建的匿名空对象{}
// function Fun() { this.a = 100; console.log(this); }
// new Fun();
// console.log(new Fun());
//Promise是对异步操作结果(成功，失败)的描述（什么情况执行）
// Promise函数的参数是一个匿名函数，这个函数它的参数是一个函数，
// 这个参数函数，有两个参数resolve，reject，函数体内是异步操作，参数函数的两个参数就是指对函数体内异步操作结果的描述
// 理解promise关键是理解与它相关的then函数，
// MyPromise 两个过程， 在空对象的基础上构建promise对象与调用new MyPromise是参数函数
function MyPromise(fn) { //MyPromise的声明
	// this.data 是  undefined;
	this.status = 'pending';//status的值只有三个pending、fulfilled,rejected
	// this. success (或this.failure)的最终值是一个函数， 但这个函数是promise对象将来的使用者来提供指定，
	// 所以这里暂时只能赋值成null,且success (failure)对应的函数在status从pending变成fulfilled (rejected)
	// 时会自动调用
	this.success = null;
	this.failure = null;
	
	// 调用resolve,可以将promise对象的status变成fulfilled成功状态、携带指定的数据、触发成功的回调函数(如果指定了的话)
	this.resolve = function(data) { // resolve只是传了个值
		this.status = 'fulfilled';
		this.data = data;
		// 成功的回调函数在then中指定
		if( typeof this.success === 'function' )	this.success(this.data);//注意参数是this.data,不是data,resolve()在此处调用执行success，！！！success函数的具体样子是then传递的
	}.bind(this); // 绑定this只能是promise对象，不能是其他对象 
	this.reject = function(data) {
		this.status = 'rejected';
		this.data = data;
		// 失败的函数在在then中指定
		if( typeof this.failure === 'function' )	this.failure(this.data);//reject()在此处调用执行,failure函数的具体样子是then传递的
		else throw new Error("没有为失败的promise指定处理的回调函数");
	}.bind(this);
	
	// then 绑定回调函数
	this.then = function(fun1, fun2) {
		if(typeof fun1 === 'function')	this.success = fun1;//this.resolve 
		if(typeof fun2 === 'function')	this.failure = fun2;
		
		// 对then函数有一个清晰的全面的理解?
		// then函数一定会返回一个promise对象
		// then调用时给的参数函数的返回值是关键
		// 1. then的参数函数没有显示的return,则then默认自己构造一个成功的promise对象并返回，且携带undefined
		// 2. then的参数函数有return， 且return的不是一个promise对象， 则then会自己构造一 个成功的promise对象返回，且
		// 携带参数函数return的东西
		// 3. then的参数函数有return,且return的就是个promise对象 (成不成功不知道)， 则then不会 自己构造promise对象
		// 直接将参数函数return的promise对象作为整个then的返回
		// 4. then的参数函数抛出一个异常，then会返回一个失败的promise对象， 且将异常对象作为返回的promise对象携带的数据
	 
	};
	
	// this.resolve和this.reject这两个函数不是MyPromise的发明者调用的，这两个函数要作为参数传给new MyPromise函数
	// 的参数函数作为参数
	fn(this.resolve, this.reject); 
	//等同于立即执行下面的函数(移动函数内容(函数体))，执行后遇到setTimeout，所以function() {  resolve(100) }进入宏任务队列
	// function(resolve, reject){
	// 	setTimeout(function() {  resolve(100) }, 3000);  
	// } 
	// console.log(this);
}
// MyPromise new第一个字母大写

  new MyPromise( function(resolve, reject){ // 注意这儿的resolve, reject,是形参，在调用时接收参数
	//异步操作结果，所为成功与失败，不过是选两种情况中的一种执行而已
	setTimeout(function() {  resolve(100) }, 1000); // 这里可以放任意的你需要的耗时的异步代码，什么时候resolve什么时候reject自己看
} )
	.then(
		function(data){ console.log(data);  return 50;},
		function() { console.log('失败');  }
	);

// Promise的生命周期:Promise先是处于pending状态中,此时操作尚未完成，
	




