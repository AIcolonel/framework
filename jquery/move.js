;(function(){
	function _init($elem){
		this.$elem=$elem;
		this.currentX=parseFloat(this.$elem.css('left'));
		this.currentY=parseFloat(this.$elem.css('top'));
	}

	function _slideTo(x,y,callback){
		if(!x){
			x=this.currentX;
		}
		if(!y){
			y=this.currentY;
		}

		if(this.currentX == x && this.currentY == y) return;

		typeof callback == "function" && callback();
	}

	function Move($elem){
		_init.call(this,$elem);
	}

	Move.prototype={
		constructor:Move,
		slideTo:function(x,y){
			_slideTo(x,y,function(){
				this.$elem.removeClass('transition');
				this.$elem.css({"top":x,"left":y});
				this.currentX=x;
				this.currentY=y;
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}
	} 

	function Js($elem){
		_init.call(this,$elem);
	}

	Js.prototype={
		constructor:Js,
		slideTo:function(x,y){
			_slideTo(x,y,function(){
				this.$elem.removeClass('transition');
				this.$elem.stop().animate({"top":x,"left":y});
				this.currentX=x;
				this.currentY=y;
			}.bind(this));
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}
	}

	function getMove($elem,options){
		var move = null;
		if(options.js){
			move = new Js($elem);
		}else{
			move = new Move($elem);
		}
		//return move;
		/*
		return {
			slideTo:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		}
		*/
		return {
			slideTo:$.proxy(move.slideTo,move),
			x:$.proxy(move.x,move),
			y:$.proxy(move.y,move)
		}	
	}


	var DEFAULTS={
		js:true
	}

	$.fn.extend={
		move:function(options,n1,n2){
			return this.each(function(){
				$elem=$(this);
				var moveObj=$elem.data('moveObj');
				//单例模式
				if(!moveObj){
					options=$.extend({},DEFAULTS,options);
					moveObj=$elem.data('moveObj',options);
				}
				if(typeof moveObj[options] == 'function'){
					moveObj[options](n1,n2);
				}
			})
			
		}
	}
})()