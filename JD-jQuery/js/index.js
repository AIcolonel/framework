(function($){
	/*顶部导航菜单开始*/
	var $item=$('.top .item')
	$item.hover(function() {
		var timer=null;
		clearTimeout(timer)
		var $sideItem=$(this).find('.top-right-item');
		timer=setTimeout(function(){
			$sideItem.slideToggle();
		},50)
	}); 
	/*顶部导航菜单结束*/

	/*搜索引擎开始*/

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
		playDuration:3000
	})
	/*轮播图结束*/
})(jQuery)