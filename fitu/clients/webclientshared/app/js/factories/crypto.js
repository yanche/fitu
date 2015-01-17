(function () {
    angular.module('fitulib')
    .factory('crypto', ['$location', 'utility', '$http', '$q', 'const', 'url', function ($location, utility, $http, $q, constants, url) {
        var wx_CL = new utility.CachedLoader(function () {
            var defer = new $q.defer();
            return defer.promise;
        });

        var ret = {
            sha1: function (input) {
                return CryptoJS.SHA1(input).toString();
            },
            wxsign: function () {
                $http({
                    method: 'GET',
                    url: url.generate('wx')
                }).success(function (data) {
                    data.debug = true;
                    data.jsApiList = ['chooseImage'];
                    alert(JSON.stringify(data));
                    wx.config(data);
                    wx.ready(function () {
                        console.log('config ready');
                        console.log(JSON.stringify(arguments));
                    })
                    wx.error(function () {
                        console.log('config error');
                        console.log(JSON.stringify(arguments));
                    });
                }).error(function (data, status, headers, config) {
                    console.log('failed to retrieve wx js api config obj: ' + status);
                });
            }
        };
        return ret;
    }]);
})();