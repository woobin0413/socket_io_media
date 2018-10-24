// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000, function() {
  console.log('Server listening at port on 3000');
});

// Routing..
app.use(express.static('public'));

io.on('connection', function(socket) {
  socket.broadcast.emit('user joined', socket.id);
  console.log(socket.id);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect',function(){
      socket.broadcast.emit('user left');
  });
});
