(function () {
    angular.module('fitulib')
    .directive('datetimePicker', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.datetimepicker({
                    format: $rootScope.const.dateTimeFormat,
                    minuteStepping: 5
                });
            }
        };
    }]);
})();