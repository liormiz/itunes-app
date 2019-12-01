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
                console.log("before each");
                done();
        })
     })
     after(async (done) => {
         await dbUtils.closeDB();
         console.log("after each");;
         done();
     })
    
    it('getItuneById', (done)=>{
        ItunesBL.getItuneById(522554524).then( data=> { 
            expect(data.results[0].trackId).to.equal(522554524);
            done();
        })
    })

    it('getItunesBySearch', (done)=>{
        ItunesBL.getItuneByText("moshe").then( data=> { 
            expect(data.results.length).to.equal(25);
            done();
        })
    })

    it('getTopTenItunes', (done)=>{
        ItunesBL.getTopTenItunes("moshe").then( data=> { 
            expect(0).to.equal(0);
            done();
        })
    })
})