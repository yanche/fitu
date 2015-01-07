(function () {
    angular.module('fitulib')
    .factory('site', ['$http', '$q', 'url', 'utility', function ($http, $q, url, utility) {
        return {
            getList: function (options) {
                options = options || {};
                //TODO: pagination
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate(options.preview ? 'sitepreview' : 'sites'),
                    params: {
                        vendorId: options.vendorId,
                        page: options.page,
                        pageSize: options.pageSize
                    }
                }).success(function (data) {
                    data.list = data.list.map(function (st) { st.picUrl = utility.getStaticUrl(st.picUrl); return st; });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve site list: ' + status);
                });
                return defer.promise;
            },
            getOne: function (options) {
                var defer = new $q.defer();
                if (options.id) {
                    $http({
                        method: 'GET',
                        url: url.generate(options.preview ? 'sitepreview' : 'sites'),
                        params: { id: options.id }
                    }).success(function (data) {
                        data.picUrl = utility.getStaticUrl(data.picUrl);
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        console.log(arguments);
                        defer.reject('failed to retrieve site: ' + status);
                    });
                }
                else
                    defer.reject('no id supplied');
                return defer.promise;
            },
            create: function (vendorId, site) {
                var defer = new $q.defer();
                if (site.picUrl)
                    site.picUrl = utility.getRelativeUrl(site.picUrl);
                $http({
                    method: 'POST',
                    url: url.generate('sites'),
                    data: site,
                    params: { vendorId: vendorId }
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
                if (delta.picUrl)
                    delta.picUrl = utility.getRelativeUrl(delta.picUrl);
                $http({
                    method: 'PUT',
                    url: url.generate('sites'),
                    params: { id: id },
                    data: delta
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to update sites: ' + status);
                });
                return defer.promise;
            }
        };
    }]);
})();