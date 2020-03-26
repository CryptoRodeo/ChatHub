let express = require('express');
let app = express();
let partials = require('express-partials');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let session = require('express-session');
//let { active_users } = require('./modules/users');


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

let active_users;

io.on('connection', (socket) => {

  active_users = active_users || [];
let useradded = false;

socket.on('new user', (new_user) =>{ 
  socket.broadcast.emit("new participant");
  if(useradded) return;
  new_user.id = socket.id;
  active_users.push(new_user);
  useradded = true;
  io.emit('update user info', new_user);
  io.emit('display new user', active_users);
});

  socket.on('chat message', (message_details) =>
  {
    let {current_user, message} = message_details;
    current_user.username = socket.username;
    current_user.message = message;
    io.emit('chat message', current_user);
  });

  socket.on('user is typing', () => {
    socket.broadcast.emit('user is typing', (socket.id));
  });

  socket.on('user stopped typing', () => {
    socket.broadcast.emit('user stopped typing', socket.id);
  })

socket.on('update user list' ,(new_user_list) => {
  active_users = new_user_list;
});

socket.on('user has left', () => {
  console.log('left');
  let disconnected_user_id = socket.id;
  io.emit('remove user', { disconnected_user_id, active_users}); 
});

socket.on('reconnect' , () => {
  let disconnected_user_id = socket.id;
  console.log('reconnect');
  io.emit('remove user', { disconnected_user_id, active_users});
});

});

http.listen(8080, function(){
  console.log('listening on *:8080');
});