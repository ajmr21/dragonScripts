'use strict';

var request = require('request'),
	cheerio = require('cheerio'),
	async = require('async');

const baseUrl = 'http://dragonislands.club/play/srv.php?';
const sessionId = '41fc3870f702216dea921375b4149d93_4df8803807';

var itemsArray = [], functionItemsArray = [];

//PRIVATE METHOD
var scrappeItems = (body) => {
	let $ = cheerio.load(body);
	$('.pot div a').each((i, element) => {      
      let objectName = $(this).html();       
      	//takeObject(a.parent().next().attr('href').substr(16,6));
      	//RETRIEVE THE OBJECT ID FROM THE DETAIL
      let id = $(this).attr('href').substr(21,2);
      	functionItemsArray.push((callback) => {
      		request(baseUrl + 'a=inv&b=show&c=11&d=' + id + '&s=' + sessionId, (error, response, body) => {
			    if (!error && response.statusCode == 200) {
			    	let $ = cheerio.load(body);
			    	let objectId = $('[type=hidden][name=d]')[0].attribs.value;				
					itemsArray.push({'name' : objectName, 'id' : objectId});
			    }
			    callback(null);
	 	});
      	});             
    });
}

//END PRIVATE METHOD

exports.getItems = (req, res) => {
	itemsArray = [];
	functionItemsArray = [];

	sessionId = req.headers.sessionid;

	let targetUrl = baseUrl+'a=inv&c=11&s='+sessionId;

	let promiseGetItems = new Promise((resolve, reject) => {
		request(targetUrl, (error, response, body) => {
	    if (!error && response.statusCode == 200) {
	    	scrappeItems(body);
	    	async.waterfall(
				functionItemsArray,
	    		(err) => {
	    			resolve(itemsArray);
	        		//res.status(200).jsonp(itemsArray);
	    		}
			);
		    
	    } else {
	    	reject(new Error("Algo	malo ha	pasado recuperando items"));
	    }
 	});
	}).then((result)	=>	{		
		res.status(200).jsonp(result);
	}).catch((err) => {		
		res.status(500).jsonp([]);
	}); 
};

exports.sellItems = (req, res) => {
	var i = 1;
	var targetUrl = baseUrl+'a=talk&b='+item+'&s='+sessionId;
	request(targetUrl, (error, response, body) => {
		req.body.forEach((item, index) => {
			setTimeout((myCallback) => {
		  		targetUrl = baseUrl+'a=talk&c=sell_'+item+'&s='+sessionId;
				request(targetUrl, (error, response, body) => {
		    		if (req.body.length === index+1){		
		    			res.status(200).jsonp({'result' : 'ok'});
		    		}			    
		 		});		
			}, 1500*i, () => {});
			i++;
		});
	});

};