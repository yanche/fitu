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
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            getMyNotes_IN: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('notes'),
                    params: { recipientId: $.cookie('userId'), page: options.page, pageSize: options.pageSize }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            getMyNotes_OUT: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('notes'),
                    params: { authorId: $.cookie('userId'), page: options.page, pageSize: options.pageSize }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            getMyNotes_SYS: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('notes'),
                    params: { recipientId: $.cookie('userId'), page: options.page, pageSize: options.pageSize, sys: 1 }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            getPendingNotesCount: function () {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('pendingnotes'),
                    params: { recipientId: $.cookie('userId') }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject({ data: data, status: status, headers: headers });
                });
                return defer.promise;
            },
            setNoteRead: function (options) {
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('notes'),
                    params: { id: options.id }
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