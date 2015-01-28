(function () {
    angular.module('fitulib')
    .factory('userfan', ['$http', '$q', 'url', function ($http, $q, url) {
        return {
            relationship: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('userfans'),
                    params: { userId: options.userId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            fan: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('userfans'),
                    params: { userId: options.userId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            noFan: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'DELETE',
                    url: url.generate('userfans'),
                    params: { userId: options.userId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            }
        };
    }]);
})();