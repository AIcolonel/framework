(function(w){
	function kquery(selector){


		//返回一个对象
		return new kquery.fn.init(selector);
	}

	kquery.fn=kquery.prototype={
		constructor:kquery,
		init:function(selector){
			//1.传入的值是Boolean时
			if(!selector){
				return this;
			}
			//2.传入的是函数时
			else if(kquery.isFunction(selector)){
				window.addEventListener("DOMcontentloaded",selector)
				this[0]=document;
				this.context=document;
				this.length=1;
				return this;
			}
			//3.传入字符串
			else if(kquery.isString(selector)){
				//传入的是代码片段
				if(kquery.isHtml(selector)){
					// console.log('aa')
					var tempDom=document.createElement('div');
					tempDom.innerHTML=selector;
					this[0]=tempDom.children;
					// console.log(tempDom);
					this.length=1;
					return this
				}
				//传入选择器
				else{
					var oElements=document.querySelectorAll(selector);
					for(var i=0;i<oElements.length;i++){
						this[i]=oElements[i];
					}
					this.length=oElements.length;
					this.context=document;
					this.selector=selector;
					return this;
				}
			}
			//4.传入数组
			else if(kquery.isArray(selector)){
				for(var i=0;i<selector.length;i++){
					this[i]=selector[i]
				}
				this.length=selector.length;
			}
			//5.传入对象(其他条件都不满足情况下)
			else{
				this[0]=selector;
				this.length=1;
			}
		},
		get:function(index){
			if(index || index==0){//有下标，则获取对应下标对象
				if(kquery.isNumber(index)){//下标是数字
					if(index>=0){
						return this[index]
					}else{
						return this[this.length+index];
					}
				}else{//下标不是数字
					return undefined;
				}
			}else{//没有下标
				return this;
			}
		}
	}
	kquery.prototype.init.prototype=kquery.prototype;

	//扩展插件方法
	kquery.prototype.extend=kquery.extend=function(options){
		for(key in options){
			this[key]=options[key];
		}
	}

	//定义静态方法
	kquery.extend({
		isFunction:function(selector){
			return typeof selector == "function";
		},
		isString:function(selector){
			return typeof selector == "string";
		},
		isHtml:function(selector){
			var reg = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');
			// return /'^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$'/.test(selector);
			return reg.test(selector);
		},
		isArray:function(selector){
			return typeof selector == "object" && length in selector;
		},
		isNumber:function(selector){
			return typeof selector == "number";
		}
	})
	/*
	kquery.isFunction=function(selector){
		return typeof selector == "function";
	}
	kquery.isString=function(selector){
		return typeof selector == "string";
	}
	kquery.isHtml=function(selector){
		var reg = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');
		// return /'^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$'/.test(selector);
		return reg.test(selector);
	}
	kquery.isArray=function(selector){
		return typeof selector == "object" && length in selector;
	}
	kquery.isNumber=function(selector){
		return typeof selector == "number";
	}
	*/

	//暴露接口
	w.$=w.kquery=kquery;
})(window);