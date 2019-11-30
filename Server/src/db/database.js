
var http = require('http');
var express = require('express');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');

var collections = ['itunes'];

// log on to db
exports.setupDB = function (dbUrl, p_db, callback) {
    mongoClient.connect(dbUrl, function (err, client) {
        if (err) {
            console.log("Could not  connect to DBBBB");
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

exports.getItunes = async function () {
    return await db.itunes.find({}).toArray();
}

exports.getItunesPaging = async function(page, limit) {
    var perPage = limit;
    return await db.itunes.find().skip((perPage * page) - perPage).limit(perPage).toArray();
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
    var itunes = counter + 1;
    db.itunes.updateOne({ '_id': id }, { $set: { "counters": counters } });
}

exports.saveNewItunes = async function (id){
    db.itunes.insert({'_id' : id, "counters" : 1});
}

