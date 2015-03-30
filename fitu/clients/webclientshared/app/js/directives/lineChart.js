(function () {
    angular.module('fitulib')
    .directive('lineChart', [function () {
        return{
            replace: true,
            template: '<div></div',
            restrict: 'E',
            scope: {
                lineChartData: '&',
                lineChartOptions: '&',
                canvasWidth: '&',
                canvasHeight: '&'
            },
            link: function (scope, element, attrs) {
                var redraw = function () {
                    var w = scope.canvasWidth(), h = scope.canvasHeight(), d = scope.lineChartData(), o = scope.lineChartOptions();
                    if (d) {
                        console.log('line chart drawing');
                        var canvas = document.createElement('canvas');
                        element.empty().append($(canvas));
                        canvas.width = w || 400;
                        canvas.height = h || 300;
                        var ctx = canvas.getContext('2d');
                        new Chart(ctx).Line(d, o);
                    }
                    else
                        element.empty();
                }

                scope.$watch('lineChartData()', redraw);
                scope.$watch('lineChartOptions()', redraw);
                scope.$watch('canvasWidth()', redraw);
                scope.$watch('canvasHeight()', redraw);
            }
        };
    }]);
})();