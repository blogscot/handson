var emitter = require('events').EventEmitter;

function Ticker() {
	'use strict';
	emitter.call(this);
}

Ticker.prototype = Object.create(emitter.prototype);

Ticker.prototype.sendEvent = function(event) {
	'use strict';
	var that = this;
	setInterval(function() { that.emit(event); }, 1000);
};

var myTicker = new Ticker();

myTicker.sendEvent('tick');

var callback = function() {
	'use strict';
	var count = 0;
	return function() {
		console.log(count++);
	};
};

myTicker.addListener('tick', callback());
