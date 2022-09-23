
var timebox = document.querySelector(".timebox");
//查找的是第一个符合条件的组件。通过css选择器查询对象(元素,标签)
//隔一段时间自己变化,需要一个计时器
//需要两个参数：每过多少时间执行一下function
// 参数1:function计时器干什么
// 参数2:数值:毫秒数   
//这个对象放在windows上
// setInterval申明一个计时器
setInterval(function(){
	var d = new Date();//获取当前对象
	var timestr=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	timebox.innerText=timestr;//在标签里更改时间
},1000)
 //1000ms即1s
  //手动刷新报时function().