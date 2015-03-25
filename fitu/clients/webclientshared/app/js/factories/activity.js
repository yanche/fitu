(function () {
    angular.module('fitulib')
    .factory('activity', ['$http', '$q', 'url', 'utility', 'const', function ($http, $q, url, utility, constants) {
        return {
            getList: function (options) {
                options = options || {};
                //TODO: pagination
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('activities'),
                    params: {
                        page: options.page,
                        pageSize: options.pageSize,
                        tag: options.tag,
                        siteId: options.siteId,
                        vendorId: options.vendorId,
                        lead: options.lead,
                        active: options.active
                    }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            getOne: function (actId) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('activities'),
                    params: { id: actId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            getCensus: function (actId) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('actcensus'),
                    params: { id: actId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            create: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('activities'),
                    data: options.data,
                    params: { siteId: options.siteId }
                }).success(function (data, status, headers, config) {
                    defer.resolve({ id: data ? data.id : null });
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            update: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('activities'),
                    data: options.data,
                    params: { id: options.id }
                }).success(function (data, status, headers, config) {
                    defer.resolve();
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            delete: function (id) {
                var defer = new $q.defer();
                $http({
                    method: 'DELETE',
                    url: url.generate('activities'),
                    params: { id: id }
                }).success(function (data, status, headers, config) {
                    defer.resolve({ id: data ? data.id : null });
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
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
                    params: { targetType: 'act', targetId: options.id }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
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
                    params: { targetType: 'act', targetId: options.id, page: options.page, pageSize: options.pageSize }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            }
        };
    }]);
})();