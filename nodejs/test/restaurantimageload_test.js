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

    describe('add restaurant image', function() { //food image upload test in another .js file

        it('add restaurant image when data is correct', function(done) {
            chai.request(apiaddress)
            .put('/restaurant/imageupload')
            .field("id", 1)
            .attach("image", 'test/test.jpg')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
        })
        it('reject new restaurant image when file missing', function(done) {
            chai.request(apiaddress)
            .put('/restaurant/imageupload')
            .send({
                id: 1
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('add restaurant image when data is correct', function(done) {
            chai.request(apiaddress)
            .put('/restaurant/imageupload')
            .field("id", 1)
            .attach("image", 'test/test2.gif')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new restaurant when id invalid', function(done) {
            chai.request(apiaddress)
            .put('/restaurant/imageupload')
            .send({
                id: "s"
            })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
        it('reject new restaurant when request body missing', function(done) {
            chai.request(apiaddress)
            .put('/restaurant/imageupload')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                done();
            })
        })
    })
})
