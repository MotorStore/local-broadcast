"use strict";

/*
模块化: http://www.ruanyifeng.com/blog/2012/10/javascript_module.html

es6 module: http://es6.ruanyifeng.com/#docs/module

CMD规范: https://github.com/seajs/seajs/issues/242
AMD规范: https://github.com/amdjs/amdjs-api/wiki/AMD

requirejs: http://requirejs.org/docs/whyamd.html
*/

;(function (global, factory) {
    if(typeof exports === 'object' && typeof module !== 'undefined'){
    	module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
    	define(factory);
    }else{
    	global['broadcast'] = factory();
    }
})(window, function(){ 
	//https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage

	var domains = ['*'];
	var tunnel = 'http://projects.bluetech.top/local-broadcast/broadcast.html';
	var tunnelDomain = new URL(tunnel).hostname;

	var id = 'BetopBroadCast' + new Date().getTime();
	var pipe = document.getElementById(id);

	var send = function(data){
		// console.log(domains);

		// pipe.onload = function(){
		    tunnel = new URL(tunnel);
		    var pipeOrigin = tunnel.origin;

		    var datas = {
		    	data: data,
		    	from: location.href
		    };

			console.log('send');
			// console.log(datas);

		    pipe.contentWindow.postMessage(datas, pipeOrigin);
		// }
	};

	var init = function(config){
		domains = config.domains;
		var receive = config.receive || function(data){
			console.log(data);
		};

		window.addEventListener("message", function(event){
			console.log('parent receive')
			// console.log(event)
		
			var origin = event.origin || event.originalEvent.origin; 
			if(origin.indexOf(tunnelDomain) > -1){
				receive(event.data);
			}
		}, false);

		if(!pipe){
			pipe = document.createElement('iframe');
	    	pipe.id = id;
	    	pipe.src = tunnel + '?domains=' + domains.join(',');
		}

		document.body.appendChild(pipe);
		pipe.onload = function(){
			send('create connection');
		}
	}

	return {
		send: send,
		init: init
	};
});

