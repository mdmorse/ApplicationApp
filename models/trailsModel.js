var mongoose = require('mongoose');

var trails = new mongoose.Schema({
	name:String,
	location:String,
	region:String,
	description:String,
});

var trailModel = module.exports = mongoose.model('applicants',trails);