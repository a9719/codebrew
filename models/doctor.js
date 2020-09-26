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
        "LinkedPatients":{type:[mongoose.Schema.Types.ObjectId],ref: 'patient'}
        

    }
);

var doctor = mongoose.model('doctor', doctorSchema);