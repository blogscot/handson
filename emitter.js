var emitter = require('events').EventEmitter,
	util = require('util');

function Ticker() {
	emitter.call(this);
}

Ticker.prototype = Object.create(emitter.prototype);

Ticker.prototype.sendEvent = function(event) {
	var that = this;
	setInterval(function() { that.emit(event); }, 1000);
};

var myTicker = new Ticker();
var myListener = new Ticker();

myTicker.sendEvent('tick');

myTicker.addListener('tick', function(){console.log();});




