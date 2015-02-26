(function () {
    angular.module('fitu')
    .controller('noteoutbox', ['$scope', 'note', 'pagestore', function ($scope, note, pagestore) {
        var pageSize = 10;
        var notesLoadFn = function (page) {
            return note.getMyNotes_OUT({ page: page, pageSize: pageSize });
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