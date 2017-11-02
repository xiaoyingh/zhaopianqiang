//生成数组 储存图片路径
var arrtup = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg'];

var btn = document.getElementsByClassName('btn')[0];
var bom = document.getElementsByClassName('bom')[0];
var oDiv = bom.getElementsByTagName('div');
var $span = bom.getElementsByTagName('span');
var wrap = document.querySelector('.phto .wrap');
var box = document.querySelector('.wrap .box');
var list = document.querySelectorAll('.phto .wrap .box li');
var con = document.querySelector('.phto .con');
var $li = document.querySelectorAll('.con .list li');
var $ul = document.getElementsByClassName('list')[0];
var inp = document.querySelector('.wrap .inp');
var next = document.getElementsByClassName('next')[0];
var prev = document.getElementsByClassName('prev')[0];
var next3d = document.getElementsByClassName('next3d')[0];
var prev3d = document.getElementsByClassName('prev3d')[0];
var timer = null;

//动态设置body的宽高
init();
function init(){
	var W = document.documentElement.clientWidth;
	var H = document.documentElement.clientHeight;
	document.body.style.width = W +'px';
	document.body.style.height = H +'px'; 
}

//头部 点击摆动展开效果
//动态添加 span隔行变色
var color = null;
for(var i=0;i<$span.length;i++){
	if(i%2 == 0){
		$span[i].style.backgroundImage = 'url(imgs/12.jpg)';
	}else{
		$span[i].style.backgroundImage = 'url(imgs/1.jpg)';
	}
	
}
//给点我  设置开关
btn.onOff = true;
btn.onclick = function(ev){
	//阻止冒泡
	ev.cancelBubble = true;
	//如果初期开启了定时器 就return
	if(timer){
		return;
	}
	if(btn.onOff){
		//开关还原
		btn.onOff = false;
		var n=0;
		//开启定时器 让div摆动
		timer = setInterval(function(){
			oDiv[n].className = 'show';
			n++;
			console.log(n)
			if(n > oDiv.length-1){
				clearInterval(timer);
				timer = null;
			}
		},200);
	}else{
		//开关还原
		btn.onOff = true;
		//设置定时器 让div从最后一个往前 折叠
		var n = oDiv.length-1;
		timer = setInterval(function(){
			oDiv[n].className = 'hidden';
			n--;
			if(n<0){
				clearInterval(timer);
				timer = null;
			}
		},200);
	}
};

//默认加载2D 效果
for(var i=0;i<$li.length;i++){
	$li[i].innerHTML = '';

	fn2d($li[i],i);
//	mTween($li[i],'left',Math.random()*1000,1000,'backIn');
//	mTween($li[i],'top',Math.random()*400,1000,'backIn');

}


//点击2D
$span[0].onclick = function(ev){
	ev.cancelBubble = true;
	wrap.style.display = 'none';
	con.style.display = 'block';
	con.style.background = '#222222';
	for(var i=0;i<$li.length;i++){
		$li[i].innerHTML = '';
		fn($li[i]);
		fn2d($li[i],i);
	}
	
};
//点击3D 效果
$span[1].onclick = function(ev){
	ev.cancelBubble = true;
	wrap.style.display = 'none';
	con.style.display = 'block';
//	con.style.background = '-webkit-linear-gradient(left top, rgb(192, 142, 33) 0%, rgb(82, 66, 50) 50%, rgb(0, 0, 0) 100%)';
	con.style.background = '-webkit-linear-gradient(left top,#c08e21 0%,#524232 50%,#000 100%)';
	for(var i=0;i<$li.length;i++){
		$li[i].innerHTML = '';
		$li[i].index = i;
		fn($li[i]);
		fn3d($li[i],$li[i].index);
	}
	
}
//点击平铺 效果
$span[2].onclick = function(ev){
	ev.cancelBubble = true;
	$ul.style.display = 'block';
	con.style.display = 'block';
	wrap.style.display = 'none';
	for(var i=0;i<$li.length;i++){
		fnpp($li[i],i);
//		console.log($li[i].style.left)
	}
};

//平铺 效果
function fnpp(obj,index){
	var lef = 200;
	var tp = 50;
	//运动到平铺位置
	mTween(obj,'left',lef + index%5*200,1000,'backIn');
	mTween(obj,'top',tp + Math.floor(index/5)*120,1000,'backIn');
	
}

//2d 效果函数封装
function fn2d(obj,index){
	var $a = document.createElement('a');
	var img = document.createElement('img');
	var b = document.createElement('b');
	var span = document.createElement('span');
	img.src = 'imgs/'+(index+1)+'.jpg';
	span.appendChild($a);
	span.appendChild(img);
	span.appendChild(b);
	obj.appendChild(span);
	
	//生成随机的位置
	var maxl = $ul.offsetWidth-obj.offsetWidth*1.5;
	var maxt = $ul.offsetHeight-obj.offsetHeight*1.5;
	obj.style.left = Math.floor(Math.random()*maxl)+'px';
	obj.style.top = Math.floor(Math.random()*maxt)+'px';
	//生成随机的旋转角度
	var rotate = (Math.random()*10-5)*15;
	obj.style.transform = 'rotate('+rotate+'deg)';
	//随机的层叠位置
	obj.style.zIndex = Math.floor(Math.random()*10);
	//生成变量储存 鼠标移入之前的位置
	var str = obj.style.transform;
	//鼠标移入效果
	obj.onmouseover = function(ev){
		ev.cancelBubble = true;
		console.log(this.style.transition);
		this.style.transition =  'transform 1s';
		this.style.transformStyle = '';
		this.style.transform = 'rotate('+0+'deg) scale(1.2)';
		this.style.zIndex = Math.floor(Math.random()*1.1+20);
		//鼠标按下拖拽效果
		drag(obj);
	};

	//鼠标移除效果
	obj.onmouseout = function(ev){
		ev.cancelBubble = true;
		this.style.zIndex = '';
		obj.style.transform = str;
	};
}

//生成3D长方体 函数封装
function fn3d(obj,index){
	var div1 = document.createElement('div');
	var div2 = document.createElement('div');
	var div3 = document.createElement('div');
	var div4 = document.createElement('div');
	var div5 = document.createElement('div');
	var div6 = document.createElement('div');
	obj.appendChild(div1);
	obj.appendChild(div2);
	obj.appendChild(div3);
	obj.appendChild(div4);
	obj.appendChild(div5);
	obj.appendChild(div6);
	obj.style.transformStyle = 'preserve-3d';
	//Math.floor(Math.random()*10)取一个0-10的整数 不包括0和10
	//console.log(Math.floor(Math.random()*10))
	//给每个长方体加背景图片
	var divs = obj.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++){
		divs[i].style.background = 'url(img/'+(obj.index+1)+'.jpg) no-repeat';
		divs[i].style.backgroundSize = '100% 100%';
	}
	
	//生成随机的位置 left top 
	var maxl = $ul.offsetWidth-obj.offsetWidth*1.5;
	var maxt = $ul.offsetHeight-obj.offsetHeight*1.5;
	obj.style.left = Math.floor(Math.random()*maxl)+'px';
	obj.style.top = Math.floor(Math.random()*maxt)+'px';
	//随机转动的角度
//	var rotatex = Math.floor(Math.random()*90)*Math.pow(-1,Math.floor(Math.random()*1000));
//	var rotatey = Math.floor(Math.random()*90)*Math.pow(-1,Math.floor(Math.random()*1000));
//	var rotatez = Math.floor(Math.random()*90)*Math.pow(-1,Math.floor(Math.random()*1000));
	var rotatex = (Math.random()*10-5)*15;
	var rotatey = (Math.random()*10-5)*10;
	var rotatez = (Math.random()*10-5)*10;
	obj.style.transform = 'rotateX('+rotatex+'deg) rotateY('+rotatey+'deg) rotateZ('+rotatez+'deg)';
	obj.style.zIndex = Math.floor(Math.random()*10);
	//生成变量储存 鼠标移入之前的位置
	var str = obj.style.transform;
	//鼠标移入效果
	obj.onmouseover = function(ev){
		ev.cancelBubble = true;
		console.log(this.style.zIndex);
		this.style.transition =  'transform 1s';
		this.style.zIndex = Math.floor(Math.random()*1.2+10);
		this.style.transform = 'rotate('+0+'deg) scale(1.2)';
		drag(obj);
	};
	//鼠标移除效果
	obj.onmouseout = function(ev){
		ev.cancelBubble = true;
//		var rotate = Math.floor(Math.random()*30)*Math.pow(-1,Math.floor(Math.random()*1000));
		this.style.zIndex = '';
		this.style.transform = str;
	};
	
	//3d双击图片 变成3D的轮播图
	obj.ondblclick = function(ev){
		ev.cancelBubble = true;
		con.style.display = 'none';
		wrap.style.display = 'block';
		wrap.style.background = '-webkit-linear-gradient(left top, rgb(192, 142, 33) 0%, rgb(82, 66, 50) 50%, rgb(0, 0, 0) 100%)';
		var countw = box.offsetWidth;
		var ulslen = Math.floor(countw/50);
		//根据ul的长度 循环生成ul
		var str = '';
		var len = ulslen-1;
		
		//判断 如果index+4 超出li的长度 那么就让其回到0 从头开始轮播
		if(index>$li.length-4){
			index = 0;
		}
		for(var i=0;i<ulslen;i++){
//			console.log(obj.index);
			str += '<ul><li style="background: url(img/'+(obj.index+1)+'.jpg) no-repeat '+-(i*50)+'px 0"></li><li style="background: url(img/'+(obj.index+2)+'.jpg) no-repeat '+-(len*50)+'px 0"></li><li style="background: url(img/'+(obj.index+3)+'.jpg) no-repeat '+-(len*50)+'px 0"></li><li style="background: url(img/'+(obj.index+4)+'.jpg) no-repeat '+-(len*50)+'px 0"></li><li></li><li></li></ul>';
			len--;
		}
		
		//把循环生成的li 放到box 里
		box.innerHTML = str;
		var uls = box.getElementsByTagName('ul');
		//声明变量 储存初始的延迟时间和旋转度数
		var time = 50;
		var deg = 90;
		var timeFlag = true;
		//给每个ul转动一个过渡时间  下一个过渡时间递增50
		for(var i=0;i<uls.length;i++){
			uls[i].style.transitionDelay = ''+time+'ms';
			time += 50;
		}
		
		//点击切换 图片函数
		var num = 0;
		var n = obj.index+1;
		inp.onclick = function(){
			num ++;
			console.log(n)
			n++;
			for(var i=0;i<uls.length;i++){
				uls[i].style.transform = 'rotateX(-'+deg+'deg)';
			}
			timeFlag = 50;
			deg += 90;//点击一次 递增90度
			//判断当是最后一张时 继续加载下去
//			for(var i=0;i<uls.length;i++){
//				var lis = uls[i].getElementsByTagName('li');
//				for(var j=0;j<lis.length-2;j++){
//					if(num%4==0){
//						lis[j].style.background = 'url(img/'+(n)+'.jpg) no-repeat '+-(n*50)+'px 0';
//					};
//				}
//			}
//			console.log(obj)
			 
		};
		
		//双击轮播图 散开3d的随机排列
		box.ondblclick = function(){
			wrap.style.display = 'none';
			con.style.display = 'block';
			con.style.background = '-webkit-linear-gradient(left top,#c08e21 0%,#524232 50%,#000 100%)';
			for(var i=0;i<$li.length;i++){
				$li[i].innerHTML = '';
				fn($li[i]);
				fn3d($li[i],i);
			}
		};
	};
}

//封装函数，获取到每个元素的随机位置
function fn(obj){
	//获取到每个元素的随机位置
	mTween(obj,'left',Math.random()*1000,1000,'backIn');
	mTween(obj,'top',Math.random()*400,1000,'backIn');
	
}

//拖拽 回弹效果
function drag(obj){
	
	var disX = 0;
	var disY = 0;
	
	var prevX = 0;
	var prevY = 0;
	var iSpeedX = 0;
	var iSpeedY = 0;
	//鼠标按下时效果
	obj.onmousedown = function(e){
		var e = e || window.event;
		disX = e.clientX - obj.offsetLeft;
		disY = e.clientY - obj.offsetTop;
		
		prevX = e.clientX;
		prevY = e.clientY;
		//鼠标按下时 拖动效果
		document.onmousemove = function(e){
			var e = e || window.event;
			obj.style.left = e.clientX - disX +'px';
			obj.style.top = e.clientY - disY +'px';
			
			iSpeedX = e.clientX - prevX;
			iSpeedY = e.clientY - prevY;
			
			prevX = e.clientX;
			prevY = e.clientY;
		}
		//鼠标移开时 效果
		document.onmouseup = function(){
			document.onmousemove = document.onmouseup = null;
			//回弹效果 函数调用
			objMove();
		}
		return false;
	}
	

	//回弹效果函数封装
	function objMove(){
		//清除定时器
		clearInterval(obj.dragTimer);
		clearInterval(obj.timer);
		//开启定时器
		obj.dragTimer = setInterval(function(){
			var L = obj.offsetLeft + iSpeedX;
			var T = obj.offsetTop + iSpeedY;
			var maxL = $ul.offsetWidth - obj.offsetWidth;
			var maxT = $ul.offsetHeight - obj.offsetHeight
			iSpeedX *= 0.97;
			iSpeedY *= 0.97;
			//如果碰撞到最小或者最大的范围 那么让元素 慢慢往相反方向 移动  形成回弹效果
			if(L > maxL ){
				L = maxL ;
				iSpeedX *= -1;
				iSpeedX *= 0.75;
				iSpeedY *= 0.85;
			}else if(L<0){
				L = 0
				iSpeedX *= -1;
				iSpeedX *= 0.75;
				iSpeedY *= 0.90;
			}
			
			if(T>maxT){
				T = maxT;
				iSpeedY *= -1;
				iSpeedY *= 0.75
				iSpeedX *= 0.90;
			}else if(T<0){
				T = 0;
				iSpeedY *= -1;
				iSpeedY *= 0.75;
				iSpeedX *= 0.90;
			}
			//在回弹到固定的范围时 清除定时器 停止下来
			if(Math.abs(iSpeedX)<1&&Math.abs(iSpeedY)<1){
				clearInterval(obj.dragTimer);
			}
			obj.style.left =  L +'px';
			obj.style.top = T +'px';
		},20);
	}
}