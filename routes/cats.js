var _ = require('lodash'),
 	Cat = require('../models/cat.js');

module.exports = function(app) { 

	// Create
	app.post('/cat', function(req, res) {
		var newCat = new Cat(req.body);
		newCat.save(function(err) {
			if (err) {
				res.json({info: "error during cat create", error: err});
			};
			res.json({info: 'cat was successfully added'});
		});
	});

	// Read
	app.get('/cat', function(req, res) {
		Cat.find(function(err,cats){
			if (err) {
				res.json({info: "error during find cats", error: err});
			};
			res.json({info: 'cats found successfully', data: cats});
		})
	});

	app.get('/cat/:id', function(req, res) {
		Cat.findById(req.params.id,function(err,cat) {
			if(err) {
				res.json({info: "error during cind cats", error: err});
			};
			if(cat) {
				res.json({info: 'cats found successfully', data: cat});
				setTimeout(function(){
					res.json({info: 'cats found successfully', data: cat});					
				}, 10000)
			} else {
				res.json({ info: "cat not found "});
			}

		})
	});

	// Update
	app.put('/cat/:id', function(req, res){
		Cat.findById(req.params.id, function(err, cat) {
			if(err) {
				res.json({info: "error during updating cat", error: err});				
			}
			if(cat) {
				_.merge(cat, req.body);
				cat.save(function(err){
					if (err) {
						res.json({info: 'error during saving the cat', error: err});
					};
					res.json({info: "cat update successfully"});
				});
			} else { 
				res.json({info: 'cat not found'});
			}
		});
	});

	app.delete('/cat/:id', function(req, res){
		Cat.findByIdAndRemove(req.params.id, function(err) {
			if (err) {
				res.json({info: 'error during deleting cat', error: err});
			};
			res.json({info: "cat deleted successfully"});			
		})
	})


};