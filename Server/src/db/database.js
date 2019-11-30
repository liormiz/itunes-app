
var http = require('http');
var express = require('express');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');

var collections = ['itunes', 'queries'];

// log on to db
exports.setupDB = function (dbUrl, p_db, callback) {
    mongoClient.connect(dbUrl, function (err, client) {
        if (err) {
            console.log("Could not  connect to Db");
            return;
        }

        var database = client.db('test');
        console.log('Connect to db');

        for (col = 0; col < collections.length; col++) {
            database[collections[col]] = database.collection(collections[col]);
        }
        
        db = database;

        p_db = database;

        callback(p_db);
    })
}

exports.getTopTenItunes = async function() {
    return await db.itunes.aggregate([ { '$sort': { 'counters': -1 } }]).limit(10).toArray();
}

exports.getItuneById = async function (id) {
    return await db.itunes.find({_id : id}).toArray();
}

exports.getItuneByText = async function (searchText) {
    return await db.itunes.find({"_name" : {$regex: searchText}}).toArray();
}

exports.updateItunesCounter = async function(id, counter){
    var counters = counter + 1;
    db.itunes.updateOne({ '_id': id }, { $set: { "counters": counters } });
}

exports.saveNewItunes = async function (id){
    db.itunes.insert({'_id' : id, "counters" : 1});
}

exports.saveNewQuery = async function(query){
    db.queries.insert({'query' : query, 'counters' : 1});
}

exports.updateQueryCounter = async function(id, counter){
    var counters = counter + 1;
    db.queries.updateOne({ 'query': id }, { $set: { "counters": counters } });
}

exports.getQueryByQueryString = async function (searchText) {
    console.log(searchText);
    return await db.queries.find({ query : searchText }).toArray();
}

exports.getTopTenQueries = async function() {
    return await db.queries.aggregate([ { '$sort': { 'counters': -1 } }]).limit(10).toArray();
}