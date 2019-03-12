(function($){
	/*顶部导航菜单开始*/
	var $item=$('.top .top-right .item');
	$item.dropdown({js:true,mode:"slideDownUp",delay:100});
	$item.on("dropdown-show dropdown-shown dropdown-hide dropdown-hidden",function(ev){
		console.log("!:::"+ev.type)
	})
	$item.on("dropdown-show",function(){
		var $dropdownLayer=$(this).find('.top-right-item');
		var isLoaded=$dropdownLayer.data('isLoaded');
		var index=$(this).index();
		if(isLoaded) return ; 
		$.getJSON("./data/top-data.json",function(data){
			var data=data[index];
			var html="";
			for(var i=0;i<data.length;i++){
				html += '<li><a class="link" href="'+data[i].url+'">'+data[i].topcontent+'</a></li>'
			}
			setTimeout(function(){
				$dropdownLayer.html(html);
				$dropdownLayer.data('isLoaded',true);
			},500)
		})
	})
	/*
	$item.hover(function() {
		var timer=null;
		clearTimeout(timer)
		var $sideItem=$(this).find('.top-right-item');
		timer=setTimeout(function(){
			$sideItem.slideToggle();
		},50)
	});
	*/ 
	/*顶部导航菜单结束*/

	/*搜索引擎开始*/
	;(function(){
		function createHTML($elem,data){
			var html='';
			for(var i=0;i<data.length;i++){
				html += '<li class="search-layer-item">'+data[i][0]+'</li>'
			}
			$elem.html(html)
		}

		var $search=$('.search-btn');
		$(".search-content").on("input",function(){
			// $('#search-form').submit();
			var val=$.trim($(".search-content").val());
			// console.log(val)
			$.ajax({
				url:"https://suggest.taobao.com/sug?code=utf-8&_ksTS=1528889766600_556&k=1&area=c2c&bucketid=17&q="+val+"&callback=jQuery112407691251633497418_1551442437841&_=1551442437842",
				dataType:"jsonp",
				jsonp:"callback"
			})
			.done(function(data){
				console.log(data)
				if(!data.result.length==0){
					$(".search-layer").css("display","block")
					createHTML($(".search-layer"),data.result)
				}
			})
			.fail(function(err){
				console.log(err)
			})
		});

		//点击页面隐藏下拉框
		$(document).click(function(){
			$(".search-layer").slideUp()
		});
		//点击下拉框每一项阻止默认行为并且将其内容赋给输入框
		$(".search-layer").on("click",".search-layer-item",function(){
			// console.log($(this).html())
			$(".search-content").val($(this).html());
			return false;
		});
		//输入框获取焦点显示下拉框
		$(".search-content").on("focus",function(){
			$(".search-layer").slideDown();
		});
		//点击输入框阻止冒泡
		$(".search-content").on("click",function(){
			return false;
		});
	})();
	/*搜索引擎结束*/


	/*轮播图开始*/
	var $goodsListItem=$('.goods-list li');
	var $goodsListLayer=$('.goods-list-layer');
	$goodsListItem.hover(function(){
		$goodsListLayer.toggleClass('goodsActive')
	})
	$goodsListLayer.hover(function(){
		$goodsListLayer.toggleClass('goodsActive')
	})
	var oCourselList=$('.coursel-list')[0];
	// console.log(oCourselList);
	new Carousel({
		id:"coursel-list",
		aImg:['images/coursel1.jpg','images/coursel3.jpg','images/coursel4.jpg'],
		width:1260,
		height:448,
		playDuration:5000
	})
	/*轮播图结束*/

	/*热卖商品开始*/
	var $btn=$('.hot-btn');
	var $btnLeft=$('.hot-btn-left');
	var $btnRight=$('.hot-btn-right');
	var $hotList=$('.hot-list');
	var $hot=$('.hot .container ');
	$hot.mouseover(function(event){
		$btn.css('display','block');
	});
	$hot.mouseout(function(event){
		$btn.css('display','none');
	});
	var $index=0;
	$btnLeft.click(function(){
		if($index>=2){
			return;
		};
		console.log($index);
		if($index==0){
			$hotList.eq(2).css('left','1260px');
			$hotList.eq(1).css('left','0px');
			$hotList.eq(0).css('left','-1260px');
		}else if($index==1){
			$hotList.eq(2).css('left','0px');
			$hotList.eq(1).css('left','-1260px');
			$hotList.eq(0).css('left','-25200px');
		}
		$index++;
	})
	$btnRight.click(function(){
		if($index<=0){
			return;
		};
		console.log($index);
		if($index==2){
			$hotList.eq(2).css('left','1260px');
			$hotList.eq(1).css('left','0px');
			$hotList.eq(0).css('left','-1260px');
		}else if($index==1){
			$hotList.eq(2).css('left','2520px');
			$hotList.eq(1).css('left','1260px');
			$hotList.eq(0).css('left','0px');
		}
		$index--;
	})
	/*热卖商品结束*/
})(jQuery);