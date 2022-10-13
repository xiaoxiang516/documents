	export default方式导出东西的特点
	1. 一个文件 (一个模块)只能最多export default一次
	2.export default 在导出东西时:可以直接导出,起不起名字都行,也可以先声明定义出来再导出,

	export方式导出东西的特点:
	1.  一个文件 (一个模块)可以使用任意次export
	2. export 导出东西时"必须"声明定义和使用export同时完成
	3. export 导出的东西必须要有一个明确的名字,不能是匿名
	4. 如果你不想定义的同时就export,你想先把多个要export的东西定义完了
	再一起用export导出也可以，这时候必须采用{}包起来批量export导出，这个包裹的大括号"不是代表对象的意思，就是单
	纯一个包裹而己，别想多了"!
	如果使用这种方式导处,在export的一瞬间导出时,你想换个,名字,可以使用as关键字
	export  {a as aaa,b as bbb};
	注意:一个文件(一个模块)可以同时出现export default和export! !
	export default function() {}; 

	// export let a = 100;
	// export let b = 1000;
	let a = 100;
	let b = 1000;
	export  {a,b};


	导入:export default导出的东西最简单,随便起个名字接收就行,这个名字个export default导出时的名字一样也可以,
	注意:导入的时候没有什么ES6解构赋值语法,

	导入export 导出的东西要注意,接收的时候不能随便用其他名字接收,要保持导入导出的名字一直,且接收的时候要用大括号包起来

	注意:可以在一次import中完成export和export default 导出的东西的同时导入,
	注意语法就行
	import abc, { a,b } from './aaa.js';

	如果接收的时候，用的导出的名字和其它名字冲突又或者你就想换个名字可以使用
	as关键起个别名!
	import abc, { a as aa, b as bb }  from './aaa.js';


/*
 
回顾我们前面使用import和export,总结:我们自己定义的模块
 
我们自己使用，当然不会把import写错，名字也不会写错，但是
 
我们用第三方别人写好的包时，就要注意了，import时 到底加不
 
加大括号，没有规律可循，要自己用一次以后就记住!
import Vuex from 'vuex';
import { createNamespacedHelpers } from 'vuex';
import { mapState, mapGetters,mapMutations,mapActions } from 'vuex';


