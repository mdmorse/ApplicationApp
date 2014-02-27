var applicantModel = require('../models/applicantsModel.js')

var applicationController = module.exports ={

	list: function(req,res){
		applicantModel.find({}, function(err,docs){
			res.render('applicants',{applicants:docs
		});
	}); 	 	
},
	create: function(req,res){
		var applicant = new applicantModel(req.body);
		applicant.save(function(err,doc){
			res.render('success')
	
	});

},
	remove: function(req,res){
		var appId = req.params.id;
		applicantModel.remove({_id:appId},function(err,doc){
			res.redirect('/applicants');
	});

},
	get: function(req,res){
		var appId = req.params.id;
		applicantModel.findById(appId, function(err,docs){
			res.render('single-applicant',{singleApp:docs});
	});

}



};