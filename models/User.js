// created by george for user-auth-backend 8-10-2020

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    passwordDigest: {
        type: String,
        required: true
    },
    roleId: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('users',UserSchema);
module.exports = User;
// finished by george for user-auth-backend 8-10-2020