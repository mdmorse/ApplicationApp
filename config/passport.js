var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var util = require('util');
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
	clientID: '645602348862199',
	clientSecret: 'a1a4b7ddddce821bbb70102a048f3155',
	callbackURL: 'http://fast-inlet-3968.herokuapp.com/facebook/callback'
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


var GOOGLE_CLIENT_ID = "682333433362-jdatul4o4orn5adiiit590p1ncf27va2.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "bY4eoyQxT-QulXNfzk1EMTon";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://fast-inlet-3968.herokuapp.com/oauth2callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
     
      return done(null, profile);
    });
  }
));