/* 全局性计时器 */
var interval = null;//计时器事件状态未添加
var banner = document.querySelector(".banner");
var show = document.querySelector(".show");
var show_index=0;//现在要显示的下标
var show_item=document.querySelectorAll(".banner>div");
banner.m_width = 0;
newinterval();
function newinterval() {
	// 每一秒总移动一次图片
	interval = setInterval(function() {
		/* banner.style.left=banner.offsetLeft-(banner.clientWidth/4)+'px'; */
		move(); //开始移动
	}, 2200);
}

// 在200ms内完成 
function move() {
	show_index++;
	/* 一共移动多少距离 */
	/* 默认向左移动 */
	
	var des = show.clientWidth; /* 移动多大的宽度 */
	if(show_index==show_item.length){
		show_index=0;
		des=show.clientWidth*()
	}
	
	var m_intcal = setInterval(function() {
		banner.m_width++;
		banner.style.left = banner.offsetLeft - (banner.clientWidth / 10) + 'px';
		if (banner.m_width == 10) { //移动10次
			banner.style.left=des+'px';
			banner.m_width = 0;
			clearInterval(m_intcal);
		}
	}, 20);
}
