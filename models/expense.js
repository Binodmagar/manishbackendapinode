const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    expenseName:{
        type: String,
        required: true
    },
    expensePrice:{
        type: Number,
        required: true
    },
    expenseCategory:{
        type: String,
        required: true
    },
    expenseAccount:{
        type: String,
        required: true
    },
    expenseDate: {
        type: String,
        required: true
    },
    expenseNote:{
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{timestamps: true});

module.exports = mongoose.model("Expense", expenseSchema);