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
  
  socket.on('username', (name) => {
    if(useradded) return;
    socket.username = name;
    useradded = true;
});

socket.on('new user', (user) => {
  socket.broadcast.emit('user has joined the chat', user);
});

  socket.on('chat message', function(msg){
    let user = {};
    user.message = msg;
    user.name = socket.username;
    io.emit('chat message', user);
  });

  socket.on('user is typing', (user) => {
    console.log(`${user} is typing`);
  })
});




http.listen(8080, function(){
  console.log('listening on *:8080');
});