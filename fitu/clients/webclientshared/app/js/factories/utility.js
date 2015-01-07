(function () {
    angular.module('fitulib')
    .factory('utility', ['const', function (constants) {
        return {
            getStaticUrl: function (url) {
                return constants.siteInfo.staticBase + url;
            },
            getRelativeUrl: function (url) {
                var len = constants.siteInfo.staticBase.length;
                if (url.slice(0, len) == constants.siteInfo.staticBase)
                    return url.substr(len);
                else
                    return url;
            }
        };
    }]);
})();