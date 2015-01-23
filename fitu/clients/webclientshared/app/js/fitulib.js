(function () {
    var refine = function (obj) {
        var obj2 = angular.extend({}, obj);
        for (var i in obj2) {
            if (obj2[i] === undefined)
                delete obj2[i];
        }
        return obj2;
    };

    angular.module('fitulib', [])
    .run(['$rootScope', 'const', 'lang', '$state', '$location', function ($rootScope, constants, lang, $state, $location) {
        $state.gox = function (state, params) {
            $location.path($state.hrefx(state)).search(params ? refine(params) : {});
        };
        $state.goxRepl = function (state, params) {
            $location.path($state.hrefx(state)).search(params ? refine(params) : {}).replace();
        };
        $state.hrefx = function (state) {
            return $state.href(state).split('?')[0];
        };

        $rootScope.const = constants;
        $rootScope.lang = lang;
    }]);
})();