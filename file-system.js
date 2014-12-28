var fs = require('fs');

fs.stat('package.json', function(err, stats) {
	if (err) { console.error(err.message); return; }
	console.log('File size: '+stats.size);
});