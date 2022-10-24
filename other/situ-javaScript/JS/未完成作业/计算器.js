/* 思路: */

/* 为数字,运算符号添加监听事件
一次运算结束,=的监听事件后 */

var text_show='';/*在显示的内容*/
var text_save='';/*保存输入过的内容，就像历史记录*/
var symbol='';/*保存点击的加减乘除按钮符号*/
var isOver=true;
var nums=document.querySelectorAll(".num");
var symbols=document.querySelectorAll(".symbol");
var box_top=document.querySelectorAll(".box_top");/*NodeList*/
var deng=document.querySelector("deng");
/* 每个数字添加监听,并在顶层div显示框中 */
for(var i=0;i<nums.length;i++){
	nums[i].onclick=num_c;//给所有数字键添加监听
}

/* 给所有运算符号添加监听 */
for(var i=0;i<symbols.length;i++){
	symbols[i].onclick=symbol_c;
}
/* 等于号的监听 */
deng.onclick=function(){
	var num_show;
	var num_save;
	var res;
	/* 输入的数据类型转换 */
	if(text_show.indexOf('.')||text_save.indexOf('.')){
		num_show=parseFloat(text_show);
		num_save=parseFloat(text_save);
	}else{
		num_show=parseInt(text_show);
		num_save=parseInt(text_save);
	}
	
	/* 计算结果 */
	if('+'==symbol){
		res=num_show+num_save;
	}else if('-'==symbol){
		res=num_show+num_save;
	}else if('X'==symbol){
		res=num_show*num_save;
	}else if('/'==symbol){
		res=num_show/num_save;
	}
	/* 显示结果 */
	text_show=res;
	showData();
	/* 运算暂停 */
	isOver=true;
}
function clear(){
	text_show='';
	text_save='';
	symbol='';
}
/* 给所有运算符号添加监听 */
function num_c(e){
	if(isOver){
		clear();
	}
	text_show+=this.innerText;
	isOver=false;
	showData();
}
function symbol_c(){
	isOver=false;/*点击运算符说明运算没结束*/
	symbol=this.innerText;
	text_save=text_show;
	text_show='';/*清空显示的数据*/
}

function showData(){
	box_top[0].innerText=text_show;
}

