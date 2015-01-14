(function () {
    angular.module('fitulib')
    .directive('actpreview', [function () {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/actpreview.html',
            replace: true,
            scope: {
                act: '='
            },
            link: function (scope, element, attrs) {
            }
        };
    }]);
})();