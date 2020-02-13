const dotenv = require('dotenv');
dotenv.config;
const path = require("path");
const app = require('../index.js')
const request = require('supertest');
const expect = require('chai').expect;
const conn = require('../TestFile/dbTest');
process.env.EXPENSESMANAGER = 'test';

 let token ='res.body.token';
 let expenseId ='res.body.expenseId';
 let incomeId ='res.body.incomeId';

describe('Testing API all routes of ExpenseTracker', () => {
    before(function(done) {
        this.timeout(150000)
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    });
    after((done) => {
        conn.close()
            .then(() => done())
            .catch((err) => done(err));
    });

    //register testing
    it('Ok, a new user should be able to register', (done) => {
        request(app).post('/users/register')
        .send({
            firstName: "magar",
            lastName: "magar",
            mobileNumber: "9898001234",
            email: "magar@gmail.com",
            password: "magar12345",
            image: "imageFile-1581612389264.jpg"
        })
        .then((res) => {
            expect(res.statusCode).to.equal(201)
            expect(res.body).to.contain.property('token');
            done();
        }) 
        .catch((err) => done(err));
    })

    //login testing
    it('Ok, should get login token', (done) => {
        request(app).post('/users/login')
        .send({
            email:"magar@gmail.com",
            password: "magar12345"         

        })
            .then((res) => {
                expect(res.statusCode).to.equal(201)
                expect(res.body).to.contain.property('status')
                token = `Bearer ${res.body.token}`;
                console.log(token);
                done();
            })
            .catch((err) => done(err));
    })


    //testing of expense
    it('Ok, a new expense should be added', (done) => {
        request(app).post('/expenses')
        .set('Authorization', token)
        .send({
            expenseName: "aa",
            expensePrice: 1000,
            expenseCategory: "aa",
            expenseAccount: "dd",
            expenseDate: "2020-2-9",
            expenseNote: "aa aa bb"
        })
        .then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.not.be.empty;
            expenseId = res.body._id
            console.log(expenseId);   
            done();
            
        })
        .catch((err) => done(err));
    })
    it('Ok, getting expense of particular users', (done) => {
        request(app).get('/expenses')
        .set('Authorization', token)
        .then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.not.be.empty;
            done();
            
        })
        .catch((err) => done(err));
    })
    it('Ok, update particular expense', (done) => {
        request(app).put("/expenses/" + expenseId)
        .set('Authorization', token)
        .send({
            expenseName: "aa cc",
            expensePrice: 10000,
            expenseCategory: "ava",
            expenseAccount: "dde",
            expenseDate: "2020-2-9",
            expenseNote: "aa aa bb"
        })
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.not.be.empty;
            done();
        })
        .catch((err) => done(err));
    })
    it('Ok, delete a particular expenses by users', (done) => {
        request(app).delete("/expenses/" + expenseId)
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.contain.property('status');
            done();
        })
        .catch((err) => done(err));
    })


    //user incomes test
    it('Ok, a new incomes should be added', (done) => {
        request(app).post('/incomes')
        .set('Authorization', token)
        .send({
            incomeName: "aa",
            incomePrice: 1000,
            incomeCategory: "aa",
            incomeAccount: "dd",
            incomeDate: "2020-2-9",
            incomeNote: "aa aa bb"
        })
        .then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.not.be.empty;
            incomeId = res.body._id
            console.log(incomeId);
            done();
            
        })
        .catch((err) => done(err));
    })
    it('Ok, getting income of particular users', (done) => {
        request(app).get('/incomes')
        .set('Authorization', token)
        .then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.not.be.empty;
            done();
            
        })
        .catch((err) => done(err));
    })
    it('Ok, update particular income', (done) => {
        request(app).put("/incomes/" + incomeId)
        .set('Authorization', token)
        .send({
            incomeName: "aa cc",
            incomePrice: 10000,
            incomeCategory: "ava",
            incomeAccount: "dde",
            incomeDate: "2020-2-9",
            incomeNote: "aa aa bb"
        })
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.not.be.empty;
            done();
        })
        .catch((err) => done(err));
    })
    it('Ok, delete a particular incomes by users', (done) => {
        request(app).delete("/incomes/" + incomeId)
        .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.contain.property('status');
            done();
        })
        .catch((err) => done(err));
    })
    });