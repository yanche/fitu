(function () {
    angular.module('fitu')
    .controller('activities', ['$scope', '$rootScope', '$state', 'activity', 'ucconst', 'pagination', '$location', 'const', function ($scope, $rootScope, $state, activity, ucconst, pagination, $location, constants) {
        var ctx = $location.search();
            
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return activity.getList({ page: page, pageSize: pageSize, tag: ctx.tag, siteId: ctx.siteId, vendorId: ctx.vendorId, active: ctx.all ? '' : '1' });
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
            
        $scope.tags = Array.prototype.concat([], constants.tags);
        var defaultTag = { value: '所有类型' };
        $scope.currentTag = $scope.tags.filter(function (tag) { return tag.key == ctx.tag; })[0] || defaultTag;
        $scope.tags.unshift(defaultTag);
        $scope.switchTag = function () {
            if ($scope.currentTag) {
                var newctx = {};
                if ($scope.currentStatusFilter && $scope.currentStatusFilter == activityStatusFilter_all)
                    newctx.all = 1;
                if ($scope.currentTag.key)
                    newctx.tag = $scope.currentTag.key;
                $state.gox(ucconst.states.activities, newctx);
            }
        };
            
        var activityStatusFilter_active = { present: '开放活动' };
        var activityStatusFilter_all = { present: '所有活动' };
        $scope.currentStatusFilter = ctx.all ? activityStatusFilter_all : activityStatusFilter_active;
        $scope.statusFilters = [activityStatusFilter_active, activityStatusFilter_all];
        $scope.switchStatus = function () {
            if ($scope.currentStatusFilter) {
                var newctx = {};
                if ($scope.currentTag && $scope.currentTag.key)
                    newctx.tag = $scope.currentTag.key;
                if ($scope.currentStatusFilter == activityStatusFilter_all)
                    newctx.all = 1;
                $state.gox(ucconst.states.activities, newctx);
            }
        };
    }]);
})();