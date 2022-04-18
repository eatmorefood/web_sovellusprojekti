const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app.js');
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const restaurantDataArraySchema = require('../schemas/getrestaurants.schema.json');
const { assert } = require('chai');

const apiaddress = 'http://localhost:8080'

describe('business api test', function() {
    this.timeout(10000); 

    before(function() {
        server.start();
    })

    after(function() {
        server.close();
    })

    describe('get restaurant data', function() {
        it('should return all restaurants', function(done) {
            //send http request
            chai.request(apiaddress)
                .get('/restaurant')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check response status
                    expect(res).to.have.status(200);
                    //check response data structure
                    //expect(res.body).to.be.jsonSchema(restaurantDataArraySchema); // THIS comment can be removed when null values from database are replaced
                    done();
                })
        })
    })

    describe('add new restaurant', function() {

        it('add restaurant when data is correct', function(done) {
            chai.request(apiaddress)
            .post('/signupbusiness')
            .send({
                email: "mocha@test.com",
                name: "Mocha test",
                address: "Mocha test 1",
                open: "10-12",
                type: "Mocha test",
                pricelevel: "€€",
                password: "Mochatest1"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            })
        })
        it('reject new restaurant when data fields missing', function(done) {
            chai.request(apiaddress)
            .post('/signupbusiness')
            .send({
                email: "mocha@test.com",
                name: "Mocha test",
                address: "Mocha test 1",
                open: "10-12",
                type: "Mocha test",
                pricelevel: "€€"
                //password missing !!
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new restaurant when pricelevel contains other characters than euro marks', function(done) {
            chai.request(apiaddress)
            .post('/signupbusiness')
            .send({
                email: "mocha@test.com",
                name: "Mocha test",
                address: "Mocha test 1",
                open: "10-12",
                type: "Mocha test",
                pricelevel: "ty", //invalid pricelevel
                password: "Mochatest1"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new restaurant when datatypes invalid', function(done) {
            chai.request(apiaddress)
            .post('/signupbusiness')
            .send({
                email: 1,
                name: "Mocha test",
                address: "Mocha test 1",
                open: "10-12",
                type: {x:1},
                pricelevel: "€€",
                password: "Mochatest1"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new restaurant when request body missing', function(done) {
            chai.request(apiaddress)
            .post('/signupbusiness')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('sould contain added restaurant data', function(done) {
            //send http request
            chai.request(apiaddress)
                .get('/restaurant')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check response status
                    expect(res).to.have.status(200);
                    //check response data structure
                    let found = false;
                    for(let i=0; i<res.body.length; i++){
                        if((res.body[i].name == "Mocha test")
                        && (res.body[i].address == "Mocha test 1")
                        && (res.body[i].open == "10-12")
                        && (res.body[i].type == "Mocha test")
                        && (res.body[i].pricelevel == "€€")){
                            found = true;
                            break;
                        }
                    }
                    if(found == false){
                        assert.fail('Data was not saved');
                    }
                    done();
                })
        })


    })
})
