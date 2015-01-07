(function () {
    angular.module('fitulib')
    .factory('lang', ['$http', '$q', function ($http, $q) {
        var ret = {};
        $http.get('/app/json/lang.json').success(function (data) {
            angular.extend(ret, data);
        })
        .error(function (data, status, headers, config) {
            console.log('failed to load client lang file: ' + status);
        });
        $http.get('/app/json/global_lang.json').success(function (data) {
            angular.extend(ret, data);
        })
        .error(function (data, status, headers, config) {
            console.log('failed to load global lang file: ' + status);
        });
        return ret;
    }]);
})();