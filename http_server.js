var http = require('http'),
	path = require('path'),
	fs = require('fs');

var server = http.createServer();

server.on('request', function(req, res) {
	'use strict';
	
	var file = path.normalize(__dirname+req.url);
	fs.exists(file, function(found){
		if(found) {
			fs.stat(file, function(err, stat){
				if (err) { throw err; }
				if (stat.isDirectory()) {
					res.writeHead(403);
					res.end('Forbidden');
				} else {
					var rs = fs.createReadStream(file);
					res.writeHead(200);
					rs.pipe(res);
				}
			});
		} else {
			res.writeHead(404);
			res.end('Not Found');
		}
	});
});

server.listen(3000);