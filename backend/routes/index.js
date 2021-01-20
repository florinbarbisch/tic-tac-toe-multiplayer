var app = require('express');
var router = app.Router();

router.use('/api', require('./api'));


module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  return router;
};
