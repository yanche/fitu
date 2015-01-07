(function () {
    angular.module('fitulib')
    .factory('url', ['const', function (constants) {
        return {
            generate: function (resourceName, search) {
                return constants.siteInfo.apiBase + '/' + resourceName;
            }
        };
    }]);
})();