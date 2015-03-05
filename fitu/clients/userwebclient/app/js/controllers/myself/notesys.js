(function () {
    angular.module('fitu')
    .controller('notesys', ['$scope', 'note', 'pagestore', 'ucconst', '$rootScope', 'lang', function ($scope, note, pagestore, ucconst, $rootScope, lang) {
        $rootScope.pageTitle = lang.NOTESYSBOX_TITLE;
        var pageSize = 10;
        var notesLoadFn = function (page) {
            return note.getMyNotes_SYS({ page: page, pageSize: pageSize });
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
        
        $scope.readNote = function (nt) {
            nt.expanded = !nt.expanded
            if (nt.expanded && !nt.readOn) {
                note.setNoteRead({ id: nt.id })
                .then(function () {
                    nt.readOn = 1;
                    $scope.$emit(ucconst.events.countPendingNote);
                })
                .catch(function () { });
            }
        };
    }]);
})();