
var createNonceStr = function () {
    return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var ret = [];
    keys.forEach(function (key) {
        ret.push(key.toLowerCase() + '=' + args[key]);
    });
    console.log(ret.join('&'));
    return ret.join('&');
};

var ret = {
    jsapi_ticket: 'bxLdikRXVbTPdHSM05e5u6GXdGHVd3Ak9Hk0byiDUBEpw8jT7Cbp2YL8ccQgCG94Tzu5Xr0y6XAMKrYh-WFSRg',
    nonceStr: 'BxeA41UIO2aI59uD',
    timestamp: 1421499529,
    url: 'http://admin.1dong.me/'
};
ret.signature = CryptoJS.SHA1(raw(ret)).toString();
ret.jsApiList = ['startRecord'];
ret.appId = 'wxcdcdc23de5d4f1f8';

wx.config(ret);
//console.log(ret);