var express	= require("express");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var port = 8081;
var requests = 0;


app.get('/', function (request, response) {
	requests++;
	var status = requests+' requests until app started';
	console.log(status);
	if(request.query.cookie) {
		console.log('cookie: '+request.query.cookie);
	}
	response.send(status);
});


var server = app.listen(port, function () {
	console.log('App listening at http://localhost:%s', port);
});
