(function () {
    angular.module('fitulib')
    .directive('datetimePicker', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            scope: { 'ngModel': '=' },
            link: function (scope, element, attrs) {
                element.datetimepicker({
                    format: $rootScope.const.dateTimeFormat,
                    minuteStepping: 5
                });
                    
                var dp = element.data('DateTimePicker');
                    
                scope.$watch('ngModel', function (newVal, oldVal) {
                    if (newVal && dp.date.format($rootScope.const.dateTimeFormat) != newVal) {
                        //console.log(newVal);
                        dp.setDate(newVal);
                    }
                });
            }
        };
    }]);
})();