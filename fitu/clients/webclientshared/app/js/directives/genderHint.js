(function () {
    angular.module('fitulib')
    .directive('genderHint', ['const', function (constants) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/genderHint.html',
            replace: true,
            scope: {
                gender: '='
            },
            link: function (scope, elem, attrs) {
                scope.const = constants;
            }
        };
    }]);
})();