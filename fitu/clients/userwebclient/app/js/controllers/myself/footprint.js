(function () {
    angular.module('fitu')
    .controller('footprint', ['$scope', 'footprint', 'pagination', 'member', 'const', function ($scope, footprint, pagination, member, constants) {
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return footprint.getMyself({ page: page, pageSize: pageSize });
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
        
        $scope.doQuit = function (fp) {
            member.quit(fp.id)
            .then(function () {
                    fp.statusId = constants.memberStatus.quit;
            })
            .catch(function (err) { });
        };
        
        $scope.actEnds = function (act) {
            return moment(act.endsOn) <= moment();
        };
        
        $scope.actStarts = function (act) {
            var now = moment();
            return moment(act.startsOn) <= now && moment(act.endsOn) > now;
        };
        
        $scope.actNotStarts = function (act) {
            var now = moment();
            return moment(act.startsOn) > now;
        };
    }]);
})();