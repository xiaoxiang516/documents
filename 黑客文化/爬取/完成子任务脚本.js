
//完成子任务脚本
var names = $("[id^='names']");
for(var i=0; i<names.length; ++i) {	
	var id = names[i].id;
	var globalIdx = id.substring(id.indexOf("[")+"[".length, id.indexOf("]"));
	console.log(globalIdx);	
	var name = names[i].value;
	console.log(name);
	
	//状态
	document.getElementById("statuses" + globalIdx).value = 'done'
	
	//预估
	var yugu = name.substring(name.indexOf("预估=")+"预估=".length, name.indexOf("h,消耗"));
	console.log(yugu);
	var ye = document.getElementById("estimates[" + globalIdx + "]");
	ye.value = yugu;
	
	//消耗	
	var xiaohao = name.substring(name.indexOf(",消耗=")+",消耗=".length, name.indexOf("h,剩余"));
	console.log(xiaohao);
	ye = document.getElementById("consumeds[" + globalIdx + "]");
	ye.value = xiaohao;
	
	//剩余
	var shengyu = name.substring(name.indexOf(",剩余=")+",剩余=".length, name.lastIndexOf("h"));
	console.log(shengyu);
	ye = document.getElementById("lefts[" + globalIdx + "]");
	ye.value = shengyu;
	
	//预估开始
	ye = document.getElementById("estStarteds[" + globalIdx + "]");
	ye.value = "2021-08-01";
	//截止时间
	ye = document.getElementById("deadlines[" + globalIdx + "]");
	ye.value = "2022-01-31";
}


