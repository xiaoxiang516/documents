console.log('demo02---------------------------------------------------')
const target = {
	foo: 'bar'
};
const handler = {
	// 捕获器在处理程序对象中以方法名为键
	get() {
		return 'handler override';
	}
};
const proxy = new Proxy(target, handler);
console.log(target.foo); // bar
console.log(proxy.foo); // handler override
console.log(target['foo']); // bar
console.log(proxy['foo']); // handler override
console.log(Object.create(target)['foo']); // bar
console.log(Object.create(proxy)['foo']); // handler override













