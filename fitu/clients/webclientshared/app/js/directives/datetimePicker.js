﻿(function () {
    angular.module('fitulib')
    .directive('datetimePicker', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'A',
            scope: {
                dpModel: '=',
                afterWards: '@'
            },
            link: function (scope, element, attrs) {
                var opt = {
                    format: $rootScope.const.dateTimeFormat,
                    minuteStepping: 5
                };
                if (scope.afterWards)
                    opt.minDate = moment().hour(0).minute(0).second(0).millisecond(0);
                element.datetimepicker(opt);
                
                var dp = element.data('DateTimePicker');
                element.on('change', function () { scope.dpModel = dp.getDate().format($rootScope.const.dateTimeFormat); scope.$applyAsync(); });
                scope.$watch('dpModel', function (newVal, oldVal) {
                    if (newVal && dp.date.format($rootScope.const.dateTimeFormat) != newVal) {
                        //console.log(newVal);
                        dp.setDate(newVal);
                    }
                });
            }
        };
    }]);
})();