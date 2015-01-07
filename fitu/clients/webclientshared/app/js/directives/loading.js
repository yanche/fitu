(function () {
    angular.module('fitulib')
    .directive('loading', ['$parse', 'const', function ($parse, constant) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/loading.html',
            replace: true,
            scope: {
                word: '=',
                show: '=',
                src: '='
            }
        };
    }]);
})();