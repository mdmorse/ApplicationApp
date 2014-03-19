var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var UserModel = require('../models/userModel');

passport.serializeUser(function(user,done){
	done(null,user._id);
});

passport.deserializeUser(function(userid,done){
	UserModel.findOne({_id: userid},function(err,user){
		done(err,user);
	});
});

var facebookStrategy= new FacebookStrategy({
	clientID: '445421345603958',
	clientSecret: '8eaf20a141cf6a188ba146761214d9b1',
	callbackURL: 'http://ltrail-log.herokuapp.com/facebook/callback'
},		function(accessToken, refreshToken, profile, done){
	console.log(accessToken,refreshToken,profile);

	UserModel.findOne({userid: profile.id}, function(err,user){
		if(user){
			return done(err,user);
		}

		var newUser = new UserModel({
		userid: profile.id ,
		username: profile.username ,
		profile: profile
		});
		newUser.save(function(err,doc){
			return done(err,doc);
		});
	});
});
passport.use(facebookStrategy);