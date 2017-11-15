let io = null;
let sockets = {};
module.exports = {
  init: function(server) {
    io = require('socket.io')(server);
    io.on('connection', function(socket){
      let userId = socket.handshake.query.id;
      sockets[userId] = socket;
      console.log('a user connected, id: ',userId);
    });
    io.on('connection', function(socket){
      socket.on('chat message', function(msg){
        console.log('message: ' + msg);
      });
    });
    io.on('connection', function(socket){
      socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
    });
        
    
        

  },
  instance: function() {
    return io;
  },
  sockets: function() {
    return sockets;
  }
}