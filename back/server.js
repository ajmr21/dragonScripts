var express = require('express'),
  app = express(),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 3000;

app.use(cors()); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);
app.set('setting', {'session':'lalalalal'});

var routes = require('./routes/routes');
routes(app);

console.log('todo list RESTful API server started on: ' + port);