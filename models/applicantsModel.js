var mongoose = require('mongoose');

var applicants = new mongoose.Schema({
	name:String,
	bio:String,
	skills:String,
	years:Number,
	why:String
});

var applicantModel = module.exports = mongoose.model('applicant',applicants);