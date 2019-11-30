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

     before(() => { 
            dbUtils.setupDB(MONGO_URL, ()=>{  
                itunesService.setup(db); 
                ItunesBL.setup(dbUtils);
                console.log("before each");
        })
     })
     after(() => {
         dbUtils.closeDB();
         console.log("after each");;
     })
    
    it('getItuneById', ()=>{
        return ItunesBL.getItuneById(522554524).then( data=> { expect(data.results[0].trackId).to.equal(522554524)})
    })

    // it('getItunesBySearch', function(){
    //         dbUtils.setupDB(MONGO_URL, ()=>{
    //             itunesService.setup(db);
    //             ItunesBL.setup(dbUtils);
    //             return new Promise(function(resolve){
    //                 ItunesBL.getItuneByText("moshe").then(function(data){
    //                 var curr = data.results;
    //                 expect(curr.length).to.equal(25);
    //                 resolve();
    //                 dbUtils.closeDB();
    //             })
    //         })    
    //    } )
    // })

    // it('getTopTenItunes', function(){
    //         dbUtils.setupDB(MONGO_URL, ()=>{
    //             itunesService.setup(db);
    //             ItunesBL.setup(dbUtils);
    //             return new Promise(function(resolve){
    //                 ItunesBL.getTopTenItunes().then(function(data){
    //                 var curr = data.results;
    //                 expect(curr.length).to.equal(10);
    //                 resolve();
    //                 dbUtils.closeDB();
    //             })
    //         })    
    //    } )
    // })
})