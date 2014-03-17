
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var indexController = require('./controllers/indexController.js');
var ApplicationModel = require('./models/trailsModel');
var app = express();
var mongoose = require('mongoose');
// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/trailrate');





//renders the index page
app.get('/',function(req,res){
	res.render('index.jade')
});

//renders form page
app.get('/trail-form', function(req, res){
	res.render('trail-form')
});


// displays a list of trails
app.get('/trails', indexController.list);

// creates a trails
app.post('/trail', indexController.create);

// deletes trails
app.get('/trails/delete/:id', indexController.remove);

// display single
app.get('/trails/single-trail/:id',indexController.get)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
