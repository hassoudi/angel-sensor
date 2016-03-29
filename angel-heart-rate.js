// angel-heart-rate.js
// Connect to the Angel Sensor and print the heart rate in real-time
//
// Jordan Crouse <jordan+github@cosmicpenguin.net>
// Licensed under the MIT license

var angelID = process.argv[2].toLowerCase();

var AngelDevice = require('./lib/angel-device');
var NobleDevice = require('noble-device');

NobleDevice.Util.mixin(AngelDevice, NobleDevice.HeartRateMeasumentService);

console.log("scanning for Angel Sensor.  You may have to press the button...");

function connected(device) {
	console.log("Found Angel Sensor...");

	device.on('disconnect', function() {
		process.exit(0);
	});

	device.on('measumentChange', function(data) {
		    console.log("Heart Rate: " + data);
	});


	device.connectAndSetUp(function(err) {
		device.notifyMeasument(function(counter) {
			console.log('Watching heart rate. Ctrl-C to cancel...');
		});
	});
}

AngelDevice.connectAngel(angelID, connected);
