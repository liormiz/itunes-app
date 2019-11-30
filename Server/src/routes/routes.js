exports.configRoutes = function (app, dbUtils) {
    var itunesService = require('../services/itunesService')
    itunesService.setup(dbUtils);
    var ItunesBL = require("../bl/ItunesBL")
    ItunesBL.setup(dbUtils);

    app.get('/', itunesService.initWeb);
    app.get('/itunes/topten', itunesService.getTopTenItunes);
    app.get('/itunes/:id', itunesService.getItuneById);
    app.get('/itunes/increase-search/:id', itunesService.increaseItunes);
    app.get('/itunes/search/:search', itunesService.getItuneByText);
}
