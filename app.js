// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000, () => {
  console.log('Server listening at port on 3000');
});

// Routing
app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('new message', function(data) {
    socket.broadcast.emit('new message', {
      time: socket.time;
      message: data;
    });
  });
});
//
// io.on('connection', (socket) => {
//   var addedUser = false;
//
//   // when the client emits 'new message', this listens and executes
//   socket.on('new message', (data) => {
//     // we tell the client to execute 'new message'
//     socket.broadcast.emit('new message', {
//       username: socket.username,
//       message: data
//     });
//   });
//
//   // when the client emits 'add user', this listens and executes
//   socket.on('add user', (username) => {
//     if (addedUser) return;
//
//     // we store the username in the socket session for this client
//     socket.username = username;
//     ++numUsers;
//     addedUser = true;
//     socket.emit('login', {
//       numUsers: numUsers
//     });
//     // echo globally (all clients) that a person has connected
//     socket.broadcast.emit('user joined', {
//       username: socket.username,
//       numUsers: numUsers
//     });
//   });
//
//   // when the client emits 'typing', we broadcast it to others
//   socket.on('typing', () => {
//     socket.broadcast.emit('typing', {
//       username: socket.username
//     });
//   });
//
//   // when the client emits 'stop typing', we broadcast it to others
//   socket.on('stop typing', () => {
//     socket.broadcast.emit('stop typing', {
//       username: socket.username
//     });
//   });
//
//   // when the user disconnects.. perform this
//   socket.on('disconnect', () => {
//     if (addedUser) {
//       --numUsers;
//
//       // echo globally that this client has left
//       socket.broadcast.emit('user left', {
//         username: socket.username,
//         numUsers: numUsers
//       });
//     }
//   });
// });
