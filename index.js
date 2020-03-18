let express = require('express');
let app = express();
let partials = require('express-partials');
let http = require('http').createServer(app);
let socket = require('socket.io')(http);

//middleware
app.use(partials());
app.use(express.static('node_modules'))
app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', function(req, res){
  res.render('pages/index.ejs');
});

  socket.on('connection', function(socket){
    socket.on('chat message', function(msg){
      socket.emit('chat message', msg);
    });
  });

http.listen(8080, function(){
  console.log('listening on *:8080');
});