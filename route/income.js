const express = require('express');
const Income = require('../models/income');


const router = express.Router();

router.route('/')
.get(function(req,res, next){
    Income.find({})
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
    Income.create({
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
        res.json({status:201, message:"income added successfully!"})
    })
    .catch(function(err){
        console.log(err);
        res.json(err); 
    });
});

router.route("/:id")
.delete(function(req, res){
    Income.deleteOne(
        {id: req.params.id})
        .then(function(result){
            res.status(200);
            res.json({status:200, message: "income deleted successfully!!"});
        })
        .catch(function(err){
            console.log(err);
            res.json(err);
        })
});

router.route("/:id")
.put(function(req,res){
    Income.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:req.body})
        .then(function(result){
            if(result === 0){
                console.log(result);
                res.status(500);
                res.json({status: 500, message: 'income update expenses'});
            }else{
                res.status(200);
                res.json({status:200, message: 'income updated!!' });
            }
        })
        .catch(function(err){
            console.log(err);
            res.json(err);            
        })
});

router.route('/:id')
.get(function(req, res){
    Income.findOne({_id: req.body.id})
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json({status: 201, message: "Data get succssfully!!"});
        
    })
    .catch(function(err){
        console.log(err);
        res.send("Income cannot found")
        
    })
});

module.exports = router;

