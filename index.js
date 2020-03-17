var express = require('express');
let app = express();
var http = require('http').createServer(app);
var socket = require('socket.io')(http);
app.use(express.static('node_modules'))
app.use(express.static('public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

  socket.on('connection', function(socket){
    socket.on('chat message', function(msg){
      socket.emit('chat message', msg);
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});