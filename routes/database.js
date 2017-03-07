/**
 * Created by Pavani Vellal on 05-Mar-2017.
 */

var ejs = require("ejs");
var async = require('async');
var Cloudant = require('cloudant');
var username = "sachet",
    password = "Foris",
    cloudant = Cloudant({account: username, password: password}),
   // dbname = null,
    db = null,
    doc = null;


function getConnection(dbName) {

// load the Cloudant library
    db = cloudant.db.use(dbName);
    return db;
}

function fetchData(callback,dbName,docID){
    console.log("Reading document " + docID);
    var db=getConnection(dbName);
    db.get(docID, function(err, data) {
        console.log("Error:", err);
        console.log("Data:", data);
        // keep a copy of the doc so we know its revision token
        doc = data;
        callback(err, data);
    });
}

exports.fetchData=fetchData;