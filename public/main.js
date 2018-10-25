$(function () {
       var socket = io();
       $('form').submit(function(){
         socket.emit('chat message', $('#m').val());
         $('#m').val('');
         return false;
       });

       socket.on('chat message', function(msg){
         $('#messages').append($('<p>').text(msg));
         window.scrollTo(0, document.body.scrollHeight);
       });

     socket.on('user left', function(data){
       $('#messages').append($('<p>').text("a user has been disconnected"));
     });

     socket.on('user joined', function(data){
       $('#messages').append($('<p>').text("a user has joined : " + data));
     });

     socket.on('iframe info', function(data){
       $('#messages').append($('<p>').text("iframe video info : " + data));
     });

});
