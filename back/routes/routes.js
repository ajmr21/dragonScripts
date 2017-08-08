'use strict';
module.exports = (app) => {
  var itemsControllers = require('../controllers/itemsController'),
      entitiesController = require('../controllers/entitiesController');


  // todoList Routes
  app.route('/items')
    .get(itemsControllers.getItems)
    .post(itemsControllers.sellItems);

  app.route('/entities')
    .get(entitiesController.getEntities);  

  app.post('/entities/monsters', (req, res) => {  
	  entitiesController.attackMonsters(req, res);
	});
  app.post('/entities/players', (req, res) =>{  
	  entitiesController.attackPlayers(req, res);
	});

};