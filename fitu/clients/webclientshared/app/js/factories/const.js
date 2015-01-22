(function () {
    angular.module('fitulib')
    .factory('const', [function () {
        return {
            siteInfo: siteInfo,
            resources: {
                loadingImg: siteInfo.staticBase + '/app/image/webclientshared/loading.gif',
                defaultSitePic: siteInfo.staticBase + '/app/image/webclientshared/sitepic.jpg',
                defaultVendorPic: siteInfo.staticBase + '/app/image/webclientshared/vendorpic.jpg',
                defaultActPic: siteInfo.staticBase + '/app/image/webclientshared/actpic.jpg'
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
                { value: '健身', key: 'ft' }
            ],
            priceMeasure: [
                { value: '分', key: 'm' },
                { value: '小时', key: 'h' },
                { value: '月', key: 'M' },
                { value: '年', key: 'y' }
            ],
            hour24: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            minutesQuarter: [0,15,30,45],
            noteContentTypes: { plain: 'plain', html: 'html', markdown: 'markdown' },
            actStatus: {active: 100, cancel: 101}
        };
    }]);
})();