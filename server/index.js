let express = require('express');
let app = express();
let partials = require('express-partials');
let http = require('http').createServer(app);
let socket = require('socket.io')(http);


//middleware
app.use(partials());
app.use(express.static(__dirname + '/../node_modules'))
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded());


app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

let pass_user_date = (data) => {
  return data;
}

app.get('/', function(req, res){
  res.render('pages/index.ejs');
});

app.get('/chat&username=:username', (req,res) => {
  let username = req.query.username;
  res.render('pages/chat',{username});
});

app.post('/add-user', (req,res) => {
  let username = req.body.username;
  res.redirect(`/chat&username=${username}`);
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