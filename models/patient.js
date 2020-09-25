var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "email": { type: String, required: true },
        "phone": {
            type: String
          },
        "password": { type: String, required: true },
        "diseases": [
            {
              disease: {
                type: String
              }
            }
          ],

    }
);

var patient = mongoose.model('patient', userSchema);