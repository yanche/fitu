(function () {
    angular.module('fitu')
    .controller('actlead', ['$scope', '$location', 'member', 'pagination', 'activity', '$state', 'ucconst', function ($scope, $location, member, pagination, activity, $state, ucconst) {
        var ctx = $location.search();
        if (ctx.actId) {
            activity.getOne(ctx.actId)
            .then(function (data) {
                $scope.activity = data;
            }, function (err) {
                console.log(err);
            });
            
            var pageStore = new pagination.PageStore(function (page, pageSize) {
                return member.getList({ actId: ctx.actId, page: page, pageSize: pageSize });
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
            
            $scope.goSendNote = function (mem) {
                if (mem)
                    $state.gox(ucconst.states.sendnote, { recipientId: mem.user.id });
                else
                    $state.gox(ucconst.states.sendnote, { actId: ctx.actId });
            };
            
            $scope.editAct = function () {
                $state.gox(ucconst.states.matrix, { actId: ctx.actId });
            };
            
            $scope.goUserPreview = function (user) {
                $state.gox(ucconst.states.userpreview, { userId: user.id });
            };
        }
    }]);
})();