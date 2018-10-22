$(function () {
       var socket = io();
       $('form').submit(function(){
         socket.emit('chat message', $('#m').val());
         $('#m').val('');
         return false;
       });

       socket.on('chat message', function(msg){
         $('#messages').append($('<li>').text(msg));
         window.scrollTo(0, document.body.scrollHeight);
       });

     socket.on('user left', function(data){
       $('#messages').append($('<li>').text("a user has been disconnected"));
     });

     socket.on('disconnect', function(){
       $('#messages').append($('<li>').text("a user has been disconnected"));
     });


  });
