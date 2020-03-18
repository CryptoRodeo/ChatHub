let express = require('express');
let app = express();
let partials = require('express-partials');
let http = require('http').createServer(app);
let socket = require('socket.io')(http);


//middleware
app.use(partials());
app.use(express.static(__dirname + '/../node_modules'))
app.use(express.static(__dirname + '/../public'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

app.get('/', function(req, res){
  res.render('pages/index.ejs');
});

  socket.on('connection', function(socket){
    console.log("a new user has connected");
    
    socket.on('chat message', function(msg){
      socket.emit('chat message', msg);
    });
  });

  socket.on('disconnect', () => {
    console.log("user disconnected");
  })

http.listen(8080, function(){
  console.log('listening on *:8080');
});