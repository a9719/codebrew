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
            res.render("loginpatient.ejs");
     
            
        } else {
           
            user.save(function (err, newUser) {
                console.log(newUser);
                if (!err) {
                    
                    
                    
                    console.log("registered");
                    res.render("loginpatient.ejs");
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
            res.render("logindoctor.ejs");
     
            
        } else {
           
            user.save(function (err, newUser) {
                console.log(newUser);
                if (!err) {
                    
                    
                    
                    console.log("registered");
                    res.render("logindoctor.ejs");
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
    console.log(req.body);
    var record = new PatientRecords({
        "user":req.session.userid,
        "date":req.body.date,
        "FoodIntake":req.body.FoodIntake,
        "WaterIntake":req.body.WaterIntake,
        "vitals":[]
    });
    console.log(record);
    record.save();
    res.send("added successfully");
};


var findRecordsByUserIdAndDate= function(req, res) {
    var userid = req.session.userid;
    var dates =req.body.date;
    console.log(userid);
    PatientRecords.find({user:userid,date:dates}, function(err, record) {
        if (!err) {
            console.log(record);
            res.send(record);
        } else {
            res.sendStatus(404);
        }
    });
};

var findRecordsByUserId = function(req, res) {
    var userid = req.session.userid;
    console.log(userid);
    PatientRecords.find({user:userid}, function(err, record) {
        if (!err) {
            console.log(record);
            res.send(record);
        } else {
            res.sendStatus(404);
        }
    });
};
 var findDoctorByPracticionerID = function(req, res){
     var p= req.body.pracnumber;
     var userid1= req.session.userid;
     console.log(req.session);
    
     Doctor.findOneAndUpdate({PracticianID:p},{$push: {LinkedPatientsID:userid1, LinkedPatientsName:req.session.name}},{new: true}, function(err,user){
         if (err){
             res.send ("Incorret");

         }
         else{
             res.send("Updated");
         }


     })
 }
 var getLinkedPatients =function(req,res){
    var k=req.session.userid;
    Doctor.find({_id:userid},function(err,user){
        if (err){
            res.send("error");
        }
        else {
            console.log(req.session.linkedpatients= user.LinkedPatients);
            res.send("ok");
        }
    })
}

module.exports.getLinkedPatients =getLinkedPatients;
module.exports.findDoctorByPracticionerID= findDoctorByPracticionerID;
module.exports.findRecordsByUserIdAndDate = findRecordsByUserIdAndDate;
module.exports.createDayRecord = createDayRecord;
module.exports.findAllUsers = findAllUsers;
module.exports.createPatient= createPatient;
module.exports.createDoctor= createDoctor;