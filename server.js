var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

var io = require('socket.io')(server);

var database = [];

var history = [];

io.on('connection', function (socket) {
    //History
  history.forEach(message => {
        io.emit('message', message)
  })
  socket.on('message', function (msg) {
   history.push(msg)
      io.emit('message', msg)
  });
});

server.listen(8080, 'localhost', function () {
  var addr = server.address();
  console.log("Chat server running at", addr.address + ":" + addr.port);
});