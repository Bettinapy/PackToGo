const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateBookingCreate(data) {
  let errors = {};

    data.parcelContents = validText(data.parcelContents)
      ? data.parcelContents
      : "";

    if (Validator.isEmpty(data.parcelContents)) {
      errors.parcelContents = "Parcel contents are required";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
}