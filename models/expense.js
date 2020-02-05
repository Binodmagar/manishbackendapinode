const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    account:{
        type: String,
        required: true
    },
    days: {
        type: String,
        required: true
    },
    months:{
        type: String,
        required: true
    },
    years: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{timestamps: true});

module.exports = mongoose.model("Expense", expenseSchema);