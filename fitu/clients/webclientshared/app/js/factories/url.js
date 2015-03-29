(function () {
    angular.module('fitulib')
    .factory('url', ['const', function (constants) {
        return {
            generate: function (resourceName, search) {
                return constants.siteInfo.apiBase + '/' + resourceName;
            },
            join: function () {
                var ret = '/';
                for (var i in arguments) {
                    var tgt = arguments[i];
                    if (typeof tgt == 'string' && tgt.length > 0) {
                        if (ret[ret.length - 1] == '/') {
                            if (tgt[0] == '/')
                                ret = ret + tgt.slice(1);
                            else
                                ret = ret + tgt;
                        }
                        else if (tgt[0] == '/') {
                            ret = ret + tgt;
                        }
                        else
                            ret = ret + '/' + tgt;
                    }
                }
                return arguments[0][0] == '/' ? ret : ret.slice(1);
            }
        };
    }]);
})();