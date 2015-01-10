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
    special: 1
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
    special: 2
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
    special: 0
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
    special: 0
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
    special: 0
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
    special: 0
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
    special: 0
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
    special: 0
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
    special: 0
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
    special: 0
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
    special: 0
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
    createdOn: new Date()
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
    createdOn: new Date()
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
    intro: 'intro for site 1',
    picUrl: config.defaultSitePicUrl,
    createdOn: new Date()
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
    intro: 'intro for site 2',
    picUrl: config.defaultSitePicUrl,
    createdOn: new Date()
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
    picUrl: config.defaultSitePicUrl,
    createdOn: new Date()
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
    intro: 'intro for site 4',
    picUrl: config.defaultSitePicUrl,
    createdOn: new Date()
};

var siteidle1 = {
    slots: 10,
    price: 30.5,
    startsOn: new Date('2014/10/1'),
    endsOn: new Date('2014/10/1'),
    tags: ['yg'],
    createdOn: new Date()
};
var siteidle2 = {
    slots: 5,
    price: 30.6,
    startsOn: new Date('2014/11/1'),
    endsOn: new Date('2014/11/1'),
    tags: ['ft'],
    createdOn: new Date()
};
var siteidle3 = {
    slots: 100,
    price: 50,
    startsOn: new Date('2014/12/1'),
    endsOn: new Date('2014/12/1'),
    tags: ['sw'],
    createdOn: new Date()
};
var siteidle4 = {
    slots: 15,
    price: 25,
    startsOn: new Date('2014/12/12'),
    endsOn: new Date('2014/12/12'),
    tags: ['rk'],
    createdOn: new Date()
};

var act1 = {
    name: 'act 1',
    price: siteidle1.price,
    startsOn: siteidle1.startsOn,
    endsOn: siteidle1.endsOn,
    createdOn: new Date(),
    tags: ['yg'],
    intro: 'intro for act 1',
    recruitment: [],
    picUrl: config.defaultActivityPicUrl,
    capacity: siteidle1.slots
};
var act2 = {
    name: 'act 2',
    price: siteidle2.price,
    startsOn: siteidle2.startsOn,
    endsOn: siteidle2.endsOn,
    createdOn: new Date(),
    tags: ['ft'],
    intro: 'intro for act 2',
    recruitment: [],
    picUrl: config.defaultActivityPicUrl,
    capacity: siteidle2.slots
};
var act3 = {
    name: 'act 3',
    price: siteidle3.price,
    startsOn: siteidle3.startsOn,
    endsOn: siteidle3.endsOn,
    createdOn: new Date(),
    tags: ['sw'],
    intro: 'intro for act 3',
    recruitment: [],
    picUrl: config.defaultActivityPicUrl,
    capacity: siteidle3.slots
};
var act4 = {
    name: 'act 4',
    price: siteidle4.price,
    startsOn: siteidle4.startsOn,
    endsOn: siteidle4.endsOn,
    createdOn: new Date(),
    tags: ['rk'],
    intro: 'intro for act 4',
    recruitment: [],
    picUrl: config.defaultActivityPicUrl,
    capacity: siteidle4.slots
};

var start = function () {
    bluebird.all([
        db.user.removeUsers({}),
        db.site.removeSites({}),
        db.activity.removeActs({}),
        db.member.removeMembers({}),
        db.siteidle.removeSiteIdles({}),
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
        siteidle1.siteId = sites[0]._id;
        siteidle1.vendorId = sites[0].vendorId;
        siteidle1.createdBy = sites[0].createdBy;
        siteidle2.siteId = sites[0]._id;
        siteidle2.vendorId = sites[0].vendorId;
        siteidle2.createdBy = sites[1].createdBy;
        siteidle3.siteId = sites[2]._id;
        siteidle3.vendorId = sites[2].vendorId;
        siteidle3.createdBy = sites[2].createdBy;
        siteidle4.siteId = sites[3]._id;
        siteidle4.vendorId = sites[3].vendorId;
        siteidle4.createdBy = sites[3].createdBy;
        return bluebird.all([
            db.siteidle.insertOneSiteIdle(siteidle1),
            db.siteidle.insertOneSiteIdle(siteidle2),
            db.siteidle.insertOneSiteIdle(siteidle3),
            db.siteidle.insertOneSiteIdle(siteidle4)
        ]);
    })
    .then(function (idles) {
        act1.siteIdleId = idles[0]._id;
        act1.siteId = idles[0].siteId;
        act1.vendorId = idles[0].vendorId;
        act1.createdBy = idles[0].createdBy;
        act2.siteIdleId = idles[1]._id;
        act2.siteId = idles[1].siteId;
        act2.vendorId = idles[1].vendorId;
        act2.createdBy = actOrganizer1._id;
        act3.siteIdleId = idles[2]._id;
        act3.siteId = idles[2].siteId;
        act3.vendorId = idles[2].vendorId;
        act3.createdBy = idles[2].createdBy;
        act4.siteIdleId = idles[3]._id;
        act4.siteId = idles[3].siteId;
        act4.vendorId = idles[3].vendorId;
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
            statusId: constants.status.memberStatus.queued
        };
        var mem2 = {
            userId: user2._id,
            actId: acts[1]._id,
            createdOn: new Date(),
            statusId: constants.status.memberStatus.quit
        };
        var mem3 = {
            userId: user2._id,
            actId: acts[2]._id,
            createdOn: new Date(),
            statusId: constants.status.memberStatus.queued
        };
        var mem4 = {
            userId: user3._id,
            actId: acts[3]._id,
            createdOn: new Date(),
            statusId: constants.status.memberStatus.confirmed
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