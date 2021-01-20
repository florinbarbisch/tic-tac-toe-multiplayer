var path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose'),
    socketIO = require('socket.io');

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();


app.use(cors());

app.io = require('socket.io')();

var server = require('http').Server(app);

app.io.attach(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});

/*
app.io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});*/
/*
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });



  setInterval(function() {
    io.emit('gameUpdate', {MultiplayerGame: {
      _id: "600741e10cc982e42f4842d0",
      player: {
          __dirname: "600474cda7419ba84a5065bd",
          username: "ass"
      },
      opponent: {
          _id: "6005d9a9b3f2b2d02b200fba",
          username: "root"
      },
      yourTurn: false,
      winner: "Ongoing",
      statusText: null,
      cell1: null,
      cell2: null,
      cell3: null,
      cell4: "O",
      cell5: "X",
      cell6: null,
      cell7: null,
      cell8: null,
      cell9: null
    }
  }); 
  console.log("emitting bullshit")
  // This will emit the event to all connected sockets every 5 secs
  }, 500000000);
  
});

*/

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'tictactoe', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/tictactoe');
  mongoose.set('debug', true);
}


require('./models/User');
require('./models/Article');
require('./models/MultiplayerGame');
require('./models/SingleplayerGame');
require('./models/Comment');
require('./config/passport');

app.use(require('./routes')(app.io));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


// finally, let's start our server...
server.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});
