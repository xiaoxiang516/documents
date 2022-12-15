console.log('demo01---------------------------------------------------')
const target = {
	id: 'target'
};
const handler = {};
const proxy = new Proxy(target, handler);
// id属性会访问同一个值
console.log(target.id); // target
console.log(proxy.id); // target
// 给目标属性赋值会反映在两个对象上
// 因为两个对象访问的是同一个值
target.id = 'foo';
console.log(target.id); // foo
console.log(proxy.id); // foo
// 给代理属性赋值会反映在两个对象上
// 因为这个赋值会转移到目标对象
proxy.id = 'bar';
console.log(target.id); // bar
console.log(proxy.id); // bar
// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty('id')); // true
console.log(proxy.hasOwnProperty('id')); // true
// Proxy.prototype是undefined
// 因此不能使用instanceof操作符
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype
// 'undefined' in instanceof check
console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype
// 'undefined' in instanceof check
// 严格相等可以用来区分代理和目标
console.log(target === proxy); // false
