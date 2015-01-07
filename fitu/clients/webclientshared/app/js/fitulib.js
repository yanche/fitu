(function () {
    angular.module('fitulib', [])
    .run(['$rootScope', 'const', 'lang', '$state', '$location', function ($rootScope, constants, lang, $state, $location) {
        $state.gox = function (state, params) {
            $location.path($state.hrefx(state)).search(params || {});
        };
        $state.goxRepl = function (state, params) {
            $location.path($state.hrefx(state)).search(params || {}).replace();
        };
        $state.hrefx = function (state) {
            return $state.href(state).split('?')[0];
        };

        $rootScope.const = constants;
        $rootScope.lang = lang;
    }]);
})();