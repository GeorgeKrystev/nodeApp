var _ = require('lodash'),
 	Dog = require('../models/dog.js');

module.exports = function(app) { 

	// Create
	app.post('/dog', function(req, res) {
		var newDog = new Dog(req.body);
		newDog.save(function(err) {
			if (err) {
				res.json({info: "error during dog create", error: err});
			};
			res.json({info: 'dog was successfully added'});
		});
	});

	// Read
	app.get('/dog', function(req, res) {
		Dog.find(function(err,dogs){
			if (err) {
				res.json({info: "error during find dogs", error: err});
			};
			setTimeout(function(){
				res.json({info: 'dogs found successfully', data: dogs});				
			}, 10000)
		})
	});

	app.get('/dog/:id', function(req, res) {
		Dog.findById(req.params.id,function(err,dog) {
			if(err) {
				res.json({info: "error during cind dogs", error: err});
			};
			if(dog) {
				res.json({info: 'dogs found successfully', data: dog});
			} else {
				res.json({ info: "dog not found "});
			}

		})
	});

	// Update
	app.put('/dog/:id', function(req, res){
		Dog.findById(req.params.id, function(err, dog) {
			if(err) {
				res.json({info: "error during updating dog", error: err});				
			}
			if(dog) {
				_.merge(dog, req.body);
				Dog.save(function(err){
					if (err) {
						res.json({info: 'error during saving the dog', error: err});
					};
					res.json({info: "dog update successfully"});
				});
			} else { 
				res.json({info: 'dog not found'});
			}
		});
	});

	app.delete('/dog/:id', function(req, res){
		Dog.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.json({info: 'error during deleting dog', error: err});
			};
			res.json({info: "dog deleted successfully"});			
		})
	})


};