(function () {
    angular.module('fitulib')
    .factory('footprint', ['$http', '$q', 'url', 'utility', function ($http, $q, url, utility) {
        return {
            getMyself: function (options) {
                options = options || {};
                var defer = new $q.defer();
                if (!$.cookie('userId'))
                    defer.reject('no user id in cookie');
                else {
                    $http({
                        method: 'GET',
                        url: url.generate('footprints'),
                        params: {
                            userId: $.cookie('userId'),
                            page: options.page,
                            pageSize: options.pageSize
                        }
                    }).success(function (data) {
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        defer.reject('failed to retrieve footprints: ' + status);
                    });
                }
                return defer.promise;
            },
            getOne: function (footprintId) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('footprints'),
                    params: { id: footprintId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve one footprint: ' + status);
                });
                return defer.promise;
            }
        };
    }]);
})();