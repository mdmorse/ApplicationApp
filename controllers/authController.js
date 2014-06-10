module.exports = {
	login:function(req, res){
		if(req.isAuthenticated()){
			res.redirect('trail-form');
		}
		else{
			res.render('login',{title: 'Login'});
		}
	},
	loginSuccess: function(req, res){
		res.render('trail-form');
	},
	logout:function(req,res){
		req.logout();
		res.render('index');
	},
	ensureAuthenticated: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.render('index');
	},
	ensureAuthenticatedAjax:function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.send(401);
	}

};