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
        gender: '男'
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
        gender: '女'
    },
    email: 'ob@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 2,
    subscribe: { users: [], sites: [] },
    fans: []
};
var vdOwner1 = {
    personal: {
        nickName: 'vendor 1',
        phone: '15201928369',
        contact: 'vd1@fitu.com',
        gender: '男'
    },
    email: 'vd1@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};
var vdOwner2 = {
    personal: {
        nickName: 'vendor 2',
        phone: '15201928369',
        contact: 'vd2@fitu.com',
        gender: '男'
    },
    email: 'vd2@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};
var vdAdmin1 = {
    personal: {
        nickName: 'admin 1',
        phone: '15201928369',
        contact: 'admin1@fitu.com',
        gender: '男'
    },
    email: 'admin1@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};
var vdAdmin2 = {
    personal: {
        nickName: 'admin 2',
        phone: '15201928369',
        contact: 'admin2@fitu.com',
        gender: '女'
    },
    email: 'admin2@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};
var actOrganizer1 = {
    personal: {
        nickName: 'organizer 1',
        phone: '15201928369',
        contact: 'organizer1@fitu.com',
        gender: '男'
    },
    email: 'organizer1@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};
var actOrganizer2 = {
    personal: {
        nickName: 'organizer 2',
        phone: '15201928369',
        contact: 'organizer2@fitu.com',
        gender: ''
    },
    email: 'organizer12@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};
var user1 = {
    personal: {
        nickName: 'user 1',
        phone: '15201928369',
        contact: 'user1@fitu.com',
        gender: '男'
    },
    email: 'user1@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};
var user2 = {
    personal: {
        nickName: 'user 2',
        phone: '15201928369',
        contact: 'user2@fitu.com',
        gender: '女'
    },
    email: 'user2@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};
var user3 = {
    personal: {
        nickName: 'user 3',
        phone: '15201928369',
        contact: 'user3@fitu.com',
        gender: ''
    },
    email: 'user3@fitu.com',
    hash_pwd: 'a9993e364706816aba3e25717850c26c9cd0d89d',
    headUrl: config.defaultHeadUrl,
    special: 0,
    subscribe: { users: [], sites: [] },
    fans: []
};

var vendor1 = {
    name: 'vendor 1',
    tags: ['yg', 'ft'],
    location: {
        address: '上海某区某路',
        geo: {
            lat: 31.302124,
            lng: 121.5103
        }
    },
    intro: 'intro for vendor 1',
    logoUrl: config.defaultVendorLogoUrl,
    createdOn: new Date(),
    statusId: constants.status.vendorStatus.active
};
var vendor2 = {
    name: 'vendor 2',
    tags: ['sw', 'rk'],
    location: {
        address: '上海某区某路',
        geo: {
            lat: 31.302124,
            lng: 121.5103
        }
    },
    intro: 'intro for vendor 2',
    logoUrl: config.defaultVendorLogoUrl,
    createdOn: new Date(),
    statusId: constants.status.vendorStatus.active
};

var site1 = {
    name: '某瑜伽场地',
    tags: ['yg'],
    location: {
        address: '上海某区某路',
        geo: {
            lat: 31.302124,
            lng: 121.5103
        }
    },
    prices: [{ amount: 50, freq: { num: 2, measure: 'h' }, people: 1, comments: 'test comment1' },{ amount: 5000, freq: { num: 1, measure: 'y' }, people: 1, comments: 'test comment2' }],
    open: { startsOn: { hour: 8, min: 0 }, endsOn: { hour: 20, min: 0 } },
    contact: '15201928369',
    intro: 'intro for site 1',
    picUrl: config.defaultSitePicUrl,
    createdOn: new Date(),
    fans: [],
    statusId: constants.status.siteStatus.active
};
var site2 = {
    name: '某健身场地',
    tags: ['ft'],
    location: {
        address: '上海某区某路',
        geo: {
            lat: 31.302124,
            lng: 121.5103
        }
    },
    prices: [{ amount: 30, freq: { num: 1, measure: 'h' }, people: 1, comments: 'test comment3' },{ amount: 3000, freq: { num: 6, measure: 'M' }, people: 1, comments: 'test comment4' }],
    open: { startsOn: { hour: 9, min: 30 }, endsOn: { hour: 17, min: 0 } },
    contact: '15201928369',
    intro: 'intro for site 2',
    picUrl: config.defaultSitePicUrl,
    createdOn: new Date(),
    fans: [],
    statusId: constants.status.siteStatus.active
};
var site3 = {
    name: '某游泳场地',
    tags: ['sw'],
    location: {
        address: '上海某区某路',
        geo: {
            lat: 31.302124,
            lng: 121.5103
        }
    },
    intro: 'intro for site 3',
    prices: [{ amount: 60, freq: { num: 1, measure: 'h' }, people: 1, comments: 'test comment5' }],
    open: { startsOn: { hour: 12, min: 0 }, endsOn: { hour: 23, min: 0 } },
    contact: '15201928369',
    picUrl: config.defaultSitePicUrl,
    createdOn: new Date(),
    fans: [],
    statusId: constants.status.siteStatus.active
};
var site4 = {
    name: '某攀岩场地',
    tags: ['rk'],
    location: {
        address: '上海某区某路',
        geo: {
            lat: 31.302124,
            lng: 121.5103
        }
    },
    prices: [{ amount: 30, freq: { num: 2, measure: 'h' }, people: 1, comments: 'test comment6' },{ amount: 200, freq: { num: 2, measure: 'h' }, people: 10, comments: 'test comment7' }],
    open: { startsOn: { hour: 10, min: 0 }, endsOn: { hour: 15, min: 45 } },
    contact: '15201928369',
    intro: 'intro for site 4',
    picUrl: config.defaultSitePicUrl,
    createdOn: new Date(),
    fans: [],
    statusId: constants.status.siteStatus.inactive
};

var act1 = {
    name: 'act 1',
    price: 30,
    startsOn: new Date('2015/10/1 13:00'),
    endsOn: new Date('2015/10/1 14:00'),
    createdOn: new Date(),
    tags: ['yg'],
    intro: 'intro for act 1',
    recruitment: [],
    picUrl: config.defaultActivityPicUrl,
    capacity: 10,
    statusId: constants.status.actStatus.active
};
var act2 = {
    name: 'act 2',
    price: 12.5,
    startsOn: new Date('2015/1/2 9:00'),
    endsOn: new Date('2015/1/2 10:00'),
    createdOn: new Date(),
    tags: ['ft'],
    intro: 'intro for act 2',
    recruitment: [],
    picUrl: config.defaultActivityPicUrl,
    capacity: 15,
    statusId: constants.status.actStatus.active
};
var act3 = {
    name: 'act 3',
    price: 50,
    startsOn: new Date('2015/5/6 19:00'),
    endsOn: new Date('2015/5/6 22:00'),
    createdOn: new Date(),
    tags: ['sw'],
    intro: 'intro for act 3',
    recruitment: [],
    picUrl: config.defaultActivityPicUrl,
    capacity: 60,
    statusId: constants.status.actStatus.active
};
var act4 = {
    name: 'act 4',
    price: 288,
    startsOn: new Date('2015/2/14 12:00'),
    endsOn: new Date('2015/2/14 23:00'),
    createdOn: new Date(),
    tags: ['rk'],
    intro: 'intro for act 4',
    recruitment: [],
    picUrl: config.defaultActivityPicUrl,
    capacity: 4,
    statusId: constants.status.actStatus.cancel
};

var start = function () {
    bluebird.all([
        db.user.removeUsers({}),
        db.site.removeSites({}),
        db.activity.removeActs({}),
        db.member.removeMembers({}),
        db.vendor.removeVendors({}),
        db.session.removeSessions({})
    ])
    .then(function () {
        return bluebird.all([
            db.user.insertOneUser(god),
            db.user.insertOneUser(ob),
            db.user.insertOneUser(vdOwner1),
            db.user.insertOneUser(vdOwner2),
            db.user.insertOneUser(vdAdmin1),
            db.user.insertOneUser(vdAdmin2),
            db.user.insertOneUser(actOrganizer1),
            db.user.insertOneUser(actOrganizer2),
            db.user.insertOneUser(user1),
            db.user.insertOneUser(user2),
            db.user.insertOneUser(user3)
        ]);
    })
    .then(function (users) {
        var god = users[0], ob = users[1], owner1 = users[2], owner2 = users[3], admin1 = users[4], admin2 = users[5];
        actOrganizer1 = users[6];
        actOrganizer2 = users[7];
        user1 = users[8];
        user2 = users[9];
        user3 = users[10];
        vendor1.createdBy = god._id;
        vendor1.ownerId = owner1._id;
        vendor1.admins = [admin1._id];
        vendor2.createdBy = god._id;
        vendor2.ownerId = owner2._id;
        vendor2.admins = [admin2._id];
        return bluebird.all([db.vendor.insertOneVendor(vendor1), db.vendor.insertOneVendor(vendor2)]);
    })
    .then(function (vendors) {
        site1.vendorId = vendors[0]._id;
        site1.createdBy = vendors[0].ownerId;
        site2.vendorId = vendors[0]._id;
        site2.createdBy = vendors[0].admins[0];
        site3.vendorId = vendors[1]._id;
        site3.createdBy = vendors[1].ownerId;
        site4.vendorId = vendors[1]._id;
        site4.createdBy = vendors[1].admins[0];
        return bluebird.all([
            db.site.insertOneSite(site1),
            db.site.insertOneSite(site2),
            db.site.insertOneSite(site3),
            db.site.insertOneSite(site4)
        ]);
    })
    .then(function (sites) {
        act1.siteId = sites[0]._id;
        act1.vendorId = sites[0].vendorId;
        act1.createdBy = actOrganizer1._id;
        act2.siteId = sites[1]._id;
        act2.vendorId = sites[1].vendorId;
        act2.createdBy = actOrganizer1._id;
        act3.siteId = sites[2]._id;
        act3.vendorId = sites[2].vendorId;
        act3.createdBy = actOrganizer2._id;
        act4.siteId = sites[3]._id;
        act4.vendorId = sites[3].vendorId;
        act4.createdBy = actOrganizer2._id;
        return bluebird.all([
            db.activity.insertOneAct(act1),
            db.activity.insertOneAct(act2),
            db.activity.insertOneAct(act3),
            db.activity.insertOneAct(act4)
        ]);
    })
    .then(function (acts) {
        var mem1 = {
            userId: user1._id,
            actId: acts[0]._id,
            createdOn: new Date(),
            statusId: constants.status.memberStatus.quit
        };
        var mem2 = {
            userId: user2._id,
            actId: acts[1]._id,
            createdOn: new Date(),
            statusId: constants.status.memberStatus.active
        };
        var mem3 = {
            userId: user2._id,
            actId: acts[2]._id,
            createdOn: new Date(),
            statusId: constants.status.memberStatus.active
        };
        var mem4 = {
            userId: user3._id,
            actId: acts[3]._id,
            createdOn: new Date(),
            statusId: constants.status.memberStatus.active
        };
        return bluebird.all([
            db.member.insertOneMember(mem1),
            db.member.insertOneMember(mem2),
            db.member.insertOneMember(mem3),
            db.member.insertOneMember(mem4)
        ]);
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