const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateShipperPostUpdate(data) {
    let errors = {};

    if (data.origin !== undefined) {
        data.origin = validText(data.origin) ? data.origin : '';
        if (Validator.isEmpty(data.origin)) {
        errors.origin = 'Origin required';
        }
    }

    if (data.destination !== undefined) {
        data.destination = validText(data.destination) ? data.destination : '';
        if (Validator.isEmpty(data.destination)) {
            errors.destination = 'Destination required';
        }
    }

    if (data.parcelContents !== undefined) {
        data.parcelContents = validText(data.parcelContents) ? data.parcelContents : '';
        if (Validator.isEmpty(data.parcelContents)) {
            errors.parcelContents = 'Parcel contents are required';
        }
    }
    
    // Max weight validators
    if (data.maxWeight !== undefined) {
        // if (!Validator.isNumeric(data.maxWeight)) {
        //     errors.maxWeight = 'Estimated parcel maximum weight must be a number';
        // }

        if (data.maxWeight < 0) {
            errors.maxWeight = "Estimated parcel maximum weight cannot be negative"
        }

        // if (Validator.isEmpty(data.maxWeight)) {
        //     errors.maxWeight = 'Estimated parcel maximum weight is required';
        // }
    }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
// finished by george for post-create-model 8-11-2020