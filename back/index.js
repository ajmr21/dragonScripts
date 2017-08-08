'use strict';

var request = require('request');

var async = require('async');

var cheerio = require('cheerio');

var callArray = [];
var functionArray = [];
var sessionId = 'a46aa10fdba72f6075c13612be22b938';

var command = process.argv[2];

var objectId = 11971;

var takeObjectUrl = 'http://dragonislands.club/play/srv.php?a=map&b=take&c=_objectId&s='+sessionId;
var showObjectsUrl = 'http://dragonislands.club/play/srv.php?a=inv&b=show&c=4&d=aa&s='+sessionId;
var dropObjectUrl = 'http://dragonislands.club/play/srv.php?a=inv&b=drop&d=_objectId&c=4&s='+sessionId;

var actionToDo;

if (command === 'attack'){
	actionToDo = 'http://dragonislands.club/play/srv.php?a=mon&b=kill&c=1&s='+sessionId;

	functionArray.push(function(arg1, arg2, callback) {
		executeCall(actionToDo,callback);           
	});

	attackMonster();

} else if (command === 'take'){
	takeObjectListOfObject();           
} else if (command === 'drop'){
	dropObjects();
}



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

function attackMonster(){
	var i = 0;
	var refreshIntervalId = setInterval(function() {
		console.log('Ejecutando iteración ',i++);
		objectId++;
		async.waterfall(
		functionArray,
		function (err, caption) {
			i++;
		    console.log('Fin de iteración');
			}
		);

		if (i == 3000 || objectId > 167507){
			clearInterval(refreshIntervalId);
		}
	}, 1500);
}

function takeObjectListOfObject(){

	  request(takeObjectUrl, function (error, response, body) {
	    if (!error && response.statusCode == 200) {	    	
	    	var $ = cheerio.load(body);
			$('.pot div a').each(function(i, element){
		      var a = $(this);
		      let objectName = a.html(); 
		      if (objectName !== 'Key of mill'){
		      	takeObject(a.parent().next().attr('href').substr(16,6));
		      	console.log(objectName);
		      }	   
		      
		    });	      
	    }
 	});
}

function takeObject(objectId){
	var urlToCall = takeObjectUrl.replace('_objectId',objectId);
	console.log(urlToCall);
	setTimeout(function(url, myCallback) {
		request(url, function (error, response, body) {
		    if (!error && response.statusCode == 200) {
		    	//parseResponse(body);   
		    }
	 	});
	}, 3000, urlToCall, function(){});	
}


/*
console.log('Ejecutando iteración ',i++);
async.waterfall(
	functionArray,
    function (err, caption) {
    	i++;
        console.log('Fin de iteración');
        // Node.js and JavaScript Rock!
    }
);
*/


function executeCall(varUrl, callback){
	console.log('--->',varUrl);
	  request(varUrl, function (error, response, body) {
	    if (!error && response.statusCode == 200) {	    	  
	    }
 	});
}


function dropObjects(){
	var urlToCall = showObjectsUrl;
	request(urlToCall, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	var $ = cheerio.load(body);		    	
			console.log($('[type=hidden][name=d]')[0].attribs.value);
			urlToCall = dropObjectUrl.replace('_objectId',$('[type=hidden][name=d]')[0].attribs.value);
			executeCall(urlToCall,function(){});    				   
	    }
 	});	
}


