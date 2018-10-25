// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var fetchVideoInfo = require('youtube-info');
// var cheerio = require('cheerio')
// var $ = cheerio.load(mainPageContent);
//
// $('iframe').each(function(index, element) {
//     var url = $(element).attr('src'); // --> Get the URL of the iframe
//
//     // Do something with the URL of the iframe here
// });

server.listen(3000, function() {
  console.log('Server listening at port on 3000');
});


// Routing...
app.use(express.static('public'));

io.on('connection', function(socket) {
  socket.broadcast.emit('user joined', socket.id);
  fetchVideoInfo('zOeUbbJXtRQ').then(function (videoInfo) {
    socket.broadcast.emit('iframe info', videoInfo.duration);
  });
  console.log(socket.id);
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect',function(){
      socket.broadcast.emit('user left');
  });
});
