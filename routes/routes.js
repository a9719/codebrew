const axios = require('axios')
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const { check, validationResult } = require('express-validator');
var controller = require('../controller.js');
var Patient= mongoose.model('patient');
var PatientRecords= mongoose.model('Patientrecords');
var Doctor = mongoose.model('doctor');

router.get('/', (req, res) => {
        res.render("welcome.ejs");
});

router.get('/signup', function (req, res) {
    res.render("signuppatient.ejs");
});
router.get('/signupdoc', function (req, res) {
    res.render("signupdoctor.ejs");
});

router.get('/loginpatient', function (req, res) {
    res.render('loginpatient.ejs')
});
router.get('/logindoctor', function (req, res) {
    res.render('logindoctor.ejs')
});

router.post('/credentialspatient', [
    check('email').isEmail().withMessage("Invalid email address"),
    check('password').isLength({ min: 2 }).withMessage("Password must be at least 3 chars long")

],  function(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()){

        let errorMessage = []
        errors.array().map(err => errorMessage.push( err.msg ));

        errorMessage.map(msg => res.write(msg + "\n"));
        res.end();
        return;

        //return res.status(422).json({ errors: errors.array()})

    }

    const userEmail = req.body.email;
    const userPassword = req.body.password;

    Patient.findOne({email:userEmail,password:userPassword}, function(err,user) {
        if (!err  && user!=null) {
            
            req.session.userid =user.id;
            req.session.email = user.email;
            req.session.password = user.password;
            req.session.name= user.name;
            
            

            res.redirect("/homepagepatient");

        } else {
            res.render("login.ejs", {congr:"",
                congr1: " again, invalid email or password!"
            });

        }
    });

});
router.get('/logout', function (req, res) {

    req.session.destroy();
    res.redirect('/');

});
router.post('/credentialsdoctor', [
    check('email').isEmail().withMessage("Invalid email address"),
    check('password').isLength({ min: 2 }).withMessage("Password must be at least 3 chars long")

],  function(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()){

        let errorMessage = []
        errors.array().map(err => errorMessage.push( err.msg ));

        errorMessage.map(msg => res.write(msg + "\n"));
        res.end();
        return;

        //return res.status(422).json({ errors: errors.array()})

    }

    const userEmail = req.body.email;
    const userPassword = req.body.password;

    Doctor.findOne({email:userEmail,password:userPassword}, function(err,user) {
        if (!err  && user!=null) {
            
            req.session.userid =user.id;
            req.session.email = user.email;
            req.session.password = user.password;
            req.session.name= user.name;
            

            res.redirect("/homepagedoctor");

        } else {
            res.render("logindoctor.ejs", {congr:"",
                congr1: " again, invalid email or password!"
            });

        }
    });

});

router.get('/homepagepatient', function(req,res){

        if (req.session.name){
            res.render("patientprofile.ejs",{
                    name:req.session.name,
                    id:req.session.id

                }
            );
        } else {
            res.render("welcome.ejs");
        }
    });
    router.get('/homepagedoctor', function(req,res){
        var j=[];
        if (req.session.name){
            Doctor.findOne({email:req.session.email}, function(err,user) {
                k=user._id;
                
                
                var linkedpat=user.LinkedPatients;
                for( var i=0; i<(linkedpat.length+linkedpat.length);i=i+2)
                {   
                    Patient.findById(linkedpat[i],function(err2,user2){
                        if(err2)
                        {
                            

                        }
                        else{

                            j[i]=user2.name;
                            j[i+1]=user2.id;
                            console.log(new Date()+" "+j[i]);
                          
                        }
                        

                    })
                };
                
                

                setTimeout(() => {
                    var Outputk ='<!DOCTYPE html> <html> <head>     <title> Profile Page</title>     <meta charset="utf-8">    <meta name="viewport" content="width=device-width, initial-scale=1">    <style>      button {        background-color: #5A5373;        color: white;        font-size: 17px;        border-radius: 15px;        padding: 10px 5px;        border: none;        cursor: pointer;        margin: 10px;      }      .bg-modal {        background-color: rgba(0, 0, 0, 0.8);        width: 100%;        height: 100%;        position: absolute;        top: 0;        display: none;        justify-content: center;        align-items: center;      }      .modal-contents {        height: 300px;        width: 500px;        background-color: white;        text-align: center;        padding: 20px;        position: relative;        border-radius: 4px;      }      input {        margin: 15px auto;        display: block;        width: 50%;        padding: 8px;        border: 1px solid gray;      }    </style></head> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script><nav class="navbar navbar-expand-lg navbar-light bg-light">    <a class="navbar-brand" style="color: #428BCA;" href="/">DocConnect</a>    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">        <span class="navbar-toggler-icon"></span>    </button>    <div class="collapse navbar-collapse" id="navbarNavDropdown">        <ul class="navbar-nav">            <li class="nav-item active">                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>            </li>            <li class="nav-item">                <a class="nav-link" href="/logout">Logout</a>            </li>        </ul>    </div></nav><body>         <div class = "search">        <h1> Hi'+req.session.name+ '</h1>    </div> <div>'  ;
                for(i=0;i<(linkedpat.length+linkedpat.length);i=i+2){
                    
                    Outputk+=j[i];
                    console.log(new Date()+" "+j[i]);
                    
                }
                Outputk+='</div></body></html>';
                res.send(Outputk);
                    
                }, 2000);
                
                

            })

           
            
        }else {
            res.render("welcome.ejs");
        }
    })
router.get('/getlinks',controller.getLinkedPatients);
router.post('/publishrecord',controller.createDayRecord);
router.post('/doctorcreateUser', controller.createDoctor);
router.post('/patientcreateuser',controller.createPatient);
router.put('/linkdoc',controller.findDoctorByPracticionerID);
router.get('/users', controller.findAllUsers);

module.exports = router;