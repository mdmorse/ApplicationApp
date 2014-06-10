
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var indexController = require('./controllers/indexController.js');
var ApplicationModel = require('./models/trailsModel');
var authController = require('./controllers/authController.js');
var app = express();
var passport = require('passport');
var passportConfig = require('./config/passport');
var mongoose = require('mongoose');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(passport.initialize());
app.use(passport.session());
app.use(express.cookieParser());
app.use(express.session({secret:'secret string'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if(global.process.env.MONGOHQ_URL){
	mongoose.connect(global.process.env.MONGOHQ_URL);
}else{
	mongoose.connect('mongodb://localhost/trailrate');
}



//****************Passport********************
app.get('/', 
	authController.ensureAuthenticated,
	indexController.create
);

app.get('/login', authController.login);
app.get('/logout', authController.logout);
app.get('/login/facebook', passport.authenticate('facebook'));
app.get(
	'/facebook/callback',
	passport.authenticate('facebook', {failureRedirect:'/login'}),
	authController.loginSuccess
);

//renders the index page
app.get('/',authController.ensureAuthenticated,function(req,res){
	res.render('index.jade')
});

//renders form page
app.get('/trail-form', function(req, res){
	res.render('trail-form')
});


// displays a list of trails
app.get('/trails', indexController.list);

// creates trails
app.post('/trail', indexController.create);

// deletes trails
app.get('/trails/delete/:id', indexController.remove);

// display single
app.get('/trails/single-trail/:id',indexController.get)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
