(function () {
    angular.module('fitu')
    .controller('activities', ['$scope', '$rootScope', '$state', 'activity', 'ucconst', 'pagination', '$location', 'const', function ($scope, $rootScope, $state, activity, ucconst, pagination, $location, constants) {
            var ctx = $location.search();
            
            var pageStore = new pagination.PageStore(function (page, pageSize) {
                return activity.getList({ page: page, pageSize: pageSize, tag: ctx.tag, siteId: ctx.siteId, vendorId: ctx.vendorId });
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
            
            $scope.goDetail = function (actId) {
                $state.gox(ucconst.states.actdetail, { actId: actId });
            };
            
            $scope.tags = Array.prototype.concat([], constants.tags);
            var defaultTag = { value: '所有类型' };
            $scope.currentTag = $scope.tags.filter(function (tag) { return tag.key == ctx.tag; })[0] || defaultTag;
            $scope.tags.unshift(defaultTag);
            $scope.switchTag = function () {
                if ($scope.currentTag) {
                    if ($scope.currentTag.key)
                        $state.gox(ucconst.states.activities, { tag: $scope.currentTag.key });
                    else
                        $state.gox(ucconst.states.activities);
                }
            };
        }]);
})();