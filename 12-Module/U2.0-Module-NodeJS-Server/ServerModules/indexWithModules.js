const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');

const app = express();

app.use(session({  secret: 'gh45sdfgh3asd45df' }));
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');




// Sessions can only store JSON, not objects with methods
// The reason is, that this way it is easier to manage a memcach store such a redis
// Therefore counterJSON is implemented as a ADT with associated functions

CounterJsonAPI = require('./CounterJsonAPI');
Config = require('./config.js');

const config = new Config(5, 8);

console.log(CounterJsonAPI);


// render support functions

function renderCount(counterJSON, response) {
  const context = {
    title: 'Counter Game',
    count: counterJSON.count,
  };
  response.render('game', context);
}

function initOrGetCounterJSON(request) {
  request.session.counterJSON = request.session.counterJSON || CounterJsonAPI.newCounterJSON(config);
  return request.session.counterJSON;
}

// rout handling

app.get('/', function (request, response) {
  const counterJSON = initOrGetCounterJSON(request);
  renderCount(counterJSON, response);
});

app.post('/up', function (request, response) {
  const counterJSON = initOrGetCounterJSON(request);
  CounterJsonAPI.countUp(counterJSON);
  renderCount(counterJSON, response);
});

app.post('/down', function (request, response) {
  const counterJSON = initOrGetCounterJSON(request);
  CounterJsonAPI.countDown(counterJSON);
  renderCount(counterJSON, response);
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('No token / Invalid token provided');
  }
  else
  {
    response.render('error', err);
  }
});

const hostname = '127.0.0.1';
const port = 3004;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
