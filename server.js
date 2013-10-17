#!/usr/bin/env node

// http://www.davidmclifton.com/2011/07/22/simple-telnet-server-in-node-js/

var Server = (function(){
	var module = {
    net:          require('net'),
    name:         'Server',
    connections:  [],
    server:       null,
    port:         4000,
    
		start: function start(){
      module.server = module.net.createServer(module.newConnection).listen(module.port);
		}, // module.start()
    
    cleanInput: function cleanInput(data){
      return data.toString().replace(/(\r\n|\n|\r)/gm, '');
    },
    
    receiveData: function receiveData(sender, data){
      switch (true) {
        case (module.cleanInput(data) == 'quit'):
          sender.end('BYE NOW!\n');
          break;
        default:
          module.connections.forEach(function(socket){
            if (socket != sender) socket.write(data);
          });
      }
    }, // module.receiveData(data)
    
    closeSocket: function closeSocket(socket) {
    	var i = module.connections.indexOf(socket);
    	if (i != -1) {
    		module.connections.splice(i, 1);
    	}
    }, // module.closeSocket(socket)
    
    newConnection: function newConnection(socket){
      module.connections.push(socket);
      socket.write('SWORDS!\n');
      
      socket.on('data', function(data){ module.receiveData(socket, data); });
      socket.on('end', function(){ module.closeSocket(socket); });
    }, // module.newConnection(socket)
	};
	
	return module;
}(Server || {}));

Server.start();