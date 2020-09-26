var mongoose = require('mongoose');
var Patient= mongoose.model('patient');
var PatientRecords= mongoose.model('Patientrecords');
var Doctor = mongoose.model('doctor');
var Doctor = mongoose.model('doctor');
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
var createDoctor = function(req, res) {
    console.log(req.body);
    var user = new Doctor({
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password,
        "phone":req.body.phone,
        "PracticianID":req.body.PracticianID,
        "WorkAddress": req.body.WorkAddress,
        "LinkedPatients":[]
    });
    console.log(user);
    console.log("ddd");
   
    Doctor.findOne({email:req.body.email}, function(err, user1) {
        if (user1) {
            console.log("User exists!");
            res.render("signupdoctor.ejs");
     
            
        } else {
           
            user.save(function (err, newUser) {
                console.log(newUser);
                if (!err) {
                    
                    
                    
                    console.log("registered");
                    res.render("signupdoctor.ejs");
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

var createDayRecord = function(req,res){
    var record = new PatientRecords({
        "user":req.body.user,
        "date":req.body.date,
        "FoodIntake":req.body.FoodIntake,
        "WaterIntake":req.body.WaterIntake,
        "vitals":[]
    });
    record.save();
};

var findRecordsByUserId= function(req, res) {
    var userid = req.params.userid;
    console.log(userid);
    PatientRecords.find({userId:userid}, function(err, record) {
        if (!err) {
            console.log(record);
            res.send(record);
        } else {
            res.sendStatus(404);
        }
    });
};

module.exports.findRecordsByUserId = findRecordsByUserId;
module.exports.createDayRecord = createDayRecord;
module.exports.findAllUsers = findAllUsers;
module.exports.createPatient= createPatient;
module.exports.createDoctor= createDoctor;