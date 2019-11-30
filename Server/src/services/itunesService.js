
var Itune = require('../models/entities/itunes');
const fetch = require('node-fetch');

var dbUtils = null;

exports.setup = function (db) {
    dbUtils = db;
}

exports.initWeb = function (req, res) {
    res.send("welcome !!!");
}

exports.getTopTenItunes = async function (req, res) {
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
    res.send(data);
}

exports.getItuneById = async function (req, res) {
    var id = +req.params.id;
    const fet = await fetch('https://itunes.apple.com/lookup?id=' + id);
    var data = await fet.json();
    res.send(data);
}

exports.increaseItunes = async function (req,res){
    var id = +req.params.id;

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

exports.getItuneByText = async function (req, res) {
    var search = req.params.search;
    const fet = await fetch('https://itunes.apple.com/search?term=' + search + "&limit=25");
    var data = await fet.json();
    res.send(data);
}
