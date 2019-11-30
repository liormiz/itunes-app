var expect  = require('chai').expect;
var request = require('request');
//var database = require('../src/db/database');
var ItunesBL = require('../src/bl/ItunesBL');

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


// describe('Testing Service', function(){

//     it('get Functions', async function(done){
//         var data = await ItunesBL.getItuneById(522554524);
//         data.on('change', () => done())
//         var curr = data.results[0];
//         expect(curr.trackId).to.equal(curr.trackId);
//     })
// })


describe('Testing Service', function(){

    it('get Functions', function(){
        return new Promise(function(resolve){
            ItunesBL.getItuneById(522554524).then(function(data){
                var curr = data.results[0];
                expect(curr.trackId).to.equal(522554524);
                resolve();
            })
        })
    })
})