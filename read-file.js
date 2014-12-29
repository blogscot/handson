var fs = require('fs');
fs.open('package.json', 'r', function(err, fd) {
	'use strict';
	if (err) { throw err; }

	var readBuffer = new Buffer(10),
	bufferOffset = 0,
	bufferLength = 5,
	filePosition = 5;

	/* 
	 * I noticed when I printed out the whole readBuffer (and not a slice)
	 * that both results where the same. As fs.read() is asynchronous the
	 * second read() doesn't wait for the first to finish.
	 * 
	 */

	//<Buffer 7b 0a 20 20 22 // 6e 61 6d 65 22 // 3a 20 22 68 61 //6e 64 73 
		fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition,
		function(err, readBytes) {
			if (err) { throw err; }

			console.log('just read '+readBytes+' bytes');
			if (readBytes) {
				console.log(readBuffer.slice(0, 5));
				console.log(readBuffer);
			}
		});

	bufferOffset = 5;
	bufferLength = 5;
	filePosition = 10; 

		fs.read(fd, readBuffer, bufferOffset, bufferLength, filePosition,
		function(err, readBytes) {
			if (err) { throw err; }

			console.log('just read '+readBytes+' bytes');
			if (readBytes) {
				console.log(readBuffer.slice(5, readBuffer));
				console.log(readBuffer);  // two results are the same
			}
		});

	fs.close(fd, function() {
		console.log('File closed');
	});
});