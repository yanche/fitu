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
                    url: url.generate('sites'),
                    params: {
                        subscribedSitesOf: options.subscribedSitesOf,
                        vendorId: options.vendorId,
                        page: options.page,
                        pageSize: options.pageSize,
                        tag: options.tag,
                        active: 1
                    }
                })
                .success(function (data) {
                    data.list = data.list.map(function (st) {
                        st.picUrl = utility.getStaticUrl(st.picUrl);
                        if (st.vendor && st.vendor.logoUrl)
                            st.vendor.logoUrl = utility.getStaticUrl(st.vendor.logoUrl);
                        return st;
                    });
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            getOne: function (options) {
                var defer = new $q.defer();
                if (options.id) {
                    $http({
                        method: 'GET',
                        url: url.generate('sites'),
                        params: { id: options.id }
                    })
                    .success(function (data) {
                        data.picUrl = utility.getStaticUrl(data.picUrl);
                        if (data.vendor && data.vendor.logoUrl)
                            data.vendor.logoUrl = utility.getStaticUrl(data.vendor.logoUrl);
                        defer.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        defer.reject({ data: data, status: status, headers: headers });
                    });
                }
                else
                    defer.reject({ data: null, status: 0, headers: null });
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
                })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            update: function (id, delta) {
                var defer = new $q.defer();
                if (delta.picUrl)
                    delta.picUrl = utility.getRelativeUrl(delta.picUrl);
                $http({
                    method: 'POST',
                    url: url.generate('sites'),
                    params: { id: id },
                    data: delta
                })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            createMessage: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('messages'),
                    data: { words: options.message, replyToId: options.replyToId },
                    params: { targetType: 'site', targetId: options.id }
                })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            getMessages: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('messages'),
                    params: { targetType: 'site', targetId: options.id, page: options.page, pageSize: options.pageSize }
                })
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            }
        };
    }]);
})();