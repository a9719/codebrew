var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: {
            type: String
          },
        birthDate: { type: Date, required: true },
        gender: { type: String, required: true },
        ethnicity: { type: String, required: true },
        password: { type: String, required: true },
        diseases: [
            {
              disease: {
                type: String,
                required: true
              },
              medicalHistory {
                type: String,
                required: true
              },
              surgicalHistory {
                type: String,
                required: true
              },
              allergies {
                type: String,
                required: true
              },
            }
        ],

        prescriptions: [
          {
            medicineTypes: {
              type: String,
              required: true
            }, 
            medicationFrequency: {
              type: String,
              required: true
            },
            medicationDosage: {
              type: String,
              required: true
            }
          }
        ],

        smoking: [
          {
            isSmoker: {
              type: Boolean,
              required: true
            }, 
            smokingFrequency: {
              type: String,
              required: true
            }
          }
        ], 
        
        drinking: [
          {
            isAlcoholic: {
              type: Boolean,
              required:true
            },
            drinkingFrequency: {
              type: String,
              required: true
            }
          }
        ],

        drugUse: [
          {
            isDrugAddict: {
              type: Boolean,
              required, true
            }, 
            drugName: {
              type: String,
              required, true
            },
            drugUseFrequency: {
              type: String,
              required: true
            }
          }
        ],

        hasServedMilitary: { type: Boolean, required: true }, 

        pregnancy: [
          {
            hasBeenPregnant: {
              type: Boolean,
              required: true
            },
            pregnancyDuration: {
              type: String,
              required: true
            }
          }
        ], 
        
        hobbies: { type: String, required: true },

        familyHistory: [
          {
            familyWithIllnesses: {
              type: Boolean,
              required: true
            },
            diseaseType: {
              type: String,
              required: true
            },
            severity: {
              type: String,
              required: true
            },
            treatment: {
              type: String,
              required: true
            },
            deceased: {
              type: Boolean,
              required: true
            },
            causeOfDeath: {
              type: String,
              required: true
            }
          }
        ]

    }
);

var patient = mongoose.model('patient', userSchema);