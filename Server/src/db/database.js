
var http = require('http');
var express = require('express');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');

var collections = ['Itunes'];

// log on to db
exports.setupDB = function (dbUrl, p_db, callback) {
    mongoClient.connect(dbUrl, function (err, client) {
        if (err) {
            console.log("Could not  connect to DB");
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
    return await db.Itunes.find({}).toArray();
}

exports.getItunesPaging = async function(page, limit) {
    var perPage = limit;
    return await db.Itunes.find().skip((perPage * page) - perPage).limit(perPage).toArray();
}

exports.getTopTenItunes = async function() {
    return await db.Itunes.aggregate([ { '$sort': { 'counters': -1 } }]).limit(10).toArray();
}

exports.getItuneById = async function (id) {
    return await db.Itunes.find({_id : id}).toArray();
}

exports.getItuneByText = async function (searchText) {
    return await db.Itunes.find({"_name" : {$regex: searchText}}).toArray();
}

exports.updateItunesCounter = async function(id, counter){
    var counters = counter + 1;
    db.Itunes.updateOne({ '_id': id }, { $set: { "counters": counters } });
}

exports.saveNewItunes = async function (id){
    db.Itunes.insert({'_id' : id, "counters" : 1});
}

