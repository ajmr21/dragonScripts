'use strict';

var request = require('request');

var async = require('async');

var callArray = [];
var functionArray = [];
var sessionId = 'ae2936309d0000e5447f4687bd2a068b';


var attackMonster = 'http://dragonislands.club/play/srv.php?a=mon&b=kill&c=1&s='+sessionId;

functionArray.push(function(arg1, arg2, callback) {
        	executeCall(attackMonster,callback);           
        });

/*
functionArray.push(function(callback) {
        	executeCall('http://dragonislands.club/play/srv.php?a=talk&b=151&s=8c1bc2d13b478279e027aa7d076ccb6a',callback);           
        });

callArray.forEach(function(item){
	functionArray.push(function(arg1, arg2, callback) {
        	executeCall(item,callback);           
        });
});
*/
var i = 0;

console.log('Ejecutando iteración ',i++);
async.waterfall(
	functionArray,
    function (err, caption) {
    	i++;
        console.log('Fin de iteración');
        // Node.js and JavaScript Rock!
    }
);


var refreshIntervalId = setInterval(function() {
  console.log('Ejecutando iteración ',i++);
  async.waterfall(
	functionArray,
    function (err, caption) {
    	i++;
        console.log('Fin de iteración');
        // Node.js and JavaScript Rock!
    }
);
  if (i == 3000){
  	clearInterval(refreshIntervalId);
  }
}, 1500);


function executeCall(varUrl, callback){
	//setTimeout(function(url, myCallback) {

		  request(varUrl, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		        //callback(null, 'Yes', 'it');
		    }
	 	});

	//	}, 2000, varUrl, function(){});
}

/*
callArray.forEach(function(item){

	setTimeout(function(str1) {
	  console.log('------>'+str1);

	  request(item, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	console.log('-----------------------------');
	        console.log(body)
	        console.log('-----------------------------');
	    }
 	});
	}, 10000, item);

	
});*/

