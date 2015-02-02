(function () {
    angular.module('fitu')
    .controller('noteinbox', ['$scope', 'note', 'pagestore', '$state', 'ucconst', function ($scope, note, pagestore, $state, ucconst) {
        var pageSize = 10;
        var notesLoadFn = function (page) {
            return note.getMyNotes_IN({ page: page, pageSize: pageSize });
        };
        var pageDL = new pagestore.PageDataLoader(notesLoadFn);
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
                });
            }
        });
        $scope.currentPage = 1;
        $scope.totalPages = 0;
        $scope.visibleCount = 3;
    }]);
})();