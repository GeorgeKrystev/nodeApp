var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var petRoutes =require('./routes/pets.js')(app);

var server = app.listen(3002, function() {
	console.log('pets server running on port 3002');
})