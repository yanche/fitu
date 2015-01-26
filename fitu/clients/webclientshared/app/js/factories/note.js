(function () {
    angular.module('fitulib')
    .factory('note', ['$http', '$q', 'url', 'utility', function ($http, $q, url, utility) {
        return {
            sendNote: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('notes'),
                    params: { actId: options.actId, recipientId: options.recipientId }, //backend: recipientId has higher priority
                    data: options.data
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to send note: ' + status);
                });
                return defer.promise;
            },
            getMyNotes_IN: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('notes'),
                    params: { recipientId: $.cookie('userId'), page: options.page, pageSize: options.pageSize },
                    data: options.data
                }).success(function (data) {
                    data.list = data.list.map(function (nt) {
                        nt.author.headUrl = utility.getStaticUrl(nt.author.headUrl);
                        nt.recipients = nt.recipients.map(function (recp) {
                            recp.headUrl = utility.getStaticUrl(recp.headUrl);
                            return recp;
                        });
                        return nt;
                    });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to get my in notes: ' + status);
                });
                return defer.promise;
            },
            getMyNotes_OUT: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('notes'),
                    params: { authorId: $.cookie('userId'), page: options.page, pageSize: options.pageSize },
                    data: options.data
                }).success(function (data) {
                    data.list = data.list.map(function (nt) {
                        nt.author.headUrl = utility.getStaticUrl(nt.author.headUrl);
                        nt.recipients = nt.recipients.map(function (recp) {
                            recp.headUrl = utility.getStaticUrl(recp.headUrl);
                            return recp;
                        });
                        return nt;
                    });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to get my out notes: ' + status);
                });
                return defer.promise;
            },
            getMyNotes_SYS: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('notes'),
                    params: { recipientId: $.cookie('userId'), page: options.page, pageSize: options.pageSize, sys: 1 },
                    data: options.data
                }).success(function (data) {
                    data.list = data.list.map(function (nt) {
                        nt.recipients = nt.recipients.map(function (recp) {
                            recp.headUrl = utility.getStaticUrl(recp.headUrl);
                            return recp;
                        });
                        return nt;
                    });
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to get my sys notes: ' + status);
                });
                return defer.promise;
            }
        };
    }]);
})();