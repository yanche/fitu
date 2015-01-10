(function () {
    angular.module('fitulib')
    .factory('userfan', ['$http', '$q', 'url', 'const', 'utility', function ($http, $q, url, constants, utility) {
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
                    defer.reject(status);
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
                    defer.reject(status);
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
                    defer.reject(status);
                });
                return defer.promise;
            }
        };
    }]);
})();