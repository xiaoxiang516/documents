var yearbox = document.querySelector(".year"); //为什么要加双引号,双引号不是给字符串的吗 
var weekbox = document.querySelector(".week");
// querySelector()的参数类型  怎么获得这个对象的  内存实现吗
//变量在字符串中,为什么能保存呢
var d = new Date();


/* 函数返回值与显示值,显示形式(6,06;数字,中文)之间的关系
getMonth返回月份 (0 ~ 11)   显示：1-12  返回值对应加1
getDay() 返回一周（0~6）的某一天的数字。用数组或switch case对应 (星期天为 0, 星期一为 1, 以此类推)。 
getSeconds()	返回 Date 对象的秒数 (0 ~ 59)。	*/
function changeDay() {
	switch (d.getDay()) { /* 改变星期几 */
		case 0: //星期天为 0
			weekbox.innerText = "星期日";
			break;
		case 1:
			weekbox.innerText = "星期一";
			break;
		case 2:
			weekbox.innerText = "星期二";
			break;
		case 3:
			weekbox.innerText = "星期三";
			break;
		case 4:
			weekbox.innerText = "星期四";
			break;
		case 5:
			weekbox.innerText = "星期五";
			break;
		case 6:
			weekbox.innerText = "星期六";
			break;
			/* default:
				break; */
			// default里面没有代码可以不写

	}
}
// 把多种方法写成一个函数
function changeDay2() {
	var d = new Date();

	// var week=new Array(7);//符春玲
	var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	var weekstr = weekday[d.getDay()];
	console.log(weekstr);
	
	var weekday = ['日', '一', '二', '三', '四', '五', '六'];// 周文轩    重复性的减少
	var weekstr = "星期" + weekday[d.getDay()];
}
function chineseTime(){
 
	/* 解:1)提/说出问题：怎样把数字换做相应的中文
	00:00:00 
	07:07:07七时七分七秒 17:17:17十七时十七分十七秒  
	17:27:27    17:37:37     17:57:57
	// 获取数字0123456789  零一二三四五六七八九
	*/
   if()
}
/* 一九九八年五月十六日*/
 

/* interval[ˈɪntəvl]  美 [ˈɪntərvl] n. 间隔；间距；幕间休息 */

setInterval(function() { //小时分钟秒
	var d = new Date();
	var datebox = document.querySelector(".datetimebox");
	// 周文轩
	var minute = d.getMinutes()
	if (minute < 10) {
		// minute+='0';
		minute = '0' + minute;
	}
	var second = d.getSeconds()
	if (second < 10) {
		// second+='0';//这样写存在问题,比如第8秒会变成80秒
		// 关于second+=a;  second=second+a;   second=a+second; // 字符串与数值
		second = '0' + second;
	}
	datebox.innerText = d.getHours() + ":" + minute + ":" + second;

	/* //潇湘
	if (d.getMinutes() < 10 && d.getSeconds() < 10) {
		datebox.innerText = d.getHours() + ":" + ("0" + d.getMinutes()) + ":" + ('0' + d.getSeconds());
	} else if (d.getMinutes() < 10) {
		datebox.innerText = d.getHours() + ":" + ("0" + d.getMinutes()) + ":" + d.getSeconds();
	} else if (d.getSeconds() < 10) {
		datebox.innerText = d.getHours() + ":" + d.getMinutes() + ":" + ("0" + d.getSeconds());
	} else {
		datebox.innerText = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	} */
	changeDay(); //星期几
	yearbox.innerText = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); //年月日
}, 1000)

/* setInterval(),参数1000ms就是1秒,每隔1s执行函数中的参数函数,function()重新获取当前时间
关于参数为不为86400000ms的解释就是这句话 */
