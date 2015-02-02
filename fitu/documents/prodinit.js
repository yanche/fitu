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
    headUrl: config.defaultHeadUrl,
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
    headUrl: config.defaultHeadUrl,
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
    headUrl: config.defaultHeadUrl,
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
    intro: '宛平宾馆是i户外第一个固定的周末瑜伽点喔。。。',
    logoUrl: config.defaultVendorLogoUrl,
    createdOn: new Date(),
    statusId: constants.status.vendorStatus.active,
    contact: '021-54679888'
};

var site1 = {
    name: '宛平宾馆健身房',
    tags: ['yg'],
    location: vendor1.location,
    prices: [{ amount: 36, freq: { num: 1, measure: 'h' }, people: 1, comments: '单次价格' }],
    open: { startsOn: { hour: 8, min: 0 }, endsOn: { hour: 20, min: 0 } },
    contact: '021-54679888',
    intro: '宛平宾馆健身房是i户外第一个固定的周末瑜伽点喔。。。',
    picUrl: config.defaultSitePicUrl,
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
        return db.vendor.insertOneVendor(vendor1);
    })
    .then(function (vendor1) {
        site1.vendorId = vendor1._id;
        site1.createdBy = vendor1.ownerId;
        return db.site.insertOneSite(site1);
    })
    .then(function () {
        console.log('done');
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