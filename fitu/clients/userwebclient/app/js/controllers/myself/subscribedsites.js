(function () {
    angular.module('fitu')
    .controller('subscribedsites', ['$scope', 'site', '$rootScope', 'pagination', '$state', 'ucconst', function ($scope, site, $rootScope, pagination, $state, ucconst) {
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return site.getList({ page: page, pageSize: pageSize, subscribedSitesOf: $rootScope.user.id });
        });
        
        var pageSize = 10;
        $scope.visibles = [];
        $scope.loading = false;
        $scope.currentPage = 0;
        //caution!! multi-request
        $scope.switchPage = function (page) {
            $scope.loading = true;
            pageStore.navigate(page, pageSize)
            .then(function (list) {
                $scope.loading = false;
                $scope.visibles = list;
                $scope.currentPage = page;
            })
            .catch(function (err) {
                $scope.loading = false;
                console.log(err);
            });
        };
        $scope.switchPage(0);
        
        $scope.getPageNavs = function () {
            return pageStore.getPageNavs(pageSize, 3, $scope.currentPage);
        };
    }]);
})();