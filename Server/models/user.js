const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'user must have a first name']
    },
    lastName: {
        type: String,
        required: [true, 'user must have a last name']
    },
    username: {
        type: String,
        unique: [true, 'username taken'],
        required: [true, 'user must have a username'],
        minlength: [2, 'password must contain at least 2 characters'],
        maxlength: [24, 'username cannot exceed 24 characters'],
    },
    email: {
        type: String,
        unique: [true, 'email already registered'],
        validate: [ isEmail, 'invalid email'],
        required: [true, 'user must have an email']
    },
    password: {
        type: String,
        minlength: [6, 'password must contain at least 6 characters'],
        required: [true, 'user must have a password']
    },
    admin: {
        type: Boolean,
        default: false,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    }
})

const User = model('User', userSchema);
module.exports = User;