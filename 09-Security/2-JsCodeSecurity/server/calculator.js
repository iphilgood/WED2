var express	= require("express");
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

var port = 8082;


app.get('/', function (request, response) {
	response.render('calculator', { title: 'Simple calculator', calculation: '' });
});

app.post('/', function (request, response) {
	'use strict';

	var result = '';
	var calculation = request.body.calculation || '';

	if(request.body && request.body.calculation && request.body.calculation != '' && /^[\d+-*/]+$/.test(request.body.calculation)) {
		try {
			result = eval(request.body.calculation);
		} catch(e) {
			console.warn(e);
		}
	}
	response.render('calculator', { title: 'Simple calculator', result: result, calculation: calculation });
});


var server = app.listen(port, function () {
	console.log('App listening at http://localhost:%s', port);
});
