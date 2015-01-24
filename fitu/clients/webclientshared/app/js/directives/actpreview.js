(function () {
    angular.module('fitulib')
    .directive('actpreview', ['const', 'lang', 'util', function (constants, lang, util) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/actpreview.html',
            replace: true,
            scope: {
                act: '=',
            },
            link: function (scope, element, attrs) {
                scope.const = constants;
                scope.lang = lang;
                scope.util = util;
            }
        };
    }]);
})();