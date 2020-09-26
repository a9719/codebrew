var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "email": { type: String, required: true },
        "phone": {
            type: String
          },
          "dateofbirth":{type:String, required:true},
          "height":{type:String, required:true},
          "weight":{type:String, required:true},
          "ethnicity":{type:String, required:true},
          "gender":{type:String, required:true},
          "sex":{type:String, required:true},
          "Alcohol":{type:String, required:true},
          "Tobacco":{type:String, required:true},
          "druguse":{type:String,required:true},
          "prescribed":{type:String, required:true},

        "password": { type: String, required: true },
        "diseases": {
              
                type: String
              },
            "injuries":{
              type:String
            }
            
          
          
          

    }
);

var patient = mongoose.model('patient', userSchema);