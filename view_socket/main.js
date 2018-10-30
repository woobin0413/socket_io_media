//client sends data to server
var socket = io();
var player;

//youtube iframe information
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    //youtube id
    videoId: 'zOeUbbJXtRQ',
    events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
    }
  });
};

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
// event.target.playVideo();
  event.target.mute();
}
//    The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(onclickPause, 6000);
    done = true;
  }
  socket.emit('video time', event.target.getCurrentTime());
}

// when click on pause button, other videoes stop
function onclickPause() {
  player.pauseVideo();
};
// when click on start button, other videoes stop
function onclickStart() {
  player.playVideo();

};

//when submitting, username and message will be sent to client
$(function () {
       $('form').submit(function(){
         var user = $('#username').val();
         if(user)
         socket.emit('chat message', user + ": " + $('#m').val());

         else {
           socket.emit('chat message', "No username found");
         }

         return false;
       });

       $(document).ready(function() {
          //clear when submitted
       $('form').submit(function() {
           $('#m').val("");
         });
       });

       $('#startBtn').click(function(){
         socket.emit('video start');
       });

       $('#pauseBtn').click(function(){
         socket.emit('video stop');
       });


       // client receives msg from server
       socket.on('chat message', function(msg){
         $('#messages').append($('<p>').text(msg));

         window.scrollTo(0, document.body.scrollHeight);
       });

       socket.on('video time', function(time){
          player.seekTo(time, true);
       });

       socket.on('video start', function(){
         onclickStart();
       });

       socket.on('video stop', function(){
         onclickPause();
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
