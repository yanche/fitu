(function () {
    angular.module('fitulib')
    .factory('vendor', ['$http', '$q', 'url', 'utility', function ($http, $q, url, utility) {
        return {
            getManagableVendors: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate(options.preview ? 'vendorpreview' : 'vendors'),
                    params: {
                        managable: 1,
                        page: options.page,
                        pageSize: options.pageSize
                    }
                }).success(function (data) {
                    data.list = data.list.map(function (vd) { vd.logoUrl = utility.getStaticUrl(vd.logoUrl); return vd; });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to get managable vendors: ' + status);
                });
                return defer.promise;
            },
            getVendors: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate(options.preview ? 'vendorpreview' : 'vendors'),
                    params: {
                        page: options.page,
                        pageSize: options.pageSize
                    }
                }).success(function (data) {
                    data.list = data.list.map(function (vd) { vd.logoUrl = utility.getStaticUrl(vd.logoUrl); return vd; });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to get vendors: ' + status);
                });
                return defer.promise;
            },
            getOne: function (options) {
                options = options || {};
                var defer = new $q.defer();
                if (options.id) {
                    $http({
                        method: 'GET',
                        url: url.generate(options.preview ? 'vendorpreview' : 'vendors'),
                        params: { id: options.id }
                    }).success(function (data) {
                        data.logoUrl = utility.getStaticUrl(data.logoUrl);
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        console.log(arguments);
                        defer.reject('failed to get one vendor: ' + status);
                    });
                }
                else
                    defer.reject('id not supplied');
                return defer.promise;
            },
            update: function (options) {
                options = options || {};
                var defer = new $q.defer();
                if (options.id || options.data) {
                    if (options.data.logoUrl)
                        options.data.logoUrl = utility.getRelativeUrl(options.data.logoUrl);
                    $http({
                        method: 'PUT',
                        url: url.generate('vendors'),
                        params: { id: options.id },
                        data: options.data
                    }).success(function (data) {
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        console.log(arguments);
                        defer.reject('failed to get vendors: ' + status);
                    });
                }
                else
                    defer.reject('id or data not supplied');
                return defer.promise;
            }
        };
    }]);
})();