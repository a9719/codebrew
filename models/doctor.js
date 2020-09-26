var mongoose = require('mongoose');
var doctorSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "email": { type: String, required: true },
        "phone": {
            type: String
          },
        "password": { type: String, required: true },
        "PracticianID": { type: String, required: true },
        "WorkAddress":{ type:String},
        "LinkedPatientsID":{type:[mongoose.Schema.Types.ObjectId],ref: 'patient'},
        "LinkedPatientsName":{type:[String]}
    }
);

var doctor = mongoose.model('doctor', doctorSchema);