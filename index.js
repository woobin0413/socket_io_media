var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//look for a index.html file in views folder
app.use(express.static('views'));

 //client connection current status
 io.on('connection', function(socket){
   console.log('a user connected', socket.id);
   socket.on('disconnect', function(){
     console.log('user disconnected', socket.id);
   });
 });

//  //chat message printed in console
//  io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

//chat message shared by connected users
io.on('connection', function(socket){
  io.emit('chat message', "a user connected");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
