(function () {
    angular.module('fitulib')
    .factory('siteidle', ['$http', '$q', 'url', 'utility', function ($http, $q, url, utility) {
        return {
            getList: function (options) {
                options = options || {};
                //TODO: pagination
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('siteidles'),
                    params: {
                        vendorId: options.vendorId,
                        siteId: options.siteId,
                        page: options.page,
                        pageSize: options.pageSize,
                        tag: options.tag
                    }
                }).success(function (data) {
                    data.list = data.list.map(function (idle) {
                        idle.site.picUrl = utility.getStaticUrl(idle.site.picUrl);
                        idle.vendor.logoUrl = utility.getStaticUrl(idle.vendor.logoUrl);
                        return idle;
                    });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve siteidle list: ' + status);
                });
                return defer.promise;
            },
            getOne: function (id) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('siteidles'),
                    params: { id: id }
                }).success(function (data) {
                    data.site.picUrl = utility.getStaticUrl(data.site.picUrl);
                    data.vendor.logoUrl = utility.getStaticUrl(data.vendor.logoUrl);
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve siteidle: ' + status);
                });
                return defer.promise;
            },
            create: function (siteId, siteidle) {
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('siteidles'),
                    params: { siteId: siteId },
                    data: siteidle
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to create new site: ' + status);
                });
                return defer.promise;
            },
            update: function (id, delta) {
                var defer = new $q.defer();
                $http({
                    method: 'PUT',
                    url: url.generate('siteidles'),
                    params: { id: id },
                    data: delta
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to update siteidle: ' + status);
                });
                return defer.promise;
            }
        };
    }]);
})();