var get_max = document.getElementById('maxnum').value;
// 从输入框获取最大值范围

var arr = [],
	i = 1;
var btn = document.querySelector('button'); /* 获取button对象 */
btn.onclick = function() { /* 为对象Button添加单机事件 */
	var rand = Math.floor(Math.random() * get_max);
	console.log(1);


	var numberbox = document.querySelector(".numberbox");
	numberbox.innerText = rand; //替换numberbox的文本内容
	arr.push(rand);

	var randombox = document.querySelector('.randombox');
	randombox.innerText = arr;

	i++;
	if (i == get_max) {
		alert("抽取完毕lalala");
		arr = [];
		return;
	}
}
