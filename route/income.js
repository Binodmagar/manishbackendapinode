const express = require('express');
const Income = require('../models/income');
const auth = require('../auth');


const router = express.Router();

router.route('/incomes')
    .post(auth.checkUser, (req, res, next) => {
        let newIncome = new Income(req.body);
        newIncome.users = req.user._id;
        newIncome.save()
            .then((result) => {
                res.status(201);
                //res.json({status:201, message:"income added successfully!"})
                res.json(result);
            }).catch(next);
    })
    .get(auth.checkUser, function (req, res, next) {
        Income.find({
            users: req.user._id
        })
            .then(function (income) {
                res.status(201);
                res.json(income);
            })
    })
router.route("/incomes/:id")
    .delete(function (req, res) {
        Income.deleteOne({
            _id: req.params.id
        })
            .then(function (result) {
                res.status(200);
                res.json({ status: 200, message: "income deleted successfully!!" });
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    })
    .put(auth.checkUser, function (req, res) {
        Income.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body })
            .then(function (result) {
                if (result === 0) {
                    console.log(result);
                    res.status(500);
                    //res.json({ status: 500, message: 'income cannot update ' });
                } else {
                    res.status(200);
                    res.json(result);
                    //res.json({ status: 200, message: 'income updated!!' });
                }
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    });
router.route("/myincome/:id")
    .get(function(req, res){
        Income.findById({
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

// swagger document for income
/**
 * @swagger
 * /incomes:
 *  post:
 *   tags:
 *    - incomes
 *   description: adding new income test
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: incomeName
 *      in: formData
 *      type: string
 *      description: please provide income name
 *    - name: incomePrice
 *      in: formData
 *      type: number
 *      description: Please provide income price
 *    - name: incomeCategory
 *      in: formData
 *      type: string
 *      description: Please provide income category
 *    - name: incomeAccount
 *      in: formData
 *      type: string
 *      description: Please provide income account
 *    - name: incomeDate
 *      in: formData
 *      type: string
 *      description: Please provide income date
 *    - name: incomeNote
 *      in: formData
 *      type: string
 *      description: Please provide income note
 *   responses:
 *    201:
 *     description: income registered successfully
 *    406:
 *     description: income name is required or income description is required
 */

/**
 * @swagger
 * /incomes:
 *  get:
 *   tags:
 *    - incomes
 *   description: getting all income of specific user test
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    201:
 *     description: users incomes get successfully
 *    406:
 *     description: incomes name is required 
 */

/**
 * @swagger
 * /myincome/{id}:
 *  get:
 *   tags:
 *    - incomes
 *   description: getting income data by income_id test
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: income Id
 *   responses:
 *    201:
 *     description: users incomes get successfully
 *    406:
 *     description: income id is required 
 */


/**
 * @swagger
 * /incomes/{id}:
 *  delete:
 *   tags:
 *    - incomes
 *   description: income delete test by income_id
 *   produces:
 *    - application/json
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: income Id
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

