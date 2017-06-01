'use strict';

var request = require('request');

var async = require('async');

var command = process.argv[2];

console.log(command);

var itemArray = [];
var callArray = [];
var functionArray = [];
var sessionId = '1ba3e6720c80d23c3d028c776ed3b54a';

var objectId = '6376';


var attackMonster = 'http://dragonislands.club/play/srv.php?a=mon&b=kill&c=1&s='+sessionId;

var sellObject = 'http://dragonislands.club/play/srv.php?a=talk&c=sell_'+objectId+'&s='+sessionId;


//itemArray.push('166276');
//itemArray.push('166280');
//itemArray.push('166292');
//itemArray.push('166416');
//itemArray.push('166449');
itemArray.push('166457');
itemArray.push('166458');
//itemArray.push('166460');
itemArray.push('166465');
itemArray.push('166467');
itemArray.push('166475');
itemArray.push('166477');
itemArray.push('166480');
itemArray.push('166504');
itemArray.push('166539');
itemArray.push('166582');
itemArray.push('166599');
itemArray.push('166603');
itemArray.push('166613');

var i = 0;


/*callArray.push('http://dragonislands.club/play/srv.php?a=map&b=take&c='+itemArray[0]+'&s='+sessionId);
callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_1&s='+sessionId);
callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_4&s='+sessionId);
callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_8&s='+sessionId);
callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_1&s='+sessionId);
callArray.push('http://dragonislands.club/play/srv.php?a=talk&b=4&s='+sessionId);*/
//callArray.push('http://dragonislands.club/play/srv.php?a=talk&c=sell_'+itemArray[i]+'&s='+sessionId);

if (command === 'ir'){
	callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_3&s='+sessionId);
	callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_6&s='+sessionId);
	callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_2&s='+sessionId);
	callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_3&s='+sessionId);

	functionArray.push(function(callback) {
        	executeCall('http://dragonislands.club/play/srv.php?a=talk&t=Goodbye&s='+sessionId,callback);
        });

} else {
	callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_4&s='+sessionId);
	callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_8&s='+sessionId);
	callArray.push('http://dragonislands.club/play/srv.php?a=map&c=go_1&s='+sessionId);
	callArray.push('http://dragonislands.club/play/srv.php?a=talk&b=4&s='+sessionId);
	functionArray.push(function(callback) {
        	executeCall('http://dragonislands.club/play/srv.php?a=map&c=go_1&s='+sessionId,callback);
        });
}

callArray.forEach(function(item){
	functionArray.push(function(arg1, arg2, callback) {
        	executeCall(item,callback);           
        });
});

console.log('Ejecutando iteración ',i++);
async.waterfall(
	functionArray,
    function (err, caption) {
    	i++;
        console.log('Fin de iteración');
        // Node.js and JavaScript Rock!
        clearInterval(refreshIntervalId);
    }
);


var refreshIntervalId = setInterval(function() {
  //console.log('Ejecutando iteración ',i);
  async.waterfall(
	functionArray,
    function (err, caption) {
    	i++;
        console.log('Fin de iteración');
        clearInterval(refreshIntervalId);
    }
);
}, 45000);



function executeCall(varUrl, callback){
	setTimeout(function(url, myCallback) {
		  console.log('------>',url);

		  request(url, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        myCallback(null, 'Yes', 'it');
		    }
	 	});

		}, 1500, varUrl, callback);
}