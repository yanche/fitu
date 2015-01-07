(function () {
    angular.module('fitu')
    .controller('leadership', ['$scope', 'activity', 'pagination', 'ucconst', '$state', function ($scope, activity, pagination, ucconst, $state) {
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return activity.getList({ page: page, pageSize: pageSize, lead: 1 });
        });
        
        var pageSize = 5;
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

        $scope.goActLead = function (actId) {
            $state.gox(ucconst.states.actlead, { actId: actId });
        };
    }]);
})();