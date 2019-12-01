var expect  = require('chai').expect;
var request = require('request');
var ItunesBL = require('../src/bl/ItunesBL');
var dbUtils = require('../src/db/database');
var itunesService = require('../src/services/itunesService');

var MONGO_URL = 'mongodb://localhost:27017';



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

describe('Testing BL', function(){

     before((done) => { 
            dbUtils.setupDB(MONGO_URL, ()=>{  
                itunesService.setup(db); 
                ItunesBL.setup(dbUtils);
                done();
        })
     })

     after(()=> {
        dbUtils.closeDB();
    })
    
    it('getItuneById', (done)=>{
        ItunesBL.getItuneById(522554524).then( data=> { 
            expect(data.results[0].trackId).to.equal(522554524);
            done();
        })
    })

    it('getItunesBySearch - with results', (done)=>{
        ItunesBL.getItuneByText("moshe").then( data=> { 
            expect(data.results.length).to.equal(25);
            done();
        })
    })

    it('getItunesBySearch - without results', (done)=>{
        ItunesBL.getItuneByText("").then( data=> { 
            expect(data.results.length).to.equal(0);
            done();
        })
    })

    it('getTopTenQueries', (done)=>{
        ItunesBL.getTopTenQueries().then( data=> { 
            expect(data.length).to.equal(10);
            done();
        })
    })
})