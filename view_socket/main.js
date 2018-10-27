$(function () {
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<p>').text(msg));
  });



});

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
