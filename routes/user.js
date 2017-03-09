
var database = require('./database');
var variables = require('./variables');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

function login(req,res){
	res.render('login', { title: variables.page_title + ' Login' });
}

function home(req,res){
	res.render('index', { title: variables.page_title + ' Home' });
}

function humidity(req,res){
	res.render('humidity', { title: 'Humidity' });
}

function water(req,res){
    res.render('water', { title: 'Water' });
}

function moisture(req,res){
    res.render('moisture', { title: 'Moisture' });
}

function temperature(req,res){
    res.render('temperature', { title: 'Temperature' });
}

function pH(req,res){
    res.render('pH', { title: 'pH' });
}

function salinity(req,res){
    res.render('salinity', { title: 'salinity' });
}

exports.login = login;
exports.home = home;
exports.humidity = humidity;
exports.water    = water;
exports.moisture = moisture;
exports.temperature = temperature;
exports.pH = pH;
exports.salinity = salinity;


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
                res.render('index');
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
    console.log(req.param("name", "fname", "lname", "password", "email", "devid"));
    var name = req.param("name"),
        fname = req.param("fname"),
        lname = req.param("lname"),
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
            res.render('index');

        }

    },variables.foris_users,name,fname,lname,email,password,devid);

};

//Get Profile Details////////////////////////////////////////////////
exports.profileusername = function(req, res){
    console.log("Inside profileusername");
    var name = req.session.uname;
    console.log(req.session.uname);
    database.fetchData(function(err, results) {
        if (err) {
            console.log("Unable to get user details");
            res.send({
                "status" : 100
            });
        } else {
            console.log(results);
            var jsonstr=JSON.stringify(results);
            console.log(jsonstr);
            console.log("Entry successfully fethced and displayed on PROFILE GUI");
            //res.send(JSON.stringify(results));
            res.send({"result":jsonstr});
        }
    }, variables.foris_users, name);

};

//Logout session
exports.logoutsession = function(req, res) {
    console.log("checking logout");
    req.session.destroy();
    res.send({
        "status" : 200
    });
};
