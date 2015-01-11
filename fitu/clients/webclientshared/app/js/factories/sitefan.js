(function () {
    angular.module('fitulib')
    .factory('sitefan', ['$http', '$q', 'url', function ($http, $q, url) {
        return {
            relationship: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('sitefans'),
                    params: { siteId: options.siteId }
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
                    url: url.generate('sitefans'),
                    params: { siteId: options.siteId }
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
                    url: url.generate('sitefans'),
                    params: { siteId: options.siteId }
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