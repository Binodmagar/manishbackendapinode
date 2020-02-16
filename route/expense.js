const express = require('express');
const Expense = require('../models/expense');
const auth = require('../auth');

const router = express.Router();

router.route('/expenses')
.get(auth.checkUser, function (req, res, next) {
    Expense.find({
        users: req.user._id
    })
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json(result);   
    })
    .catch(function(err){
        console.log(err);
        res.json(err);
    });
})

.post(auth.checkUser, (req, res, next) => {
    let newExpense = new Expense(req.body);
    newExpense.users = req.user._id;
    newExpense.save()
    .then(function(result){
        console.log(result);
        res.status(201);
        // res.json({status:201, message: "Expense added successfully!!"})
        res.json(result);
    })
    .catch(function(err){
        console.log(err);
        res.json(err); 
    });
});
router.route("/expenses/:id")
    .delete(function (req, res) {
        Expense.deleteOne({
            _id: req.params.id
        })
            .then(function (result) {
                res.status(200);
                res.json({ status: 200, message: "Expense deleted successfully!!" });
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    })

    .put(auth.checkUser, function (req, res) {
        Expense.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body })
            .then(function (result) {
                if (result === 0) {
                    console.log(result);
                    res.status(500);
                    //res.json({ status: 500, message: 'Cannot update expense ' });
                } else {
                    res.status(200);
                    res.json(result);
                    //res.json({ status: 200, message: 'Expenses updated!!' });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    });
    
router.route("/my/:id")
    .get(function(req, res){
        Expense.findById({
            _id: req.params.id
        })

        .then(function(result) {
            console.log(result);
            res.status(201);
            res.json(result);
        })
        .catch(function(err){
            console.log(err);
        })
    })

module.exports = router;

/**
 * @swagger
 * /expenses:
 *  post:
 *   tags:
 *    - Expenses
 *   description: adding new expense test
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: expenseName
 *      in: formData
 *      type: string
 *      description: please provide expense name
 *    - name: expensePrice
 *      in: formData
 *      type: number
 *      description: Please provide expense price
 *    - name: expenseCategory
 *      in: formData
 *      type: string
 *      description: Please provide expense category
 *    - name: expenseAccount
 *      in: formData
 *      type: string
 *      description: Please provide expense account
 *    - name: expenseDate
 *      in: formData
 *      type: string
 *      description: Please provide expense date
 *    - name: expenseNote
 *      in: formData
 *      type: string
 *      description: Please provide expense note
 *   responses:
 *    201:
 *     description: expense registered successfully
 *    406:
 *     description: expense name is required or expense description is required
 */

/**
 * @swagger
 * /expenses:
 *  get:
 *   tags:
 *    - Expenses
 *   description: getting all expense data of specific user test
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    201:
 *     description: users expenes get successfully
 *    406:
 *     description: item name is required or item description is required
 */

/**
 * @swagger
 * /my/{id}:
 *  get:
 *   tags:
 *    - Expenses
 *   description: getting expense data by income_id test
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: expense Id
 *   responses:
 *    201:
 *     description: users expense get successfully
 *    406:
 *     description: expense id is required 
 */


/**
 * @swagger
 * /expenses/{id}:
 *  delete:
 *   tags:
 *    - Expenses
 *   description: Deleting expenses by expense_id test
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: expense Id
 *   responses:
 *    200:
 *     description: Successfully deleted
 *    401:
 *     description: Bearer token error or unauthorized
 *    500:
 *     description: Internal server error/ token could not be verified
 *    403:
 *     description: Forbidden
 */