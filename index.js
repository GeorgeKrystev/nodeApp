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

app.get('/', function(req, res) {
	res.send('Hello world');		
	// res.json({hello: "world"});
});

var server = app.listen(3000, function() {
	console.log('Server running on port 3000');
})