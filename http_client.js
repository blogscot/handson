var http = require('http');

var options = {
	host: 'www.google.com',
	port: 80,
	path: '/upload',
	method: 'POST'
};

var req = http.request(options, function(res) {
	console.log('Status: '+res.StatusCode);
	console.log('Headers: '+JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function(chunk){
		console.log('Body: '+chunk);
	});
});

// write data to request body
req.write('clickheretoreboot');
req.end();

// http.get(options, function(res) {
// 	console.log('got response: '+res.statusCode);
// }).on('error', function(err){
// 	console.error('got error: '+err.message);
// });