// created by george for user-auth-backend 8-10-2020

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    passwordDigest: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('users',UserSchema);
module.exports = User;
// finished by george for user-auth-backend 8-10-2020