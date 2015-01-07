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
                        data.list = data.list.map(function (mem) {
                            if (mem.activity) mem.activity.picUrl = utility.getStaticUrl(mem.activity.picUrl);
                            return mem;
                        });
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
                    if (data.activity) data.activity.picUrl = utility.getStaticUrl(data.activity.picUrl);
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