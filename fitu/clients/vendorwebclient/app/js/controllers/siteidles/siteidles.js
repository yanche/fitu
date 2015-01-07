(function () {
    angular.module('fituvd')
    .controller('siteidles', ['$scope', '$location', 'siteidle', '$state', '$rootScope', 'messenger', 'pagination', 'vcdatamodel', 'vcconst', 'site', function ($scope, $location, siteidle, $state, $rootScope, messenger, pagination, vcdatamodel, vcconst, site) {
        var ctx = $location.search();
        
        if (!ctx.siteId) {
            $state.gox(vcconst.states.sites, ctx);
        }
        else {
            var pageStore = new pagination.PageStore(function (page, pageSize) {
                return siteidle.getList({ siteId: ctx.siteId, page: page, pageSize: pageSize });
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
            
            var siteTag = null;
            site.getOne({ id: ctx.siteId })
            .then(function (st) {
                $scope.siteIdleModel.tagProp.val = siteTag = st.tags[0];
            });
            
            $scope.siteIdleModel = new vcdatamodel.SiteIdleModel();
            //slots, startsOn, endsOn, 
            var initAddModel = function () {
                $scope.siteIdleModel.init({
                    slots: '',
                    price: '',
                    startsOn: moment().add({ days: 3 }).format($rootScope.const.dateTimeFormat),
                    endsOn: moment().add({ days: 3, hours: 1 }).format($rootScope.const.dateTimeFormat),
                    tags: [siteTag]
                });
            };
            initAddModel();
            $scope.adding = false;
            $scope.addSiteIdle = function () {
                if ($scope.siteIdleModel.validate()) {
                    $scope.adding = true;
                    siteidle.create(ctx.siteId, $scope.siteIdleModel.toPOJO())
                    .then(function () {
                        $scope.adding = false;
                        initAddModel();
                        pageStore.refresh();
                        $scope.switchPage(0); //first page
                        messenger.show($rootScope.vcconst.messenger, 'success', $rootScope.lang.SITEIDLE_MSG_ADDSUCCESS, 5000);
                    })
                    .catch(function (err) {
                        $scope.adding = false;
                        console.log(err);
                        messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.SITEIDLE_MSG_ADDFAILED, 5000);
                    });
                }
            };
        }
    }]);
})();