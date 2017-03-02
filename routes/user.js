
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

function login(req,res){
	res.render('login', { title: 'Login' });
}

function home(req,res){
	res.render('index', { title: 'Home' });
}

function humidity(req,res){
	res.render('humidity', { title: 'Humidity' });
}

exports.login = login;
exports.home = home;
exports.humidity = humidity;
