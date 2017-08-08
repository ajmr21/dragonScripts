# Primer API Rest con Restify II
#### tomando como base el código del ejercicio anterior 

```javascript
'use strict';

const restify = require('restify');

const server = restify.createServer();
server.use(restify.bodyParser({ mapParams: true }));

const notes = [];

server.post('/notes', addNote);
server.get('/notes', listNotes);

server.listen(3000, (err) => {
	console.log('%s listening at %s', server.name, server.url);
}); 

function addNote (req, res, next) {
	const note = req.body;
	
	notes.push(note);
	res.send({operation: 'ok'});
	next();
}

function listNotes (req, res, next) {
    res.send(notes);
    next();
}
```
##

#### vamos a continuar escribiendo nuestro api de notas

1. Editar una nota:
>[PUT] **servername:3000/notes/:noteid** 

en el body le pasaremos:

| element        | example       | 
| -------------- |:-------------:|
| title          | comprar leche | 
| date           | 2017/02/08    |   
| completado     | false         |

y reemplazará la nota completamente por el nuevo que enviemos

2. Borrar una not:
>[GET] **servername:3000/notes/:noteid** 

Borrará la nota por su id.
