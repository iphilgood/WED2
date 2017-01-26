var express	= require("express");
var bodyParser = require('body-parser');
var basicAuthentication = require('basic-auth-connect');
var expressHandlebars = require('express-handlebars');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

var port = 8084;


app.get('/', function (request, response) {
	response.render('account', { title: 'Simple login' });
});

app.post('/', function (request, response) {
	var loginName = request.body.login || '';
	response.render('account', { title: 'Simple login', loginName: loginName });
});



var authentication = basicAuthentication('hsr', 'welcome');

app.get('/intranet', authentication, function (request, response) {
	response.render('intranet', { title: 'Intranet' });
});


var server = app.listen(port, function () {
	console.log('App listening at http://localhost:%s', port);
});
