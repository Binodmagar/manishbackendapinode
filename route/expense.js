const express = require('express');
const Expense = require('../models/expense');


const router = express.Router();

router.route('/')
.get(function(req,res, next){
    Expense.find({})
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
.post(function(req,res){
    Expense.create({
        name: req.body.name,
        amount: req.body.amount,
        category: req.body.category,
        account: req.body.account,
        date: req.body.date,
        description: req.body.description
    })
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json({status:201, message:"expense added successfully!"})
    })
    .catch(function(err){
        console.log(err);
        res.json(err); 
    });
});

router.route("/:id")
.delete(function(req, res){
    Expense.deleteOne(
        {id: req.params.id})
        .then(function(result){
            res.status(200);
            res.json({status:200, message: "expenses deleted successfully!!"});
        })
        .catch(function(err){
            console.log(err);
            res.json(err);
        })
});

router.route("/:id")
.put(function(req,res){
    Expense.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:req.body})
        .then(function(result){
            if(result === 0){
                console.log(result);
                res.status(500);
                res.json({status: 500, message: 'couldnot update expenses'});
            }else{
                res.status(200);
                res.json({status:200, message: 'expenses update' });
            }
        })
        .catch(function(err){
            console.log(err);
            res.json(err);            
        })
});

router.route('/expenses/:id')
.get(function(req, res){
    Expense.findOne({id: req.body.id})
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json({status: 201, message: "Data get succssfully!!"});
        
    })
    .catch(function(err){
        console.log(err);
        res.send("Expenses cannot found")
        
    })
});

module.exports = router;

