﻿(function () {
    angular.module('fitu')
    .controller('subscribedsites', ['$scope', 'site', '$rootScope', 'pagestore', '$state', 'ucconst', 'lang', function ($scope, site, $rootScope, pagestore, $state, ucconst, lang) {
        $rootScope.pageTitle = lang.SUBCRIBESITES_TITLE;
        var pageSize = 10;
        var sitesLoadFn = function (page) {
            return site.getList({ page: page, pageSize: pageSize, subscribedSitesOf: $rootScope.user.id });
        };
        var pageDL = new pagestore.PageDataLoader(sitesLoadFn);
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