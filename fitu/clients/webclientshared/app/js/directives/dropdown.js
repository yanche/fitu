(function () {
    angular.module('fitulib')
    .directive('dropdown', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/dropdown.html',
            replace: true,
            scope: {
                items: '=',
                selectedItem: '=',
                change: '&change',
                up: '=',
                labelName: '='
            },
            link: function (scope, element, attrs) {
                scope.select = function (item) {
                    scope.expand = false;
                    if (item != scope.selectedItem) {
                        scope.selectedItem = item;
                        $timeout(scope.change, 10);
                    }
                };
                    
                element.on('blur', function () {
                    scope.expand = false;
                    scope.$apply();
                });
            }
        };
    }]);
})();