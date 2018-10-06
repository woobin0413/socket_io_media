var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
//look for a index.html file in views folder
app.use(express.static('views'));

io.on('connection',function(socket){
  socket.on('login',function(data){
    console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);

    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;
    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit('login', data.name );
  });

  socket.on('chat',function(data){
    console.log('Message from %s: %s', socket.name, data.msg);

    var msg = {
      from: {
        name:socket.name,
        userid: socket.userid
      },
      msg: data.msg
    };
    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit('chat', msg);

  });

  socket.on('disconnect',function(){
    io.emit('chat message', socket.name + " user disconnected");
    socket.disconnect();
  })
});

//  //client connection current status
//  io.on('connection', function(socket){
//    console.log('a user connected', socket.id);
//    socket.on('disconnect', function(){
//      io.emit('chat message', socket.id + " user disconnected");
//    });
//  });
//
// io.on('connection', function(socket){
//   io.emit('chat message', socket.id + " user connected");
//   socket.on('chat message', function(msg){
//     io.emit('chat message', socket.id + " : "+msg);
//   });
// });

http.listen(3000, function(){
  console.log('listening on *:3000');
});
