(function () {
    var increasingArray = function (start, count) {
        var ret = [];
        for (var i = 0; i < count; ++i)
            ret.push(i + start);
        return ret;
    };

    var oddNum = function (num) {
        var half = num / 2;
        return half != Math.ceil(half);
    };

    angular.module('fitulib')
    .directive('pagination', [function () {
        return {
            restrict: 'E',
            scope: {
                totalPages: '=',
                currentPage: '=',
                visibleCount: '='
            },
            replace: true,
            templateUrl: '/app/html/directives/pagination.html',
            link: function (scope, elem, attrs) {
                var rebuildPagination = function (newVal, oldVal) {
                    if (newVal != oldVal && newVal != null) {
                        scope.pagination = generatePagination();
                    };
                };

                var generatePagination = function () {
                    var total = Number(scope.totalPages), current = Number(scope.currentPage), visibleCount = Number(scope.visibleCount);
                    if (isNaN(total) || isNaN(current) || isNaN(visibleCount) || current <= 0 || visibleCount < 1 || current > total) //in bad state
                        return null;
                    if (!oddNum(visibleCount)) {
                        console.warn('CAUTION: the visible count should be odd number.');
                        return null;
                    }
                    if (visibleCount >= total)
                        return { pages: increasingArray(1, total), left: false, right: false };
                    var lr = Math.floor(visibleCount / 2);
                    if (current <= lr + 1)
                        return { pages: increasingArray(1, visibleCount), left: false, right: true };
                    else if (current >= total - lr)
                        return { pages: increasingArray(total - visibleCount + 1, visibleCount), left: true, right: false };
                    else
                        return { pages: increasingArray(current - lr, visibleCount), left: true, right: true };
                };

                scope.switchPage = function (p) {
                    if(p >= 1 && p <= scope.totalPages)
                        scope.currentPage = p;
                };

                scope.$watch('totalPages', rebuildPagination);
                scope.$watch('currentPage', rebuildPagination);
                scope.$watch('visibleCount', rebuildPagination);
            }
        };
    }]);
})();