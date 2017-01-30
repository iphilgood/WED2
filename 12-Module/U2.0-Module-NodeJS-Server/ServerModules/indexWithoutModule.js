const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');

const app = express();

app.use(session({  secret: 'gh45sdfgh3asd45df' }));
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');



// Model (ADT) Inline

// Sessions can only store JSON, not objects with methods
// Therefore counterJSON is implemented as a ADT with associated functions

function newCounterJSON () {
  return {count: 0, step: 1};
}

function countUp(counterJSON) {
  counterJSON.count += counterJSON.step;
}

function countDown(counterJSON) {
  counterJSON.count -= counterJSON.step;
}

// render support functions

function renderCount(counterJSON, response) {
  const context = {
    title: 'Counter Game',
    count: counterJSON.count,
  };
  response.render('game', context);
}

function initOrGetCounterJSON (request) {
  request.session.counterJSON = request.session.counterJSON || newCounterJSON();
  return request.session.counterJSON;
}

// rout handling

app.get('/', function (request, response) {
  const counterJSON = initOrGetCounterJSON(request);
  renderCount(counterJSON, response);
});

app.post('/up', function (request, response) {
  const counterJSON = initOrGetCounterJSON(request);
  countUp(counterJSON);
  renderCount(counterJSON, response);
});

app.post('/down', function (request, response) {
  const counterJSON = initOrGetCounterJSON(request);
  countDown(counterJSON);
  renderCount(counterJSON, response);
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('No token / Invalid token provided');
  }
  else
  {
    next(err);
  }
});

const hostname = '127.0.0.1';
const port = 3003;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
