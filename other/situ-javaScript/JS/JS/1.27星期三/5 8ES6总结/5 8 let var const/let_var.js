// let声明的变量，不会声明提前，所以我们必须保证，用let定义变量
//一定要先声明再使用
// let声明的变量，从声开始，到离它最近的结束大括号位置
//人们常认为一个大括号就是一块，所以我们常说let声明的变量是块级作用域
//var声明的是函数作用域
// const相 当于特殊的let,特殊在于const声明定 义的变量不可以再重新使用等号
//所以我们一-定要在用const声明定义变量给好初始值，因为过了这个时候，再也
//const和let到底要用哪个?但凡你能确定你声明变量不需要后续重新=号赋值，
//用const来声明
 // const obj = {};//是地址关联，而不是内容关联
 //obj.a = 100;

// for (var i = 0;i<10; i++) {
// 	setTimeout ( function () {
// 		console.log(i);
// 	},10);
// }
// for (let i = 0;i<10; i++) {
// 	setTimeout ( function () {
// 		console.log(i);
// 	},10);
// }

// ES6
// 1. let、const关键字声明变量
// 2.反引号字符串/ES6字符串(模板字符串)
// 3.对象的键值对简写:键名和键值一样;值是函数可以不写冒号和function关键字
//4.解构赋值:可以解构对象和数组//深层解构与解构之后换名字

// var obj = {
// 	a:{ aa:100 }
// };
// // 定义一个变量的方式
// var { a:{ aa } } = obj;//深层解构
// console.log(aa);

// var { a:b } = obj;//解构赋值的同时换一个名字相当于 var b=obj.a;
// console.log(b);

//5.三个点展开运算符(去壳),此外还有obj.assign({},obj1,obj2)
// 合并对象、合并数组
//三个点放在等号右边往往是用来去壳展开，但是放在等号左边则表示"收缩”
// var obj = {a:1,b:2,c:3,d:4};
// //
// var a = obj.a;
// //var obj2={b:2,c:3,d:4};
// var { a,d, ...obj2 }=obj;//按照规定，带去壳运算符的应该放在变量列表的最后一个位置，类似ES6中带默认值的参数
// console.log(a);
// console.log(obj2);
// var obj = { a:1,b:2, c:3,d:6 };
// console.log({...obj});//console.log(...obj);

// var arr = [1,2,3];
// arr1=[...arr];
// // var [...arr1];
// console.log(arr);


//6.函数参数默认值语法
// function fun(a = 100,b) {//参数列表中带默认值的参数，按照规定应该放在参数列表的最后一个位置
	
// }
// fun(1);//老师说有歧义，是 XXX

// 7.箭头函数:简化函数的定义;函数内this可以穿透到外层作用域
// 注意事项:一般我们在定义ajax的回调函数，或使用promise的then、catch绑定回调
// 函数时需要用箭头函数;对象里面的键值对，值是方法时不要用箭头函数。
// 如果一个函数中根本没有用到this，那你完全可以使用箭头函数;箭头函数中的this
// 在函数定义时this就已经绑死了!!!!
// 8. Promise解决了地狱回调问题，Promise是对异步操作结果的描述，但Promise不是
// 异步操作的终级解决方案，async/await才是 (后面会讲)
// 9.模块化导入import/导出export default(后面会系统全面讲解)
// 10.类语法class/extend/super ( 学react的时候讲)
// 11. for. .of
// 12.8进制表示 0o或0O都可以
var oNum = 0O10;//octonary number system
 
console.log(oNum);//8

