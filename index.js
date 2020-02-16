const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./route/users');
const expenseRouter = require('./route/expense');
const expenseRouterId = require('./route/expense');
const incomeRouter = require('./route/income');
const dotenv = require('dotenv').config();
const uploadRouter = require('./route/upload');
const auth = require('./auth');
const cors = require('cors');
const connection = require('./TestFile/dbTest');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({extended: true }));

app.use(express.static(__dirname + "/public"));

//swagger docs
var swaggerDefinition = {
    info: {
        title: 'Expense Manager APIs Documentation',
        description: 'This is Expense Manager APIs documentation of register, login, incomes and expenses',
        version: '1.0.0'
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
            scheme: 'bearer',
        }
    },
    host: 'localhost:3003',
    basePath: '/'
  };
  
  var swaggerOptions = {
    swaggerDefinition,
    apis: ['./route/*.js']
  };
  
  var swaggerSpecs = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));


mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

app.use('/users', userRouter);
app.use('/upload', uploadRouter);
app.use('/', expenseRouter);
app.use('/', incomeRouter)

// app.use('/', expenseRouterId);

app.use((err, req, res, next) => {
    console.error(err.stack);   
    res.statusCode = 500;
    res.json({ status: err.message });
});

connection.connect()
  .then(() =>{
    app.listen(process.env.PORT, () => {
      console.log(`App is running at localhost:${process.env.PORT}`);
    });
  })
module.exports = app;
