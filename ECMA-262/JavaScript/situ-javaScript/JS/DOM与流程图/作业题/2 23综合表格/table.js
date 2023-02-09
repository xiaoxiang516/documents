/* 重复性与去重 (简化,化简) */
// dataArr存储数据
var dataArr = [{
	name: '潇湘',
	age: '22'
}, {
	name: '红红',
	age: '20'
}, {
	name: '宝儿',
	age: '21'
}]; /*数组*/
var showArr=[];/*符合某个条件就  展示数据*/ 查询,搜索什么样的数据,遍历所需要的数据
var namebox = document.querySelector(".name");
var age = document.querySelector(".age"); /*不能为空，要是整数*/
var tbody = document.querySelector("tbody");
var add = document.querySelector(".add");
add.onclick = function() {
	namev = namebox.value;
	agev = age.value;
	if (namev == "") {
		alert("姓名不能为空");
		return; /*如果姓名没有输入,没必要向下运行*/
	}
	if (agev == "") {
		alert("年龄不能为空");
		return;
	}
	/*将数据保存起来*/
	var data = {
		name: namev,
		age: agev
	};

	dataArr.push(data); /*添加一个对象*/
	showData(showArr); /*重新展示数据*/
	

	namebox.value = ''; /*输入添加完后输入框的状态*/
	age.value = '';
}

function showData(arr) {
	/*删除原有数据内容,将arr内容拼接好放在tbody中*/
	if (Array.isArray(arr)) {
		tbody.innerHTML = '';
		arr.forEach(function(item, index, arr) {
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			td.innerText = index + 1;
			tr.appendChild(td);
			td = document.createElement("td");
			td.innerText = item.name;

			tr.appendChild(td);
			td = document.createElement("td");
			td.innerText = item.age;
			tr.appendChild(td);
			td = document.createElement("td");
			var del_a = document.createElement("a");
			del_a.setAttribute("href", "javascript:void(0);"); /*空链接,点击后不发生跳转,但可以做一些事,比如监听*/
			del_a.innerText = '删除';

			tr.arrdata = item; /*tr对象添加属性arrdata记录每一行内容*/
			/*记录本行数据*/
			del_a.onclick = function() {
				/*方法一：从添加数据的dataArr中删除数据,重新展示(再按照1 2 3排序),在index处开始删除1个*/
				// var d=tr.arrdata;
				// var index=arr.indexOf(d);
				// dataArr.splice(index,1);
				// console.log(dataArr);/*看一看*/

				/*方法二：删除当前组件*/
				var tr = del_a.parentNode.parentNode; /* a-td-tr */
				tr.remove();

			}
			td.appendChild(del_a);
			tr.appendChild(td);
			tbody.appendChild(tr);
		})
	} else {
		alert("系统出问题");
	}
}


/* 搜索 */
var btn_search = document.querySelector(".btn1");
var in_search = document.querySelector(".input1");
btn_search.onclick = function() {
	console.log(btn_search, in_search);
	var showArr = [];
	var search = in_search.value;
	var reg = new RegExp('^.*' + search + '.*$'); /* 传入字符串 */
	/* 	以任意字符(出现次数如下)开始,
		.	任意字符 查找单个字符，除了换行和行结束符。
		n*	匹配任何包含零个或多个 n 的字符串。 */
	/* eval() */
	dataArr.forEach(function(item, index, arr) {
		if (reg.test(item.name)) { //符合条件
			showArr.push(item);/*将符合条件的展示出来*/
		}
	});
	showData(showArr);
}


var oSort = document.querySelector(".sort");
oSort.onclick = function() {
	//方案一直接所有的数据都排序
	//方案二将展示的数据排序
	var arr=Array.from(dataArr);/* 复制一个数组 */
	arr.sort(function(a,b){
		return a.age-b.age;
	});
	showData(arr);/*重新展示*/

}
