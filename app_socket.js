// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var fetchVideoInfo = require('youtube-info');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views','./view_socket');

server.listen(3000, function() {
  console.log('Server listening at port on 3000!!!!');
});

app.get('/',function(req,res){
  res.render('view');
})


io.on('connection', function(socket) {
  socket.broadcast.emit('user joined');


  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('video time', function(time){
    io.emit('video time', time);

  });

  socket.on('video start', function(){
    io.emit('video start');
  });

  socket.on('video stop', function(){
    io.emit('video stop');
  });



  socket.on('disconnect',function(){
      socket.broadcast.emit('user left');
  });
});
