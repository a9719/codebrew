var mongoose = require('mongoose');
var Patient= mongoose.model('patient');
var PatientRecords= mongoose.model('Patientrecords');
var express = require('express');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
var createPatient = function(req, res) {

    var user = new Patient({
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "phone":"",
        "diseases":[]
    });
    console.log(user);
    console.log("ddd");
   
    Patient.findOne({email:req.body.email}, function(err, user1) {
        if (user1) {
            console.log("User exists!");
            res.sendfile("./views/signuppatient.html");
     
            
        } else {
           
            user.save(function (err, newUser) {
                console.log(newUser);
                if (!err) {
                    
                    
                    
                    console.log("registered");
                    res.sendfile("./views/signuppatient.html");
                } else {
                    res.sendStatus(400);
                }
            });
        }
    });
};

var findAllUsers = function(req, res) {
    Patient.find(function(err, users) {
        if (!err) {
            res.send(users);
        } else {
            res.sendStatus(404);
        }
    });
};
module.exports.findAllUsers = findAllUsers;
module.exports.createPatient= createPatient;