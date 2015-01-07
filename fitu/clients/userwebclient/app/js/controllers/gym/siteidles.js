(function () {
    angular.module('fitu')
    .controller('siteidles', ['$scope', '$location', '$state', 'pagination', 'siteidle', 'ucconst', function ($scope, $location, $state, pagination, siteidle, ucconst) {
        var ctx = $location.search();

        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return siteidle.getList({ page: page, pageSize: pageSize, tag: ctx.tag, siteId: ctx.siteId, vendorId: ctx.vendorId });
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
            return pageStore.getPageNavs(pageSize, 5, $scope.currentPage);
        };
        
        $scope.tag = ctx.tag;
        $scope.switchTag = function () {
            if ($scope.tag)
                $state.gox(ucconst.states.siteidles, { tag: $scope.tag });
            else
                $state.gox(ucconst.states.siteidles);
        };
    }]);
})();