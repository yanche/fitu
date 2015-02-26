(function () {
    angular.module('fitu')
    .controller('leadership', ['$scope', 'activity', 'pagestore', 'ucconst', '$state', function ($scope, activity, pagestore, ucconst, $state) {
        var pageSize = 5;
        var ldLoadFn = function (page) {
            return activity.getList({ page: page, pageSize: pageSize, lead: 1 });
        };
        var pageDL = new pagestore.PageDataLoader(ldLoadFn);
        $scope.$watch('currentPage', function (newVal, oldVal) {
            if (newVal != null) {
                $scope.visibles = null;
                $scope.loading = !pageDL.pageLoaded(newVal - 1);
                pageDL.loadPage(newVal - 1)
                .then(function (data) {
                    $scope.totalPages = Math.ceil(data.total / pageSize);
                    if ($scope.currentPage == newVal) {
                        $scope.visibles = data.list;
                        $scope.loading = false;
                    }
                })
                .catch(function (err) {
                    if ($scope.currentPage == newVal) {
                        $scope.loading = false;
                    }
                });
            }
        });
        $scope.currentPage = 1;
        $scope.totalPages = 0;
        $scope.visibleCount = 3;
    }]);
})();