var express = require('express'),
    app = express(),
    //createServer:调用该返回的对象中的 listen 方法，对服务端口进行监听
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    path = require('path'); // 提供用于处理文件和目录路径的工具

io.set('log level', 1); //将socket.io中的debug信息关闭

// websocket链接监听
io.on('connection', function(socket){
     // emit用于发送数据，在另一端接收时，可以这么写： socket.on('open',function(){...});
    socket.emit('open'); // 通知客户端已连接

    // 定义用户对象
    var client = {
      socket : socket,
      name : false,
      color : getColor()
    };

    // 监听message事件
    socket.io('message', function(msg){
        var obj = {
          time : getTime(),
          color : client.color
        };

        // 判断是不是第一次连接，以第一条消息作为用户名
        if(!client.name){
            client.name = msg;
            obj.text = client.name;
            obj.author = 'System';
            obj.type = 'welcome';
            console.log(client.name + ' login');

            // 返回欢迎语
            socket.emit('system', obj);
            // 广播新用户已登陆
            socket.broadcast.emit('system', obj);
        }else {
            // 不是第一次连接，则是正常的聊天信息
            obj.text = msg;
            obj.author = client.name;
            obj.type = 'message';
            console.log(client.name + ' say ' + msg);

            // 返回消息（可以省略）
            socket.emit('message', obj);
            // 向其他用户广播此消息
            socket.broadcast.emit('message', obj);
        }

    });
})
