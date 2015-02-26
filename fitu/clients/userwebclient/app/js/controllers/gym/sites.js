(function () {
    angular.module('fitu')
    .controller('sites', ['$scope', '$location', '$state', 'pagestore', 'site', 'ucconst', 'const', function ($scope, $location, $state, pagestore, site, ucconst, constants) {
        var ctx = $location.search();
        
        var pageSize = 5;
        var sitesLoadFn = function (page) {
            return site.getList({ page: page, pageSize: pageSize, tag: ctx.tag, siteId: ctx.siteId, vendorId: ctx.vendorId });
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
        
        $scope.tags = Array.prototype.concat([], constants.tags);
        var defaultTag = { value: '所有类型' };
        $scope.currentTag = $scope.tags.filter(function (tag) { return tag.key == ctx.tag; })[0] || defaultTag;
        $scope.tags.unshift(defaultTag);
        $scope.switchTag = function () {
            if ($scope.currentTag) {
                if ($scope.currentTag.key)
                    $state.gox(ucconst.states.sites, { tag: $scope.currentTag.key });
                else
                    $state.gox(ucconst.states.sites);
            }
        };
    }]);
})();