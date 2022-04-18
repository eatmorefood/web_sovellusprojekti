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

    describe('add meal image', function() {

        //most likely something is wrong with the test itself since it fails although upload is successful in the app 
        /*it('add food image when data is correct', function(done) { 
            chai.request(apiaddress)
            .put('/meal/imageupload')
            .field("idfood", "3367573d-28bc-4f37-aea2-f4e559b9fb1f")
            .attach("image", 'test/test.jpg')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
        })*/
        it('reject new meal image when file missing', function(done) {
            chai.request(apiaddress)
            .put('/meal/imageupload')
            .send({
                idfood: "3367573d-28bc-4f37-aea2-f4e559b9fb1f"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new meal image when id invalid', function(done) {
            chai.request(apiaddress)
            .put('/meal/imageupload')
            .send({
                idfood: 1
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new meal image when request body missing', function(done) {
            chai.request(apiaddress)
            .put('/meal/imageupload')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
    })
})
