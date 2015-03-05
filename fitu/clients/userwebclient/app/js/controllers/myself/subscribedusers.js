(function () {
    angular.module('fitu')
    .controller('subscribedusers', ['$scope', 'user', '$rootScope', 'pagestore', '$state', 'ucconst', 'lang', function ($scope, user, $rootScope, pagestore, $state, ucconst, lang) {
        $rootScope.pageTitle = lang.SUBCRIBEUSERS_TITLE;
        var pageSize = 10;
        var usersLoadFn = function (page) {
            return user.getPreviews({ page: page, pageSize: pageSize, subscribedUsersOf: $rootScope.user.id });
        };
        var pageDL = new pagestore.PageDataLoader(usersLoadFn);
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