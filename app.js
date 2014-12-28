var fs = require('fs');

var readStream = fs.createReadStream('package.json');

readStream.setEncoding('utf8');

readStream.on('data', function(data) {
	console.log(data);
});

readStream.on('end', function() {
	console.log('file ended');
});