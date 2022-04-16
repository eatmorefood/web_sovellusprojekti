const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../app.js');
const chaiJsonSchemaAjv = require('chai-json-schema-ajv');
chai.use(chaiJsonSchemaAjv);

const foodDataSchema = require('../schemas/newfood.schema.json');
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

    describe('get food data', function() {
        it('should return single food item data by food ID', function(done) {
            //send http request
            chai.request(apiaddress)
                .get('/meal/byid/1')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check response status
                    expect(res).to.have.status(200);
                    //check response data structure
                    //expect(res.body).to.be.jsonSchema(foodDataSchema);
                    done();
                })
        })
        it('should return all food items of specific restaurant by restaurant ID', function(done) {
            //send http request
            chai.request(apiaddress)
            .get('/meal/byrestaurant/' + 9)
            .end(function(err, res) {
                expect(err).to.be.null;
                //check response status
                expect(res).to.have.status(200);
                //check response data structure
                //expect(res.body).to.be.jsonSchema(foodDataSchema);
                done();
            })
        })
    })

    describe('add new meal', function() {

        it('add meal when data is correct', function(done) {
            chai.request(apiaddress)
            .post('/meal')
            .send({
                name: "Mocha test",
                category: "Mochatest",
                description: "mocha test food",
                price: 12.30,
                idrestaurant: 9
                
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                done();
            })
        })
        it('reject new meal when data fields missing', function(done) {
            chai.request(apiaddress)
            .post('/meal')
            .send({
                name: "Mocha test",
                category: "Mochatest",
                description: "mocha test food",
                idrestaurant: 6
                //price missing !!
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new meal when datatypes invalid', function(done) {
            chai.request(apiaddress)
            .post('/meal')
            .send({
                name: "Mocha test",
                category: "Mochatest",
                description: "mocha test food",
                price: "12.30",
                idrestaurant: 6
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new meal when request body missing', function(done) {
            chai.request(apiaddress)
            .post('/meal')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('sould contain added meal', function(done) {
            //send http request
            chai.request(apiaddress)
                .get('/meal/byrestaurant/' + 9)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    //check response status
                    expect(res).to.have.status(200);
                    //check response data structure
                    let found = false;
                    for(let i=0; i<res.body.length; i++){
                        if((res.body[i].name == "Mocha test")
                        && (res.body[i].category == "Mochatest")
                        && (res.body[i].description == "mocha test food")
                        && (res.body[i].price == 12.30)){
                            found = true;
                            break;
                        }
                    }
                    if(found == false){
                        assert.fail('Food data was not saved');
                    }
                    done();
                })
        })


    })
})
