var expect  = require('chai').expect;
var request = require('request');
//var database = require('../src/db/database');
var itunesService = require('../src/routes/routes');

it('Main page content', function(done) {
    request('http://localhost:9000' , function(error, response, body) {
        expect(body).to.equal('welcome !!!');
        done();
    });
});

it('About page content', function(done) {
    request('http://localhost:9000/about' , function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});

it('Main page status', function(done) {
    request('http://localhost:9000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

/*
describe('Testing Service', async function(){
    it('get Functions', async function(done){
        var data = await database.getItuneById(522554524);
        //console.log(data);
        expect(data).to.equal(undefined);
        done();
    })
})*/

describe('Testing Service', () =>{
    return itunesService.getItuneByText(req, res).then(data =>{
        expect(data.length).to.equal(10);
    })
})