﻿(function () {
    angular.module('fitulib')
    .factory('const', [function () {
        return {
            siteInfo: siteInfo,
            resources: {
                loadingImg: siteInfo.storageBase + '/loading.gif',
                defaultSitePic: siteInfo.storageBase + '/sitepic.jpg',
                defaultVendorPic: siteInfo.storageBase + '/vendorpic.jpg',
                defaultActPic: siteInfo.storageBase + '/actpic.jpg'
            },
            status: {
                member: { queued: 10, inTeam: 20, quit: 30 }
            },
            dateFormat: 'YYYY/MM/DD',
            dateTimeFormat: 'YYYY/MM/DD HH:mm',
            timeFormat: 'HH:mm',
            timeAFormat: 'aHH:mm',
            actTimeFormat: 'M.Ddd HH:mm',
            actTimeFormat2: 'M.Dddd HH:mm',
            tags: [
                { value: '瑜伽', key: 'yg' },
                { value: '游泳', key: 'sw' },
                { value: '羽毛球', key: 'bm' },
                { value: '足球', key: 'fb' },
                { value: '篮球', key: 'bk' },
                { value: '乒乓球', key: 'pp' },
                { value: '网球', key: 'tn' },
                { value: '台球', key: 'bl' },
                { value: '骑行', key: 'cl' },
                { value: '攀岩', key: 'rk' },
                { value: '健身', key: 'ft' },
                { value: '剑道', key: 'jd' },
                { value: '散打', key: 'sd' },
                { value: '跆拳道', key: 'tq' },
                { value: '跑酷', key: 'pk' },
                { value: '空手道', key: 'ks' },
                { value: '飞盘', key: 'fp' },
                { value: '轮滑', key: 'lh' },
                { value: '定向越野', key: 'dx' },
                { value: '棒垒球', key: 'lq' }
            ],
            priceMeasure: [
                { value: '分', key: 'm' },
                { value: '小时', key: 'h' },
                { value: '月', key: 'M' },
                { value: '年', key: 'y' }
            ],
            hour24: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            minutesQuarter: [0, 15, 30, 45],
            noteContentTypes: { plain: 'plain', html: 'html', markdown: 'markdown' },
            actStatus: { active: 100, cancel: 101 },
            memberStatus: { pending: 200, quit: 201, confirmed: 202 },
            siteStatus: { active: 300, inactive: 301 },
            vendorStatus: { active: 400, inactive: 401 },
            gender: { male: 'male', female: 'female', unknown: 'unknown' },
            genderList: [{key:'male',name:'male'}, { key: 'female', name: 'female' }, { key: 'unknown', name: 'unknown' }],
            memberPayStatus: { paid: 500, unpaid: 501 },
            vcTypes: { mobileV: 'mobileV'}
        };
    }]);
})();