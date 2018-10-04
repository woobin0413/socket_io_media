var express = require('express');
var app = express();
var server = app.listen(3000,function(){
  console.log('Connected, 3000 port!');
});

//static files
 app.set('view engine', 'pug');
 app.set('views','./views/');

 app.get('/', function(req,res){
   res.render('index');
 })
// app.use(express.static('views'));
