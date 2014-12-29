var tls = require('tls'),
    fs = require('fs');

var port = 3000,
    host = 'localhost',
    options = {
    	key :  fs.readFileSync('../openssl/client1.key'),
    	cert : fs.readFileSync('../openssl/client1.pem'),
    	ca :   fs.readFileSync('../openssl/ca.pem')
    };

var cleartextStream = tls.connect(port, host, options, function() {
	'use strict';
	console.log('connected');
	console.log('authorised: '+cleartextStream.authorized);
});
cleartextStream.setEncoding('utf8');
cleartextStream.on('data', function(data) {
	'use strict';
  console.log(data);
});
cleartextStream.on('end', function() {
	'use strict';
  cleartextStream.close();
});