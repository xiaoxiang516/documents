// 每一秒中移动一张图片,在200ms内完成移动

var interval = null; //全局性计时器，然后写一个函数声明一个计时器
var banner = document.querySelector('.banner');
newinterval() ;
function newinterval() {
	interval = setInterval(function() {
	//开始移动，要移动，组件要定位
	banner.style.left=banner.offsetLeft-(banner.clientWidth/4)+'px';
	if(banner.style.left==banner.clientWidth){
		
		banner.style.left=0;clearInterval(interval);
	}
	/* 距离左侧的边距在变 banner.offsetLeft*/
	}, 1800); /* 每1.8秒中移动一张图片 */
}

/* function move(){//切换图片，在200ms内完成移动
	var interval=setInterval(function(){
		banner.style.left=banner.offsetLeft-(banner.clientWidth/4)+'px';
	},200);// 没20ms移动一次,分成10份移动
} */

