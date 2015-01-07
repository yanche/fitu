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
                        userId: options.userId,
                        page: options.page,
                        pageSize: options.pageSize
                    }
                }).success(function (data) {
                    data.list = data.list.map(function (mem) {
                        if (mem.activity) mem.activity.picUrl = utility.getStaticUrl(mem.activity.picUrl);
                        if (mem.user) mem.user.headUrl = utility.getStaticUrl(mem.user.headUrl);
                        return mem;
                    });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve member list: ' + status);
                });
                return defer.promise;
            },
            getMyself: function (options) {
                options = options || {};
                var defer = new $q.defer();
                if (!$.cookie('userId'))
                    defer.reject('no user id in cookie');
                else {
                    $http({
                        method: 'GET',
                        url: url.generate('members'),
                        params: {
                            userId: $.cookie('userId'),
                            page: options.page,
                            pageSize: options.pageSize
                        }
                    }).success(function (data) {
                        data.list = data.list.map(function (mem) {
                            if (mem.activity) mem.activity.picUrl = utility.getStaticUrl(mem.activity.picUrl);
                            if (mem.user) mem.user.headUrl = utility.getStaticUrl(mem.user.headUrl);
                            return mem;
                        });
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        defer.reject(err);
                    });
                }
                return defer.promise;
            },
            getOne: function (memberId) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('members'),
                    params: { id: memberId }
                }).success(function (data) {
                    if (data.activity) data.activity.picUrl = utility.getStaticUrl(data.activity.picUrl);
                    if (data.user) data.user.headUrl = utility.getStaticUrl(data.user.headUrl);
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve member: ' + status);
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
                    defer.reject('failed to create new member: ' + status);
                });
                return defer.promise;
            }
        };
    }]);
})();