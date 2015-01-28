(function () {
    angular.module('fitulib')
    .factory('message', ['$http', '$q', 'url', 'utility', function ($http, $q, url, utility) {
        return {
            likeMessage: function (options) {
                options = options || {};
                var defer = new $q.defer();
                $http({
                    method: 'PUT',
                    url: url.generate('messages'),
                    params: { id: options.id },
                    data: { like: Boolean(options.like) }
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