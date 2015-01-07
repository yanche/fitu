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
                    params: { actId: options.actId, recipientId: options.recipientId },
                    data: options.data
                }).success(function (data) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    console.log(arguments);
                    defer.reject('failed to send note: ' + status);
                });
                return defer.promise;
            }
        };
    }]);
})();