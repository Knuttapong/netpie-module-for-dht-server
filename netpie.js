var MicroGear = require('microgear');
const KEY    = '';
const SECRET = '';
const APPID     = ''; 

var microgear = MicroGear.create({
	key : KEY,
	secret : SECRET
});

exports.timeserie = [
  	{"target": "temp", "datapoints": [ ]},
  	{"target": "humid", "datapoints": [ ]}
];

var temp = 0;
var humid = 0;
var count = 0;

microgear.on('connected', function() {
	console.log('Connected...');
	microgear.setalias("nodejs-server");
	microgear.subscribe("/dht");

	setInterval(function() {
    		now = Date.now();
    		exports.timeserie[0].datapoints[count] = [temp, now];
    		exports.timeserie[1].datapoints[count] = [humid, now];
    		count++;
	},5000);
});

microgear.on('message', function(topic,body) {
  	dht = body+"";
  	data = dht.split(",");
  	temp = data[1];
  	humid = data[0];
});

microgear.on('closed', function() {
	console.log('Closed...');
});

microgear.connect(APPID);

