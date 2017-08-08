'use strict';

var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async');

const baseUrl = 'http://dragonislands.club/play/srv.php?';
const sessionId = '41fc3870f702216dea921375b4149d93_4df8803807';

var playerAndMonsterObject = {};
var playerArray = [], monsterArray = [];

//PRIVATE METHOD
var scrappePlayerAndMonster = (body) => {
	let $ = cheerio.load(body);
	$('[type="3"] .pot .navi').each(function(i, element){
      let monsterName = $(this).html();
      console.log($(this).html());       
      monsterArray.push({'name' : monsterName, 'id' : i});     
    });
    $('[type="4"] .pot .navi').each(function(i, element){
      let playerName = $(this).html();
      if (playerName !== 'Attack'){
	      let playerId = $(this).attr('href').substr(10,7);
	      let level = $(this).next().html();
	      playerArray.push({'name' : playerName, 'id' : playerId, 'level' : level}); 
      }    
    });   
}

//END PRIVATE METHOD

exports.getEntities = (req, res) => {
	playerArray = [], monsterArray = [];
	console.log('---Z',req.headers.sessionid);
	sessionId = req.headers.sessionid;
	let targetUrl = baseUrl+'a=map&s='+sessionId;
	let promiseGetEntities = new Promise((resolve, reject) => {
		request(targetUrl, function (error, response, body) {			
		    if (!error && response.statusCode == 200) {	    	
		    	scrappePlayerAndMonster(body);
		    	playerAndMonsterObject = {'monsters' : monsterArray, 'players' : playerArray};
			    //res.status(200).jsonp(playerAndMonsterObject);
			    resolve(playerAndMonsterObject);
		    } else {
		    	reject(new Error("Algo malo ha	pasado recuperando entities"));
		    }
	 	});
 	}).then((result)	=>	{		
		res.status(200).jsonp(result);
	}).catch((err) => {
		res.status(500).jsonp([]);
	});
};

exports.attackMonsters = (req, res) => {	
	for(var i=1; i<=req.body.number+1; i++){

		setTimeout(function(myCallback) {
		  	let targetUrl = baseUrl+'a=mon&b=kill&c=1&s='+sessionId;
			request(targetUrl, function (error, response, body) {
				
		 	});

		}, 1000*i, function(){});
	}
	res.status(200).jsonp({'result' : 'ok'});
};

exports.attackPlayers = (req, res) => {
	var i = 1;
	req.body.forEach(function(item, index){
		setTimeout(function(myCallback) {
		  	let targetUrl = baseUrl+'a=char&b=attack&c='+item+'&s='+sessionId;
			request(targetUrl, function (error, response, body) {
		    	if (req.body.length === index+1){		
		    		res.status(200).jsonp({'result' : 'ok'});
		    	}			    
		 	});
			
		}, 1500*i, function(){});
		i++;
	});
	
};