// 点击按钮后抽号
// 给按钮添加一个事件
var btn=document.querySelector('button');
var text='';//用来显示被抽取的号码
var arr=[];//用来承载需要抽取的号码
var b=false;//标识正在抽取
// btn变成一个对象<button></button>,在此对象属性onclick中添加函数
// 点击按钮执行以下代码

btn.onclick=function(){
	if(arr.length==0&&b){
		alert('已抽取完毕');
		arr=[];
		text='';
		b=false;
		document.getElementById('maxnum').value='';
		return;//结束函数
	}
	
 
	if(arr.length==0){//数组容器长度为零,是第一次点击按钮
	// 生成原始数据,要被抽取的数据
		var maxnum=document.getElementById('maxnum').value;
		for(var i=0;i<=maxnum;i++){
			arr.push(i);
		}
	}
	b=true;//开始抽取
	// 从数组中随机抽取一个数值
	// 随机数应该是数组中的元素的下标
	// 随机数的范围应该是数组中的下标范围
	var ran_index=Math.floor(Math.random()*arr.length);
	var random=arr[ran_index];//从数组中取出随机值
	arr.splice(ran_index,1);
	 
	
	var numbox=document.querySelector('.numbox');
	numbox.innerText=random;
	var randombox=document.querySelector('.randombox');
	
	text+=random+" ";
	randombox.innerText=text;
	
	// 开始抽号获取最大值
	// var maxnum=document.getElementById('maxnum').value;
	// // 抽取一个1-maxnum的随机数
	// var random=Math.floor(Math.random()*(parseInt(maxnum))+1);// 想要的随机数
	
	
}
