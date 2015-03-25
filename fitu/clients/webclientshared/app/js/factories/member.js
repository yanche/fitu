(function () {
    angular.module('fitulib')
    .factory('member', ['$http', '$q', 'url', 'utility', function ($http, $q, url, utility) {
        return {
            getList: function (options) {
                options = options || {};
                //TODO: pagination
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('members'),
                    params: {
                        actId: options.actId,
                        page: options.page,
                        pageSize: options.pageSize,
                        preview: options.preview,
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
            getOne: function (memberId) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('members'),
                    params: { id: memberId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            create: function (actId) {
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('members'),
                    params: { actId: actId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            updateStatus: function (memberId, statusId) {
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('members'),
                    params: { id: memberId },
                    data: { statusId: statusId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            updatePayStatus: function (memberId, payStatusId) {
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('members'),
                    params: { id: memberId },
                    data: { payStatusId: payStatusId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            quit: function (memId) {
                var defer = new $q.defer();
                $http({
                    method: 'DELETE',
                    url: url.generate('members'),
                    params: { id: memId }
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