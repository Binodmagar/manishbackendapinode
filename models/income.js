const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    incomeName:{
        type: String,
        required: true
    },
    incomePrice:{
        type: Number,
        required: true
    },
    incomeCategory:{
        type: String,
        required: true
    },
    incomeAccount:{
        type: String,
        required: true
    },
    incomeDate: {
        type: String,
        required: true
    },
    incomeNote:{
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{timestamps: true});

module.exports = mongoose.model("Income", incomeSchema);