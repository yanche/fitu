(function () {
    angular.module('fitu')
    .controller('footprint', ['$scope', 'footprint', 'pagestore', 'member', 'const', 'lang', 'ucconst', function ($scope, footprint, pagestore, member, constants, lang, ucconst) {
        var pageSize = 5;
        var fpLoadFn = function (page) {
            return footprint.getMyself({ page: page, pageSize: pageSize });
        };
        var pageDL = new pagestore.PageDataLoader(fpLoadFn);
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
        
        $scope.doQuit = function (fp) {
            $scope.$emit(ucconst.events.showMsg, {
                msgType: ucconst.msgType.warning, msg: lang.FOOTPRINT_MSG_CONFIRM_QUIT, onConfirm: function () {
                    member.quit(fp.id)
                    .then(function () {
                        fp.statusId = constants.memberStatus.quit;;
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.FOOTPRINT_MSG_SUCCESS_QUIT });
                    })
                    .catch(function (err) {
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.FOOTPRINT_MSG_ERR_QUIT });
                    });
                }
            })
        };
    }]);
})();