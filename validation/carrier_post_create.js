// create by george for post-create-model 8-11-2020
const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateCarrierPostCreate(data) {
  let errors = {};

  data.origin = validText(data.origin) ? data.origin : '';
  data.destination = validText(data.destination) ? data.destination : '';
  data.transportation = validText(data.transportation) ? data.transportation : '';
  //data.parcelContents = validText(data.parcelContents) ? data.parcelContents : '';


  if (Validator.isEmpty(data.origin)) {
      errors.origin = 'Origin required';
  }

  if (Validator.isEmpty(data.destination)) {
      errors.destination = 'Destination required';
  }

  if (Validator.isEmpty(data.transportation)) {
    errors.transportation = 'Mode of transportation required';
    }

    // if (Validator.isEmpty(data.parcelContents)) {
    //     errors.parcelContents = 'Parcel contents are required';
    // }

    // Travel date validators

    if (data.travelDate === undefined) {
        errors.travelDate = 'Travel date required';
    } else {
        if (!Validator.isDate(data.travelDate)) {
            
            errors.travelDate = "Invalid date provided";
        }
        debugger
        if (!Validator.isAfter(data.travelDate)) {
            errors.travelDate = 'Travel date must be in the future';
        }

        if (Validator.isEmpty(data.travelDate)) {
            errors.travelDate = 'Travel date required';
        }
    }

    // Fee validators

    if(data.fee === undefined) {
        errors.fee = 'Fee required'
    } else {
        // if (!Validator.isNumeric(data.fee)) {
        //     errors.fee = 'Fee must be a number';
        // }

        if (data.fee < 0) {
            errors.fee = "Fee cannot be negative"
        }

        // if (Validator.isEmpty(data.fee)) {
        //     errors.fee = 'Fee required';
        // }
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
// finished by george for post-create-model 8-11-2020