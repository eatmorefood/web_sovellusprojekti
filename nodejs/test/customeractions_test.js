const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app.js');
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const apiaddress = 'http://localhost:8080'

describe('business api test', function() {
    this.timeout(10000); 

    before(function() {
        server.start();
    })

    after(function() {
        server.close();
    })

    describe('customer actions test', function() {
        it('should create a new transaction data (order history)', function(done) {
            //send http request
            chai.request(apiaddress)
            .post('/customer/purchase')
            .send({
                restID: 6,
                custID: "5a090e5c-6423-4096-9bfb-eeb202e47b04",
                foodID: "mocha test",
                total: 13.13, 
                address: "Mocha test address"
                
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
        })
        it('should reject transaction data (order history) when body item missing', function(done) {
            //send http request
            chai.request(apiaddress)
            .post('/customer/purchase')
            .send({
                restID: 6,
                custID: "5a090e5c-6423-4096-9bfb-eeb202e47b04",
                foodID: "mocha test",
                total: 13.13
                
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('should reject transaction data (order history) when body item data type invalid', function(done) {
            //send http request
            chai.request(apiaddress)
            .post('/customer/purchase')
            .send({
                restID: 6,
                custID: "5a090e5c-6423-4096-9bfb-eeb202e47b04",
                foodID: "mocha test",
                total: "mocha test invalid datatype"
                
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('should reject transaction data (order history) when request body missing', function(done) {
            //send http request
            chai.request(apiaddress)
            .post('/customer/purchase')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
    })
})
