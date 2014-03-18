module.exports = {
	login:function(req, res){
		if(req.isAuthenticated()){
			res.render('trail-form');
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
		res.redirect('/login');
	},
	ensureAuthenticated: function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		res.render('trail-form');
	},
	ensureAuthenticatedAjax:function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		res.send(401);
	}

};