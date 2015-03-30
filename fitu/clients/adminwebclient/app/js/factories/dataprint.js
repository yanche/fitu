(function () {
    angular.module('fituad')
    .factory('dataprint', ['$q', '$http', 'url', function ($q, $http, url) {
        var getPrintData = function (options, type) {
            options = options || {};
            var defer = new $q.defer();
            $http({
                method: 'GET',
                url: url.generate('dataprint'),
                params: { type: type, timespan: options.timespan || 7 }
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data, status, headers, config) {
                defer.reject({ data: data, status: status, headers: headers });
            });
            return defer.promise;
        }

        return {
            //timespan
            userprint: function (options) {
                return getPrintData(options, 'user');
            },
            //timespan
            activityprint: function (options) {
                return getPrintData(options, 'activity');
            },
            //timespan
            siteprint: function (options) {
                return getPrintData(options, 'site');
            },
            //timespan
            vendorprint: function (options) {
                return getPrintData(options, 'vendor');
            },
        };
    }]);
})();