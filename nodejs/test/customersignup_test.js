const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app.js');
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

//const singleCustomerDataSchema = require('../schemas/getcustomers.schema.json');
//const { assert } = require('chai');

const apiaddress = 'http://localhost:8080'

describe('signup api test', function() {
    this.timeout(10000); 

    before(function() {
        server.start();
    })

    after(function() {
        server.close();
    })

    describe('add new customer account', function() {

        it('add customer when data is correct', function(done) {
            chai.request(apiaddress)
            .post('/signup')
            .send({
                fname: "Mocha test",
                lname: "Mocha test",
                phone: 12345678,
                address: "Mocha test 1",
                email: "mocha@test",
                password: "Mochatest1"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            })
        })
        it('reject new customer when data fields missing', function(done) {
            chai.request(apiaddress)
            .post('/signup')
            .send({
                name: "Mocha test",
                lname: "Mocha test",
                phone: 12345678,
                address: "Mocha test 1",
                email: "mocha@test"
                //password missing
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new customer when datatypes invalid', function(done) {
            chai.request(apiaddress)
            .post('/signup')
            .send({
                fname: "Mocha test",
                lname: 23,
                phone: 125254545,
                address: "Mocha test 1",
                email: "mocha@test",
                password: "Mochatest1"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new customer when phonenumber string instead of integer', function(done) {
            chai.request(apiaddress)
            .post('/signup')
            .send({
                fname: "Mocha test",
                lname: "Mocha test",
                phone: "2253",
                address: "Mocha test 1",
                email: "mocha@test",
                password: "Mochatest1"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new customer when request body missing', function(done) {
            chai.request(apiaddress)
            .post('/signup')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
    })
})
