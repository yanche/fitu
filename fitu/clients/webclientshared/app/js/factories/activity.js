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
                    data.list = data.list.map(function (act) {
                        act.picUrl = utility.getStaticUrl(act.picUrl);
                        if (act.creator && act.creator.headUrl)
                            act.creator.headUrl = utility.getStaticUrl(act.creator.headUrl);
                        return act;
                    });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve activity list: ' + status);
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
                    data.picUrl = utility.getStaticUrl(data.picUrl);
                    if (data.creator && data.creator.headUrl)
                        data.creator.headUrl = utility.getStaticUrl(data.creator.headUrl);
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve act: ' + status);
                });
                return defer.promise;
            },
            create: function (options) {
                options = options || {};
                if (options.data && options.data.picUrl)
                    options.data.picUrl = utility.getRelativeUrl(options.data.picUrl);
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
                    defer.reject('failed to create new act: ' + status);
                });
                return defer.promise;
            },
            update: function (options) {
                options = options || {};
                if (options.data && options.data.picUrl)
                    options.data.picUrl = utility.getRelativeUrl(options.data.picUrl);
                var defer = new $q.defer();
                $http({
                    method: 'PUT',
                    url: url.generate('activities'),
                    data: options.data,
                    params: { id: options.id }
                }).success(function (data, status, headers, config) {
                    defer.resolve();
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to update new act: ' + status);
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
                    defer.reject('failed to create new message: ' + status);
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
                    defer.reject('failed to get act messages: ' + status);
                });
                return defer.promise;
            },
            actNotActive: function (act) {
                if (!act)
                    return true;
                else
                    return act.statusId != constants.actStatus.active || moment(act.startsOn) < moment();
            },
            actStatus: function (act) {
                if (!act)
                    return '';
                if (act.statusId == constants.actStatus.cancel)
                    return '已取消';
                var s = moment(act.startsOn), e = moment(act.endsOn), now = moment();
                if (!s.isValid() || !e.isValid())
                    return '';
                else if (s > now)
                    return '';
                else if (e > now)
                    return '已开始';
                else
                    return '已结束';
            }
        };
    }]);
})();