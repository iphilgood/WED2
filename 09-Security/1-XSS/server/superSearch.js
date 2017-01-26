var express	= require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var expressHandlebars = require('express-handlebars');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ cookie: { httpOnly: false, saveUninitialized: true, resave: true }, secret: 'gh45sdfgh5asd45df' }));
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');


var port = 8080;
var searches = [];


app.get('/', function (request, response) {
	var context = {
		layout: false,
		title: 'Super social search',
		searches: searches,
		hasSearches: searches.length > 0
	};
	if(request.session.username && request.session.creditcard) {
		context.username = request.session.username;
		context.creditcard = request.session.creditcard;
	}
	response.render('search', context);
});

app.post('/', function (request, response) {
	var context = {
		layout: false,
		title: 'Super social search',
		searches: searches
	};
	if(request.body.search && request.body.search != '') {
		context.lastSearch = request.body.search;
		searches.push(request.body.search);
	}
	if(request.body.username && request.body.username != '' && request.body.password && request.body.creditcard && request.body.creditcard != '') {
		request.session.username = request.body.username;
		request.session.creditcard = request.body.creditcard;
	}
	if(request.body.logout) {
		request.session.username = null;
		request.session.creditcard = null;
	}
	if(request.session.username && request.session.creditcard) {
		context.username = request.session.username;
		context.creditcard = request.body.creditcard;
	}
	context.hasSearches = searches.length > 0;
	response.render('search', context);
});


var server = app.listen(port, function () {
	console.log('App listening at http://localhost:%s', port);
});
