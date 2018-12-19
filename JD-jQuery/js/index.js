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
})(jQuery)