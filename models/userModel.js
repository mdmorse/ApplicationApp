var mongoose = require('mongoose');

	var userSchema = new mongoose.Schema({
			userid: String,
			username: String,
			profile: Object,
			firstname: String,
			lastname: String

	});

	var userModel = module.exports = mongoose.model('user',userSchema);