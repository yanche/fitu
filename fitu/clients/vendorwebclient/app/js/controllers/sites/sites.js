(function () {
    angular.module('fituvd')
    .controller('sites', ['$scope', 'site', '$location', '$state', '$rootScope', 'pagination', 'messenger', '$rootScope', 'vcdatamodel', 'vendor', function ($scope, site, $location, $state, $rootScope, pagination, messenger, $rootScope, vcdatamodel, vendor) {
        var ctx = $location.search();
        if (ctx.vendorId) {
            var pageStore = new pagination.PageStore(function (page, pageSize) {
                return site.getList({ vendorId: ctx.vendorId, page: page, pageSize: pageSize });
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
                    $scope.visibles = list.map(function (st) {
                        if (!st.model) {
                            st.model = new vcdatamodel.SiteModel().init(st);
                            st.editing = false;
                            st.updating = false;
                        }
                        return st;
                    });
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
            
            $scope.getSiteCount = function () {
                return pageStore.getTotal();
            };
            
            $scope.goSiteIdle = function (site, evt) {
                ctx.siteId = site.id;
                $state.gox($rootScope.vcconst.states.siteidles, ctx);
                evt.stopPropagation();
            };
            
            $scope.siteModel = new vcdatamodel.SiteModel();
            $scope.resetAddModel = function () {
                var init = {
                    name: '', intro: '', location: { address: '', geo: '' }, picUrl: $rootScope.const.resources.defaultSitePic, tags: [],
                    open: { startsOn: { hour: 10, min: 0 }, endsOn: { hour: 20, min: 0 } }, prices: [{ amount: 30, freq: { num: 1, measure: 'h' }, people: 1, comments: 'test' }]
                };
                if ($scope.vendor) {
                    init.location.address = $scope.vendor.location.address;
                    init.location.geo = $scope.vendor.location.geo;
                    init.tags = $scope.vendor.tags;
                }
                $scope.siteModel.init(init);
            };
            $scope.resetAddModel();
            
            $scope.addPrice = function (model) {
                model.pricesProp.array.push({ amount: 30, freq: { num: 1, measure: 'h' }, people: 1, comments: 'test' });
            };
            
            $scope.removePrice = function (model, index) {
                model.pricesProp.array.splice(index, 1);
            };

            $scope.adding = false;
            $scope.addSite = function () {
                //TODO: data check
                if ($scope.siteModel.validate()) {
                    $scope.adding = true;
                    site.create(ctx.vendorId, $scope.siteModel.toPOJO())
                    .then(function () {
                        $scope.adding = false;
                        $scope.resetAddModel();
                        pageStore.refresh();
                        $scope.switchPage(0); //first page
                        messenger.show($rootScope.vcconst.messenger, 'success', $rootScope.lang.SITE_MSG_ADDSUCCESS, 5000);
                    })
                    .catch(function (err) {
                        $scope.adding = false;
                        console.log(err);
                        messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.SITE_MSG_ADDFAILED, 5000);
                    });
                }
            };
            $scope.updateSite = function (st) {
                if (st && !st.updating && st.model.validate()) {
                    st.updating = true;
                    site.update(st.id, st.model.toPOJO())
                    .then(function () {
                        st.updating = false;
                        messenger.show($rootScope.vcconst.messenger, 'success', $rootScope.lang.SITE_MSG_UPDATESUCCESS, 5000);
                    })
                    .catch(function (err) {
                        st.updating = false;
                        console.log(err);
                        messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.SITE_MSG_UPDATEFAILED, 5000);
                    });
                }
            };
            
            vendor.getOne({ id: ctx.vendorId })
            .then(function (vd) {
                $scope.vendor = vd;
                $scope.resetAddModel();
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    }]);
})();