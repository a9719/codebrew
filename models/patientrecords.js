const mongoose = require('mongoose');
const PatientrecordsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    date:{
          type:String,
          required:true
        },
    FoodIntake:{
      type:String,
      required:true
    },
    WaterIntake:{
      type:String,
      required:true
    },
    vitals:[{
            averagebloodpressure:{type:String}
          }]


      
    
});
var Patientrecords = mongoose.model('Patientrecords', PatientrecordsSchema);