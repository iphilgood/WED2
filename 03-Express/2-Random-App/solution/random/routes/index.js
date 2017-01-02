var express = require('express');
var router = express.Router();
var randomService = require('../services/randomService');
var qs = require('qs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('random', { title: 'Random' });
});

router.post('/random', function(req, res, next) {
  let from = Number(req.body.from || 1);
  let to = Number(req.body.to || 10);
  let quantity = Number(req.body.quantity || 2);

  res.redirect("/random?"+qs.stringify({from, to, quantity}));
});


router.get('/random', function(req, res, next) {
  let from = Number(req.query.from || 1);
  let to = Number(req.query.to || 10);
  let quantity = Number(req.query.quantity || 2);
  renderResult(req, res, next, to, from, quantity)

});

function renderResult(req, res, next, to, from, quantity){

  if( to <= from)
  {
    next(new Error("from should be lower than to"));
    return;
  }
  if( quantity  <= 0)
  {
    next(new Error("quantity should be >= 1"));
    return;
  }

  res.render('randomResult', { title: 'Random Result', result : {from, to, quantity, list : randomService.getRandomList(quantity, from, to)} });
}


module.exports = router;
