
const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateShipperPostCreate(data) {
  let errors = {};

  data.origin = validText(data.origin) ? data.origin : '';
  data.destination = validText(data.destination) ? data.destination : '';
  data.parcelContents = validText(data.parcelContents) ? data.parcelContents : '';


  if (Validator.isEmpty(data.origin)) {
      errors.origin = 'Origin required';
  }

  if (Validator.isEmpty(data.destination)) {
      errors.destination = 'Destination required';
  }

    if (Validator.isEmpty(data.parcelContents)) {
        errors.parcelContents = 'Parcel contents are required';
    }

    // Max weight validators
    if (data.maxWeight === undefined) {
        errors.maxWeight = 'Estimated parcel maximum weight is required'
    } else {

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
