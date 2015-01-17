(function () {
    angular.module('fitulib')
    .factory('crypto', ['$location', 'utility', '$http', '$q', 'const', 'url', function ($location, utility, $http, $q, constants, url) {
        var wx_CL = new utility.CachedLoader(function () {
            var defer = new $q.defer();
            $http({
                method: 'GET',
                url: url.generate('wxticket')
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                console.log('failed to retrieve wxtoken: ' + status);
                defer.resolve(null);
            });
            return defer.promise;
        });
        var ret = {
            sha1: function (input) {
                return CryptoJS.SHA1(input).toString();
            },
            wxsign: function (refresh) {
                wx_CL.load(refresh)
                .then(function (data) {
                    var ticket = data.ticket;
                    var ts = new Date().getTime().toString();
                    var nonceStr = ret.sha1(ts);
                    var url = $location.absUrl();
                    var hashIndex = url.indexOf('#');
                    url = url.slice(0, hashIndex >= 0 ? hashIndex : url.length);
                    
                    /*
                    return {
                        signiture: ret.sha1(['jsapi_ticket=' + ticket, 'noncestr=' + nonceStr, 'timestamp=' + ts, 'url=' + url].join('&')),
                        timestamp: ts,
                        nonceStr: nonceStr,
                        url: url
                    };
                    //wx is a global reference, for WX JS API
                    //http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
                    console.log('url for wx api is: ' + url);*/
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: constants.wx.appId, // 必填，公众号的唯一标识
                        timestamp: ts, // 必填，生成签名的时间戳
                        nonceStr: nonceStr, // 必填，生成签名的随机串
                        signature: ret.sha1(['jsapi_ticket=' + ticket, 'noncestr=' + nonceStr, 'timestamp=' + ts, 'url=' + url].join('&')),// 必填，签名，见附录1
                        jsApiList: ['chooseImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        alert('config ready');
                        alert(JSON.stringify(arguments));
                    })
                    wx.error(function () {
                        alert('config error');
                        alert(JSON.stringify(arguments));
                    });
                    /*
                    wx.checkJsApi({
                        jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                        success: function (res) {
                            alert(JSON.stringify(res));
                            // 以键值对的形式返回，可用的api值true，不可用为false
                            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                        }
                    });*/
                });
            }
        };
        return ret;
    }]);
})();