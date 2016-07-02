// proper way to use http module -- Sam Aritoli
// var http = require('http');

// http.createServer(function(req, res) {
// 	res.writeHead(200, {
// 		'Content-Type': 'text/plain'
// 	});
// 	res.end('Hello world \n');
// }).listen(3000, '127.0.0.1');
// console.log('Server running on port 3000');

//express declaration
var express = require('express');
var	app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var cats = require('./cats.js');
 
var server = app.listen(3000, function() {
	console.log('Server running on port 3000');
})