(function () {
    angular.module('fitu')
    .controller('activities', ['$scope', '$rootScope', '$state', 'activity', 'ucconst', '$location', 'const', 'pagestore', function ($scope, $rootScope, $state, activity, ucconst, $location, constants, pagestore) {
        var ctx = $location.search();
        
        var pageSize = 5;
        var activityLoadFn = function (page) {
            return activity.getList({ page: page, pageSize: pageSize, tag: ctx.tag, siteId: ctx.siteId, vendorId: ctx.vendorId, active: ctx.all ? '' : '1' });
        };
        var pageDL = new pagestore.PageDataLoader(activityLoadFn);
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
                });
            }
        });
        $scope.currentPage = 1;
        $scope.totalPages = 0;
        $scope.visibleCount = 3;
        
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