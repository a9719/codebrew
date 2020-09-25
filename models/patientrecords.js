const mongoose = require('mongoose');
const PatientrecordsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    
    daydescriptions: [
     
      {
        date:{
          type:Date,
          required:true
        },
        FoodIntake:[{
          name:{type:String}
        }],
        WaterIntake:{
          type:String
        },
        vitals:[{
            averagebloodpressure:{type:String}
        }]


      }
    ]
});
var Patientrecords = mongoose.model('Patientrecords', PatientrecordsSchema);