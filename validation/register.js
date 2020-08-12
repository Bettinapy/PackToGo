// create by george for user-auth-backend 8-10-2020
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.handle = validText(data.handle) ? data.handle : '';
  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
    errors.handle = 'Username must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Username is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters and no more than 30 characters';
  }

  // added by george 8-11-2020
  if (Validator.isEmpty(data.role)) {
    errors.role = "Role is required"
  }
  // finished by george 8-11-2020

  if (!Validator.equals(data.role, "shipper") && !Validator.equals(data.role, "carrier")) {
      errors.role = "Role must be either 'shipper' or 'carrier'"
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
// finished by george for user-auth-backend 8-10-2020