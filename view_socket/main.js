
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'zOeUbbJXtRQ'
  });
};

function onclickPause() {
  player.pauseVideo();
};

function onclickStart() {
  player.playVideo();

};


$(function () {
       var socket = io();

       $('form').submit(function(){
         var user = $('#username').val();
         socket.emit('chat message', user + ": " + $('#m').val());

         return false;
       });
       $('#startBtn').click(function(){
         socket.emit('video start');
       });

       //
       // $('#demo').submit(function(){
       //   socket.emit('username', $('#').val());
       //   return false;
       // });

       socket.on('chat message', function(msg){
         $('#messages').append($('<p>').text(msg));

         window.scrollTo(0, document.body.scrollHeight);
       });

       socket.on('video start', function(){
         onclickStart();
       });


     socket.on('user left', function(data){
       $('#messages').append($('<p>').text("a user has been disconnected"));
     });

     socket.on('user joined', function(){
       $('#messages').append($('<p>').text("a user has joined"));
     });

     socket.on('iframe info', function(data){
       $('#messages').append($('<p>').text("iframe video info : " + data));
     });
   });
