
var Itune = require('../models/entities/itunes');
const fetch = require('node-fetch');

var dbUtils = null;

exports.setup = function (db) {
    dbUtils = db;
}

exports.initWeb = function () {
    return "welcome !!!";
}

exports.getTopTenItunes = async function () {
    try
    {
        var ids = await dbUtils.getTopTenItunes();
        var idsString = "";
        for (var nIndex = 0; nIndex < ids.length ;nIndex++){
            if (ids && ids[nIndex] != NaN){
                idsString += ids[nIndex]._id + ",";
            }
        }

        idsString = idsString.slice(0, idsString.length - 1);
        const fet = await fetch('https://itunes.apple.com/lookup?id=' + idsString);
        var data = await fet.json();
        return data;    
    }
    catch (ex)
    {
        console.log(ex);
        throw new Error("error in get top ten itunes");
    }
}

exports.getItuneById = async function (id) {
    try
    {
        const fet = await fetch('https://itunes.apple.com/lookup?id=' + id);
        var data = await fet.json();
        return data;
    }
    catch(ex)
    {
        console.log(ex);
        throw new Error("error in get itune by id");
    }
}

exports.increaseItunes = async function (id){
    try
    {
        var data = await dbUtils.getItuneById(id);

        if (data && data != undefined && data != NaN){
            if (data && data.length > 0){
                await dbUtils.updateItunesCounter(data[0]._id, data[0].counters);
            }
            else {
                await dbUtils.saveNewItunes(id);
            }
        }
    }
    catch(ex)
    {
        console.log(ex);
        throw new Error("Error in search itunes");
    }
}

exports.getItuneByText = async function (search) {
    try
    {
        const fet = await fetch('https://itunes.apple.com/search?term=' + search + "&limit=25");

        var data = await dbUtils.getQueryByQueryString(search);

        if (data && data != undefined && data != NaN){
            if (data && data.length > 0)
            {
                await dbUtils.updateQueryCounter(data[0].query, data[0].counters);
            }
            else 
            {
                await dbUtils.saveNewQuery(search);
            }
        }

        var data = await fet.json();
        return data;
    }
    catch(ex)
    {
        console.log(ex);
        throw new Error("error in get itune by search");
    }
}

exports.getTopTenQueries = async function () {
    try
    {
        let data = await dbUtils.getTopTenQueries();
        let queries = [];
        if (data) {
            for (var nIndex = 0; nIndex < data.length ;nIndex++)
            {
                queries.push(data[nIndex].query)
            }
        }
        return queries;
    }
    catch(ex)
    {
        console.log(ex);
        throw new Error("error in get itune by id");
    }
}