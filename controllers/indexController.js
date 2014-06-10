var trailModel = require('../models/trailsModel.js')

var trailController = module.exports ={

	list: function(req,res){
		trailModel.find({}, function(err,docs){
			res.render('trails',{trails:docs});
	}); 	 	
},
	create: function(req,res){
		var trail = new trailModel(req.body);
		trail.save(function(err,doc){
			res.render('success')	
	});
},
	remove: function(req,res){
		var trailId = req.params.id;
		trailModel.remove({_id:trailId},function(err,doc){
			res.redirect('/trails');
	});
},
	get: function(req,res){
		var trailId = req.params.id;
		trailModel.findById(trailId, function(err,docs){
			res.render('single-trail',{singleTrail:docs,title:docs.name});
	});
}





};