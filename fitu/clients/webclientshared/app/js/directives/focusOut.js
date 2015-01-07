(function () {
    angular.module('fitulib')
    .directive('focusOut', ['$parse', 'user', function ($parse, user) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var modelGet = $parse(attrs.focusOut);
                //jquery focusout event
                element.on('focusout', function () {
                    modelGet(scope);
                });
            }
        };
    }]);
})();