
//转移子任务设置脚本
var names = $("[id^='name']");
for(var i=0; i<names.length; ++i){
	var id = names[i].id;
	var globalIdx = id.substring(id.indexOf("[")+"[".length, id.indexOf("]"));
	console.log(globalIdx);	
	var name = names[i].value;
	console.log(name);
	if (!name || name == "")
		continue;	
	
	var e = document.getElementById("estStarted[" + globalIdx + "]");
	if (e)
		e.value='2021-08-01';
}

for(var i=0; i<names.length; ++i){
	var id = names[i].id;
	var globalIdx = id.substring(id.indexOf("[")+"[".length, id.indexOf("]"));
	console.log(globalIdx);	
	var name = names[i].value;
	console.log(name);
	if (!name || name == "")
		continue;
	
	var e = document.getElementById("deadline[" + globalIdx + "]");
	if (e)
		e.value='0000-00-00';
}


for(var i=0; i<names.length; ++i) {
	var id = names[i].id;
	var globalIdx = id.substring(id.indexOf("[")+"[".length, id.indexOf("]"));
	console.log(globalIdx);	
	var name = names[i].value;
	console.log(name);
	if (!name || name == "")
		continue;
	
	var e = document.getElementById("name[" + globalIdx + "]");
	if (!e)
		continue;
	var yugu = name.substring(name.indexOf("预估=")+"预估=".length, name.indexOf("h,消耗"));
	console.log(yugu);
	var ye = document.getElementById("estimate[" + globalIdx + "]");
	ye.value = yugu;
}


