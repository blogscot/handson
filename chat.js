var tcp = require('net');

var sockets = [];

var server = tcp.createServer(function(socket) {
	'use strict';

	sockets.push(socket);

	socket.on('data', function(data) {
		sockets.forEach(function(socket) {
			socket.write(data);
		});
	});

	socket.on('end', function() {
		var pos = sockets.indexOf(socket.toString());
		if (pos > 0) {
			sockets.splice(pos,1);
		}
	});
});

server.listen(4000);
