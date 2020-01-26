const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
        min: 10, 
        max: 10,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        max: 6,
        required: true
    },
    image:{
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);