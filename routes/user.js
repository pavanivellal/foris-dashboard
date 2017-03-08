
var database = require('./database');
var variables = require('./variables');
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

//MAINTAINING SESSION LOGIN
exports.checklogin = function(req, res) {
    console.log("checking session");
    console.log(req.session.uname);
    if (req.session.uname) {
        console.log("session is " + req.session.uname);
        res.send({
            "status" : 200
        });
    } else {
        res.send({
            "status" : 300
        });
    }
};

// Signing in User
exports.signin = function(req, res) {

    console.log("Inside Signin");
    console.log(req.param("name", "password"));
    var name = req.param("name");
    var password = req.param("password");
    // read a document
    database.fetchData(function(err, results) {
        if (err) {
            // throw err;
            console.log("Invalid User Name & Password");
            res.send({
                "status" : 100
            });
        } else {

            if(results.pwd == password )
            {
                req.session.uname = results._id;
                console.log("Session name: " + req.session.uname);
                console.log("success");
                res.render('home');
            }
            else
            {
                console.log("Invalid User Name & Password");
                        res.send({
                            "status" : 100
                        });

            }
        }

    },variables.foris_users,name);

};

//Signup User
exports.signup = function(req, res) {

    console.log("Inside Signup");
    console.log(req.param("name", "password", "email", "devid"));
    var name = req.param("name"),
        password = req.param("password"),
        email = req.param("email"),
        devid = req.param("devid");

    // read a document
    database.createUser(function(err, results) {
        if (err) {
           // throw err;
            console.log("Error message: " + err.description + ". Reason: " + err.reason);

            res.send({
                "status" : err.statusCode
            });
        } else {

            req.session.uname = name;
            console.log("Session name: " + req.session.uname);
            console.log("success");
            res.render('home');

        }

    },variables.foris_users,name,email,password,devid);

};

