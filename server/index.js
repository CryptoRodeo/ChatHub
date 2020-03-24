let express = require('express');
let app = express();
let partials = require('express-partials');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let session = require('express-session');


//middleware
app.use(partials());
app.use(express.static(__dirname + '/../node_modules'))
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(session({secret: 'i got nothing to hide', resave:false, saveUninitialized: false}));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

app.get('/', function(req, res){
  res.render('pages/index.ejs');
});

io.on('connection', (socket) => {

  let useradded = false;

socket.on('new user', (username) =>{ 

  socket.broadcast.emit("new participant");
  if(useradded) return;
  socket.username = username;
  useradded = true;
  io.emit('display new user', socket.username);
});

  socket.on('chat message', (message_details) =>
  {
    let {current_user, message} = message_details;
    current_user.username = socket.username;
    current_user.message = message;
    io.emit('chat message', current_user);
  });

  socket.on('user is typing', (user) => {
    //console.log(`${user} is typing`);
  });

  socket.on('user has left', (username) => {
    console.log(`${username} has left the chat`);
    socket.disconnect();
  });
});

http.listen(8080, function(){
  io.emit('show all online users');
  console.log('listening on *:8080');
});