# 说明

1. broadcast.html 为广播通道
2. 每个页面引用 https://shuise.github.io/local-broadcast/broadcast.js

## 初始化说明

```
/*
	domains: 广播范围
	receive: 页面接收方法
*/

broadcast.init({
	domains: ['localhost','dev.jeff.com','projects.bluetech.top'],
	receive: function(data){
		console.log(data);
	}
});
``` 


## 发送

```
var data = 'from demo.html' + (new Date().getTime());
broadcast.send(data);
```