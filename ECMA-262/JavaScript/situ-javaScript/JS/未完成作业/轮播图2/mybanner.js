/* html文档中的组件 */

//获取mybanner_list的子元素生成指定数量的div
//将div存放到一个mybanner_box的div中
//获取到mybanner
var mybanner = document.querySelector(".mybanner");
//获得宽度高度
var my_width = mybanner.clientWidth;/*指获取盒模型整体宽(不是内容宽)*/
var my_height = mybanner.clientHeight;/*指获取盒模型 clientHeight = 内容实际高度 + 上下内边距(padding) 指盒模型*/
//获得所有记录数据的li
var mybanner_li_items = document.querySelectorAll(".mybanner_list>li");
// console.log(mybanner_li_items.length);

// 看得见        一个长的div与里面的组件

var mybanner_box = document.createElement("div");/* 生成一个长的div，包含要展示的div组件 */
mybanner_box.classList.add('mybanner_box');  mybanner_box.classList.add('clearfix');//给属性：class添加多个值
mybanner_box.style.width = mybanner_li_items.length + '00%';//动态设置长度


/* 在长的div(mybanner_box)放置组件  循环生成div组件 */
 for (var i = 0; i < mybanner_li_items.length; i++) {//         一个img对应转化为相对应的div背景图片
 	mybanner_temp = document.createElement("div");//mybanner_temp没有用var 声明的全局变量吗
 	mybanner_temp.style.width = my_width+'px';//mybanner.clientWidth
 	mybanner_temp.style.height = my_height+'px';

 	mybanner_temp.classList.add('mybanner_img');//等同<div class='mybanner_img'></div>
 	mybanner_temp.style.backgroundImage = 'url('+mybanner_li_items[i].getAttribute('mybanner_img')+')';/*等同background-image：url(img/banner01.jpg);*/
 	
	mybanner_box.appendChild(mybanner_temp);//div(mybanner_box)添加设置好属性的div(mybanner_temp)作为子元素
 }
mybanner.appendChild(mybanner_box);//div(mybanner)添加设置好属性的div(mybanner_box)作为子元素

/* var mybanner_img_divs=mybanner_box.childNodes; */
var myindex=0;//从第零张开始显示---正在展示的图片下标

var move_count=0;
function showimg(index){
	var move_count=0;
	//myindex 正在显示的图片的下标,到index目标图片的下标, 要移动的距离
	var move_width=(index-myindex)*mybanner.clientWidth;/* 0 1 2 3 */
	
	// mybanner_box要移动到那个坐标去
	var desc=mybanner_box.offsetLeft-(index-myindex)*banner.clientWidth;
	var move_inteval=setInterval(function(){
		move_count++;
		banner_box.style.left=banner_box.offsetLeft-
	})
	
}


var whileinteval=setInterval(function(){
	var index=myindex
})

/* 计算两个组件之间的差距,然后过一些时间,移动这么多 */