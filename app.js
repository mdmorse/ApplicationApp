
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var indexController = require('./controllers/indexController.js');
var ApplicationModel = require('./models/applicantsModel');
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

mongoose.connect('mongodb://localhost/mycompanyname');





//renders the index page
app.get('/', function(req, res){
	res.render('index')
});


// displays a list of applicants
app.get('/applicants', indexController.list);

// creates an applicant
app.post('/applicant', indexController.create);

// deletes applicant
app.get('/applicants/delete/:id', indexController.remove);

// display app profile
app.get('/applicants/single-applicant/:id',indexController.get)



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
