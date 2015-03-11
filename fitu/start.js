
var http = require('http');
var api = require('api');
var config = require('config');
var dbaccess = require('dbaccess');
var mongodb = require('mongodb');
var extension = require('extension');
var path = require('path');
var infra = require('infra');
var FileUploader = require('fileuploader');
var FileService = require('fileservice');
var WebPageService = require('webpageservice');
var moment = require('moment');
var validate = require('validate');

//init mongodb connection
mongodb.MongoClient.connect(config.dbConnStr, function (err, db) {
    if (err)
        throw new Error('failed connect to db: ' + dbConnStr);
    else
        dbaccess.connect(db);
});

//page & data server
var userClientService = new WebPageService({ wdir: path.join(__dirname, 'clients', 'userwebclient') });
var userClientPCService = new WebPageService({ wdir: path.join(__dirname, 'clients', 'userwebclient_pc') });
var vendorClientService = new WebPageService({ wdir: path.join(__dirname, 'clients', 'vendorwebclient') });
var adminClientService = new WebPageService({ wdir: path.join(__dirname, 'clients', 'adminwebclient') });
var httpEntry = function (req, res) {
    dbaccess.visitedUA.upsertUARecord({ 'ua': req.headers['user-agent'] }, { $inc: { count: 1 } });

    var webreq = new infra.Webreq(req);
    webreq.init()
    .then(function () {
        var host = webreq._raw.headers.host;
        if (!validate.valuedString(host)) {
            console.log('invalid host: ' + host);
            host = 'www.';
        }
        var type = host.split('.')[0];
        switch (type) {
            case 'api':
                return api.handle(webreq);
            case 'www':
                //if (validate.userAgentMobile(webreq._raw.headers['user-agent']))
                return userClientService.handle(webreq);
                //else
                //    return userClientPCService.handle(webreq);
            case 'vendor':
                return vendorClientService.handle(webreq);
            case 'admin':
                return adminClientService.handle(webreq);
            default:
                return extension.http.webres404();
        }
    })
    .then(function (webres) {
        //setTimeout(function () { webres.response(res) }, 500);
        webres.response(res);
    });
};
http.createServer(httpEntry)
.listen(config.userWebServer.port, function () {
    console.log('main server listening at port: ' + config.userWebServer.port);
});

//image upload server
var fuploader = new FileUploader({ fsBase: path.join(__dirname, '../' + config.folder4staticFiles), urlBase: '/app/image/uploaded', token: config.uploadFileToken });
http.createServer(function (req, res) {
    var webreq = new infra.Webreq(req);
    webreq.init()
    .then(function () {
        return fuploader.handle(webreq);
    })
    .then(function (webres) {
        webres.response(res);
    });
})
.listen(config.imageUploaderServer.port, function () {
    console.log('image uploading service listening at port: ' + config.imageUploaderServer.port);
});

//simulate a static file service
var fservice = new FileService({ wdir: path.join(__dirname, '../' + config.folder4staticFiles) });
http.createServer(function (req, res) {
    var webreq = new infra.Webreq(req);
    webreq.init()
    .then(function () {
        return fservice.handle(webreq);
    })
    .then(function (webres) {
        webres.setHeader('Access-Control-Allow-Origin', '*'); //for font files
        webres.response(res);
    });
})
.listen(config.staticFileServer.port, function () {
    console.log('file server listening at port: ' + config.staticFileServer.port);
});

var removeSessions = function () {
    dbaccess.session.removeSessions({ lastAccess: { $lt: moment().add({ seconds: -config.sessionTTLInSec })._d } })
    .then(function (ct) {
        console.log(ct + ' sessions removed.');
    })
    .catch(function (err) {
        console.log('failed to remove sessions');
        console.log(err.stack);
    });
};
var removeSessionsScheduler = function () {
    removeSessions();
    setTimeout(removeSessionsScheduler, config.sessionClearFrequencyInSec * 1000);
};
setTimeout(removeSessionsScheduler, 5000); //wait 10 seconds for mongodb initialization

process.on('exit', function () {
    console.log('start.js exists');
});

process.on('uncaughtException', function (err) {
    console.log('start.js caught exception: ');
    console.log(err.stack);
});
