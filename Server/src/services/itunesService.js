
var Itune = require('../models/entities/itunes');
const fetch = require('node-fetch');
var ItunesBL = require('../bl/ItunesBL')

var dbUtils = null;

exports.setup = function (db) {
    dbUtils = db;
}

exports.initWeb = function (req, res) {
    let data = ItunesBL.initWeb();
    res.send(data);
}

exports.getTopTenItunes = async function (req, res) {
    try
    {
        let data = await ItunesBL.getTopTenItunes();
        res.send(data);
    }
    catch(ex)
    {
        console.log(ex);
        res.send(ex);
    }
}

exports.getItuneById = async function (req, res) {
    try
    {
        var id = +req.params.id;
        let data = await ItunesBL.getItuneById(id);
        res.send(data);
    }
    catch (ex)
    {
        console.log(ex);
        res.send(ex);
    }
}

exports.increaseItunes = async function (req,res){
    try
    {
        var id = +req.params.id;
        await ItunesBL.increaseItunes(id);
    }
    catch(ex)
    {
        console.log(ex);
        res.send(ex);
    }
}

exports.getItuneByText = async function (req, res) {
    try
    {
        var search = req.params.search;
        let data = await ItunesBL.getItuneByText(search);
        res.send(data);
    }
    catch(ex)
    {
        console.log(ex);
        res.send(ex);
    }
}


exports.getTopTenQueries = async function (req,res){
    try
    {
        let data = await ItunesBL.getTopTenQueries();
        res.send(data);
    }
    catch(ex)
    {
        console.log(ex);
        res.send(ex);
    }
}
