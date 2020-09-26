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
    SugarIntake: {
      type:String,
      required:true
    },
    vitals:[{
            averageBloodPressure:{ type:String, required: true},
            oxygenSaturationLevels: { type: String, required: true }
    }],
    bloodTest:[{
      hasTaken: { type: Boolean, required: true },
      dateTaken: { type: Date, required: true},
      completeBloodCount: { type: String, required: true },
      bloodMetabolicPanel: { type: String, required: true },
      bloodEnzymeTest: { type: String, required: true },
      lipoproteinTest: { type: String, required: true },
      coagulationPanel: { type: String, required: true }
    }]

      
    
});
var Patientrecords = mongoose.model('Patientrecords', PatientrecordsSchema);