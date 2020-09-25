var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var app = express();

var path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const session = require('express-session');
app.set("view engine","ejs");
var port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

const mongoURI = "mongodb+srv://Aneesh97:JasonSancho7@clusterhackathon.ypxp3.mongodb.net/codes?retryWrites=true&w=majority"
mongoose.connect(
    mongoURI,
    { useUnifiedTopology: true,
      useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
  require('./models/patient.js');
  require('./models/patientrecords.js');
  var routes = require('./routes/routes.js');
  app.use(check());
  app.use('/', routes);
  
  app.listen(port, function() {
    console.log('Server is running on port: ' + port)
  })

  module.exports = app;