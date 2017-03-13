
var database = require('./database');
var variables = require('./variables');
var request = require('request');
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
    res.render('indv_sensors', { title: 'Humidity', json_name: "Humidity", color: "#20B2AA" });
}

function water(req,res){
    res.render('indv_sensors', { title: 'Water Comsumption', json_name: "Water", color: "#20B2AA" });
}

function moisture(req,res){
    res.render('indv_sensors', { title: 'Moisture', json_name: "Moisture", color: "#20B2AA" });
}

function temperature(req,res){
    res.render('indv_sensors', { title: 'Temperature', json_name: "Temperature", color: "#F08080" });
}

function pH(req,res){
    res.render('indv_sensors', { title: 'pH', json_name: "Ph", color: "#C71585" });
}

function salinity(req,res){
    res.render('indv_sensors', { title: 'Salinity', json_name: "Salinity", color: "#FF5733" });
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
            res.send({"result":jsonstr});
        }
    }, variables.foris_users, name);

};

//Get Sensor Data////////////////////////////////////////////////
exports.sensordata = function(req, res){
    console.log("Inside sensordata");
    var name = req.session.uname;
    request('http://foris.mybluemix.net/HelloWorld?q=webapp_token_many', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonstr=JSON.stringify(body);
            var jsonarray = JSON.parse(body);
            // var d1 = data[0];
            // var d2 = d1["sensor"];
            // var d3 = d2["Moisture"];
            console.log("Sensor data successfully fethced");
            console.log("Sensor Data:" + jsonstr);
            res.send({"sensor_data":jsonstr, "sensor_arr":jsonarray});
        }
        else
        {
            console.log("Unable to get sensor data");
            res.send({
                "status" : 100
            });
        }
    });

    // database.fetchData(function(err, results) {
    //     if (err) {
    //         console.log("Unable to get sensor data");
    //         res.send({
    //             "status" : 100
    //         });
    //     } else {
    //         console.log(results);
    //         var jsonstr=JSON.stringify(results.data);
    //         var data = JSON.parse(results.data);
    //         console.log(jsonstr);
    //         console.log("sensor data fetched successfully");
    //         res.send({"sensor_data":jsonstr});
    //     }
    // }, variables.sensor_db, name);

};


//Logout session
exports.logoutsession = function(req, res) {
    console.log("checking logout");
    req.session.destroy();
    res.send({
        "status" : 200
    });
};

exports.sensortopology = function(req,res) {




}


