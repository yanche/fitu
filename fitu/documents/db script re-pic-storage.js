var bluebird = require('bluebird');
var config = require('config');
var constants = require('const');
var db = require('dbaccess');
var mongodb = require('mongodb');

//init mongodb connection
mongodb.MongoClient.connect('mongodb://localhost:27017/fitutest?w=majority', function (err, mdb) {
    if (err)
        throw new Error('failed connect to db: ' + dbConnStr);
    else {
        db.connect(mdb);
        start();
    }
});

var start = function () {
    db.user.getUsersFieldsBy({}, { _id: 1, headUrl: 1 })
    .then(function (users) {
        return bluebird.all(users.map(function (u) {
            if (typeof u.headUrl == 'string') {
                var p = u.headUrl.split('/');
                return db.user.updateUsers({ _id: u._id }, { $set: { headUrl: { storage: 'local', path: p[p.length - 1] } } });
            }
            else
                return null;
        }));
    })
    .then(function () {
        console.log('done user head url.');
        return db.activity.getActsFieldsBy({}, { _id: 1, picUrl: 1 });
    })
    .then(function (acts) {
        return bluebird.all(acts.map(function (a) {
            if (typeof a.picUrl == 'string') {
                var p = a.picUrl.split('/');
                return db.activity.updateActs({ _id: a._id }, { $set: { picUrl: { storage: 'local', path: p[p.length - 1] } } });
            }
            else
                return null;
        }));
    })
    .then(function () {
        console.log('done activity pic url.');
        return db.site.getSitesFieldsBy({}, { _id: 1, picUrl: 1 });
    })
    .then(function (sites) {
        return bluebird.all(sites.map(function (s) {
            if (typeof s.picUrl == 'string') {
                var p = s.picUrl.split('/');
                return db.site.updateSites({ _id: s._id }, { $set: { picUrl: { storage: 'local', path: p[p.length - 1] } } });
            }
            else
                return null;
        }));
    })
    .then(function () {
        console.log('done site pic url.');
        return db.vendor.getVendorsFieldsBy({}, { _id: 1, logoUrl: 1 });
    })
    .then(function (vds) {
        return bluebird.all(vds.map(function (v) {
            if (typeof v.logoUrl == 'string') {
                var p = v.logoUrl.split('/');
                return db.vendor.updateVendors({ _id: v._id }, { $set: { logoUrl: { storage: 'local', path: p[p.length - 1] } } });
            }
            else
                return null;
        }));
    })
    .then(function () {
        console.log('done vendor logo url.');
        process.exit();
    });
};