(function () {
    angular.module('fitu')
    .controller('actlead', ['$scope', '$location', 'member', 'pagination', 'activity', '$state', 'ucconst', 'const', function ($scope, $location, member, pagination, activity, $state, ucconst, constants) {
        var ctx = $location.search();
        if (ctx.actId) {
            $scope.loadingAct = true;
            activity.getOne(ctx.actId)
            .then(function (data) {
                $scope.activity = data;
                $scope.loadingAct = false;
            }, function (err) {
                console.log(err);
                $scope.loadingAct = false;
            });
            
            var pageStore = new pagination.PageStore(function (page, pageSize) {
                return member.getList({ actId: ctx.actId, page: page, pageSize: pageSize });
            });
            
            var pageSize = 5;
            $scope.visibles = [];
            $scope.loadingMem = false;
            $scope.currentPage = 0;
            //caution!! multi-request
            $scope.switchPage = function (page) {
                $scope.loadingMem = true;
                pageStore.navigate(page, pageSize)
                .then(function (list) {
                    $scope.loadingMem = false;
                    $scope.visibles = list;
                    $scope.currentPage = page;
                })
                .catch(function (err) {
                    $scope.loadingMem = false;
                    console.log(err);
                });
            };
            $scope.switchPage(0);
            
            $scope.getPageNavs = function () {
                return pageStore.getPageNavs(pageSize, 3, $scope.currentPage);
            };

            $scope.doConfirm = function (mem) {
                member.updateStatus(mem.id, constants.memberStatus.confirmed)
                .then(function () {
                    mem.statusId = constants.memberStatus.confirmed;
                })
                .catch(function (err) { });
            };
                
            $scope.doPending = function (mem) {
                member.updateStatus(mem.id, constants.memberStatus.pending)
                .then(function () {
                    mem.statusId = constants.memberStatus.pending;
                })
                .catch(function (err) { });
            };
        }
    }]);
})();