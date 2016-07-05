var r = require('request').defaults({
	json: true
}),
	async = require('async');
	// redis = require('redis'),
	// client = redis.createClient(6379, '127.0.0.1');

module.exports = function(app) {
	// read

	app.get('/pets', function(req, res) {
 		async.parallel({
 			cat: function(callback) {
 				r({ uri: 'http://localhost:3000/cat' }, function(error, response, body){
 					if (error) {
 						callback({ 
 							service: 'cat', 
 							error: error });
 						return;
 					};
 					if ( !error && response.statusCode === 200 ) {
 						callback(null, body);
 					} else { 
 						callback(response.statusCode)
 					}
 				});
 			},
 			dog: function(callback) {

 				client.get('http://localhost:3001/dog', function(error, dog){
 					if (error) {
 						throw error;
 					}
 					if (dog) {
	 						callback(null, JSON.parse(dog)); 
 					} else {
		 				r({ uri: 'http://localhost:3001/dog' }, function(error, response, body) {
		 					if(error) { throw error	}
		 					if ( !error && response.statusCode === 200 ) {
		 						client.set('http://localhost:3001/dog', JSON.stringify(body.data), function(error){
		 							if (error) {throw error};
		 						});
		 						// callback(null, body.data);
		 					} else { 
		 						callback(response.statusCode);
		 					}
		 				}); 						
 					}
 				});

 			}
 		}, 
 		function(error, results) {

 			var y;

 			// for(var x =0; x < 100000; x+=1 ) {
 			// 	y = y + x;
 			// 	console.log(x)
 			// }
 			res.json({
 				error: error,
 				results: results
 			});
 		});

	});

	app.get('/ping', function(req, res) {
		res.json({ping: Date.now()});
	});
	
};