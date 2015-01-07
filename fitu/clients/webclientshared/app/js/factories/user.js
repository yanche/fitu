(function () {
    angular.module('fitulib')
    .factory('user', ['$http', '$q', 'url', 'const', 'utility', function ($http, $q, url, constants, utility) {
        return {
            getLoginUser: function (refresh) {
                var defer = new $q.defer();
                if (!$.cookie('userId')) {
                    defer.reject('no user id in cookie, need login');
                }
                else {
                    $http({
                        method: 'GET',
                        url: url.generate('users'),
                        params: { id: $.cookie('userId') },
                        cache: !Boolean(refresh)
                    }).success(function (data) {
                        data.headUrl = utility.getStaticUrl(data.headUrl);
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        $.cookie('sessionId', '', { domain: constants.siteInfo.domain, path: '/', expires: 365 * 10 })
                        $.cookie('userId', '', { domain: constants.siteInfo.domain, path: '/', expires: 365 * 10 })
                        defer.reject(status);
                    });
                }
                return defer.promise;
            },
            getPreview: function (id) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('users'),
                    params: { id: id, preview: 1 }
                }).success(function (data) {
                    data.headUrl = utility.getStaticUrl(data.headUrl);
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log('failed to retrieve user preview: ' + status);
                    defer.reject(status);
                });
                return defer.promise;
            },
            login: function (email, hash_pwd) {
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('sessions'),
                    data: { email: email, hash_pwd: hash_pwd }
                }).success(function (data) {
                    $.cookie('sessionId', data.sessionId, { expires: 365 * 10, domain: constants.siteInfo.domain, path: '/' });
                    $.cookie('userId', data.userId, { expires: 365 * 10, domain: constants.siteInfo.domain, path: '/' });
                    defer.resolve();
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to create new session: ' + status);
                });
                return defer.promise;
            },
            logout: function () {
                var defer = new $q.defer();
                if ($.cookie('sessionId')) {
                    $http({
                        method: 'DELETE',
                        url: url.generate('sessions'),
                        params: { id: $.cookie('sessionId') }
                    }).success(function (data) {
                        defer.resolve(data);
                        $.cookie('sessionId', '', { domain: constants.siteInfo.domain, path: '/' });
                        $.cookie('userId', '', { domain: constants.siteInfo.domain, path: '/' });
                    }).error(function (data, status, headers, config) {
                        console.log(arguments);
                        defer.reject('failed to remove session: ' + status);
                    });
                }
                return defer.promise;
            },
            create: function (user) {
                if (user.headUrl)
                    user.headUrl = utility.getRelativeUrl(user.headUrl);
                var defer = new $q.defer();
                $http({
                    method: 'POST',
                    url: url.generate('users'),
                    data: user
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to create new user: ' + status);
                });
                return defer.promise;
            },
            updateUser: function (update) {
                if (update.headUrl)
                    update.headUrl = utility.getRelativeUrl(update.headUrl);
                var defer = new $q.defer();
                if (!$.cookie('userId'))
                    defer.reject('no user id in cookie, need login');
                else if (!update)
                    defer.reject('bad input');
                else {
                    $http({
                        method: 'PUT',
                        url: url.generate('users'),
                        params: { id: $.cookie('userId') },
                        data : update
                    }).success(function (data) {
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        console.log(arguments);
                        defer.reject('failed to update user: ' + status);
                    });
                }
                return defer.promise;
            },
            changeEmail: function (email, confirm_hash_pwd) {
                var defer = new $q.defer();
                if (!$.cookie('userId'))
                    defer.reject('no user id in cookie, need login');
                else {
                    $http({
                        method: 'PUT',
                        url: url.generate('usercredentials'),
                        params: { userId: $.cookie('userId') },
                        data: { email: email, confirm_hash_pwd: confirm_hash_pwd }
                    }).success(function (data) {
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        console.log(arguments);
                        defer.reject('failed to update user email: ' + status);
                    });
                }
                return defer.promise;
            },
            changePassword: function (hash_pwd, confirm_hash_pwd) {
                var defer = new $q.defer();
                if (!$.cookie('userId'))
                    defer.reject('no user id in cookie, need login');
                else {
                    $http({
                        method: 'PUT',
                        url: url.generate('usercredentials'),
                        params: { userId: $.cookie('userId') },
                        data: { hash_pwd: hash_pwd, confirm_hash_pwd: confirm_hash_pwd }
                    }).success(function (data) {
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        console.log(arguments);
                        defer.reject('failed to update user email: ' + status);
                    });
                }
                return defer.promise;
            },
            queryUserContact: function (query) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('usercontacts'),
                    params: { query: query }
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to update user email: ' + status);
                });
                return defer.promise;
            },
            emailAvailable: function (email) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('availability'),
                    params: { type: 'email', value: email }
                }).success(function (data) {
                    defer.resolve(data.available);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to get email availability: ' + status);
                });
                return defer.promise;
            },
            nickNameAvailable: function (email) {
                var defer = new $q.defer();
                $http({
                    method: 'GET',
                    url: url.generate('availability'),
                    params: { type: 'nickName', value: email }
                }).success(function (data) {
                    defer.resolve(data.available);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to get nick name availability: ' + status);
                });
                return defer.promise;
            }
        };
    }]);
})();