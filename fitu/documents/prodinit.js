var bluebird = require('bluebird');
var config = require('config');
var constants = require('const');
var db = require('dbaccess');
var mongodb = require('mongodb');

var god = {
    personal: {
        nickName: 'godNick',
        phone: '15201928369',
        contact: 'god@fitu.com',
        gender: constants.common.gender.male
    },
    email: 'god@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: { path: config.defaultHeadUrl, storage: 'local' },
    special: 1,
    subscribe: { users: [], sites: [] },
    fans: []
};
var ob = {
    personal: {
        nickName: 'obNick',
        phone: '15201928369',
        contact: 'ob@fitu.com',
        gender: constants.common.gender.female
    },
    email: 'ob@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: { path: config.defaultHeadUrl, storage: 'local' },
    special: 2,
    subscribe: { users: [], sites: [] },
    fans: []
};
var user1 = {
    personal: {
        nickName: 'user 1',
        phone: '15201928369',
        contact: 'user1@fitu.com',
        gender: constants.common.gender.male
    },
    email: 'user1@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: { path: config.defaultHeadUrl, storage: 'local' },
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};

var vendor1 = {
    name: '宛平宾馆',
    tags: ['yg'],
    location: {
        address: '宛平路315号宛平宾馆2楼(近衡山路)',
        geo: {
            lat: 31.204526,
            lng: 121.451126
        }
    },
    intro: '宛平宾馆',
    logoUrl: { path: config.defaultVendorLogoUrl, storage: 'local' },
    createdOn: new Date(),
    statusId: constants.status.vendorStatus.active,
    contact: '021-54679888'
};

var vendor2 = {
    name: '茂名南路哈达瑜伽',
    tags: ['yg'],
    location: {
        address: '茂名南路1号3楼301室哈达瑜伽会馆',
        geo: {
            lat: 31.229618,
            lng: 121.46726
        }
    },
    intro: '哈达瑜伽',
    logoUrl: { path: config.defaultVendorLogoUrl, storage: 'local' },
    createdOn: new Date(),
    statusId: constants.status.vendorStatus.active,
    contact: '021-62180955'
};

var site1 = {
    name: '宛平宾馆健身房',
    tags: ['yg'],
    location: vendor1.location,
    prices: [{ amount: 36, freq: { num: 1, measure: 'h' }, people: 1, comments: '单次价格' }],
    open: { startsOn: { hour: 8, min: 0 }, endsOn: { hour: 20, min: 0 } },
    contact: '021-54679888',
    intro: '宛平宾馆',
    picUrl: { path: config.defaultSitePicUrl, storage: 'local' },
    createdOn: new Date(),
    fans: [],
    statusId: constants.status.siteStatus.active
};

var site2 = {
    name: '茂名南路哈达瑜伽',
    tags: ['yg'],
    location: vendor2.location,
    prices: [{ amount: 36, freq: { num: 1, measure: 'h' }, people: 1, comments: '单次价格' }],
    open: { startsOn: { hour: 12, min: 0 }, endsOn: { hour: 20, min: 0 } },
    contact: '021-62180955',
    intro: '哈达瑜伽',
    picUrl: { path: config.defaultSitePicUrl, storage: 'local' },
    createdOn: new Date(),
    fans: [],
    statusId: constants.status.siteStatus.active
};

var start = function () {
    bluebird.all([
        db.user.removeUsers({}),
        db.site.removeSites({}),
        db.activity.removeActs({}),
        db.member.removeMembers({}),
        db.vendor.removeVendors({}),
        db.session.removeSessions({}),
        db.message.removeMessages({}),
        db.note.removeNotes({})
    ])
    .then(function () {
        return bluebird.all([
            db.user.insertOneUser(god),
            db.user.insertOneUser(ob),
            db.user.insertOneUser(user1),
        ]);
    })
    .then(function (users) {
        var god = users[0], ob = users[1], user1 = users[2];
        vendor1.createdBy = god._id;
        vendor1.ownerId = user1._id;
        vendor1.admins = [];
        vendor2.createdBy = god._id;
        vendor2.ownerId = user1._id;
        vendor2.admins = [];
        return bluebird.all([db.vendor.insertOneVendor(vendor1), db.vendor.insertOneVendor(vendor2)]);
    })
    .then(function (data) {
        site1.vendorId = data[0]._id;
        site1.createdBy = data[0].ownerId;
        site2.vendorId = data[1]._id;
        site2.createdBy = data[1].ownerId;
        return bluebird.all([db.site.insertOneSite(site1), db.site.insertOneSite(site2)]);
    })
    .then(function () {
        console.log('done');
        process.exit();
    })
    .catch(function (err) {
        console.log(err.stack);
    });

};

//init mongodb connection
mongodb.MongoClient.connect('mongodb://localhost:27017/fitu?w=majority', function (err, mdb) {
    if (err)
        throw new Error('failed connect to db: ' + dbConnStr);
    else {
        db.connect(mdb);
        start();
    }
});