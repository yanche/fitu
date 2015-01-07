﻿(function () {
    angular.module('fitulib')
    .factory('activity', ['$http', '$q', 'url', 'utility', function ($http, $q, url, utility) {
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
                        lead: options.lead
                    }
                }).success(function (data) {
                    data.list = data.list.map(function (act) { act.picUrl = utility.getStaticUrl(act.picUrl); return act; });
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
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to retrieve act: ' + status);
                });
                return defer.promise;
            },
            create: function (siteId, siteIdleId, act) {
                if (act.picUrl)
                    act.logoUrl = picUrl.getRelativeUrl(act.picUrl);
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('activities'),
                    data: act,
                    params: { siteId: siteId, siteIdleId: siteIdleId }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to create new act: ' + status);
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
            }
        };
    }]);
})();