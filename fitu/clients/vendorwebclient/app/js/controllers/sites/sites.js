(function () {
    angular.module('fituvd')
    .controller('sites', ['$scope', 'site', '$location', '$state', '$rootScope', 'pagination', 'messenger', '$rootScope', 'vcdatamodel', 'vendor', 'const', function ($scope, site, $location, $state, $rootScope, pagination, messenger, $rootScope, vcdatamodel, vendor, constants) {
        var ctx = $location.search();
        if (ctx.vendorId) {
            var loadSites = function () { 
                site.getList({ vendorId: ctx.vendorId, page: 0, pageSize: 10 })
                .then(function (data) {
                    $scope.loading = false;
                    $scope.sites = data.list.map(function (st) {
                        var ret = { raw: st, model: new vcdatamodel.DiscoveryModel() };
                        $scope.resetEditModel(ret);
                        return ret;
                    });
                })
                .catch(function (err) {
                    $scope.loading = false;
                });
                $scope.loading = true;
            };
            loadSites();
                
            $scope.resetEditingModel = function () {
                if ($scope.editingSite) {
                    if ($scope.editingSite == $scope.addedSite)
                        $scope.resetAddModel();
                    else
                        $scope.resetEditModel($scope.editingSite);
                }
            };
            $scope.resetAddModel = function () {
                var init = {
                    name: '', intro: '', contact: '', location: { address: '', geo: '' }, picUrl: $rootScope.const.resources.defaultSitePic, tags: [],
                    open: { startsOn: { hour: 10, min: 0 }, endsOn: { hour: 20, min: 0 } }, prices: [{ amount: 30, freq: { num: 1, measure: 'h' }, people: 1, comments: 'test' }],
                    trans: {subway:'',bus: ''}
                };
                if ($scope.vendor) {
                    init.location.address = $scope.vendor.location.address;
                    init.location.geo = $scope.vendor.location.geo;
                    init.tags = $scope.vendor.tags;
                }
                $scope.addedSite.model.init(init);
                $scope.addedSite.siteTagCandidates = angular.copy(constants.tags);
                $scope.addedSite.siteTagCandidates.forEach(function (t) {
                    if (init.tags.some(function (tk) { return t.key == tk; }))
                        t.selected = true;
                });
            };
            $scope.resetEditModel = function (site) {
                site.model.init(site.raw);
                site.siteTagCandidates = angular.copy(constants.tags);
                site.siteTagCandidates.forEach(function (t) {
                    if (site.raw.tags.some(function (tk) { return t.key == tk; }))
                        t.selected = true;
                });
            };
            $scope.pickSiteTag = function (site, t) {
                if (site.model && site.siteTagCandidates) {
                    t.selected = !t.selected;
                    site.model.tagsProp.val = site.siteTagCandidates.filter(function (t) { return t.selected; }).map(function (t) { return t.key; });
                }
            };
            
            $scope.addPrice = function (model) {
                model.pricesProp.array.push(new vcdatamodel.SitePriceModel().init({ amount: 30, freq: { num: 1, measure: 'h' }, people: 1, comments: '' }));
            };
            $scope.removePrice = function (model, index) {
                //no less than one price record
                model.pricesProp.array.length > 1 && model.pricesProp.array.splice(index, 1);
                };
            $scope.initSiteEdit = function (site) {
                $scope.editingSite = site;
            };
            $scope.submitSiteEdit = function () {
                if ($scope.editingSite && $scope.editingSite.model.validate()) {
                    if ($scope.editingSite == $scope.addedSite)
                        $scope.addSite();
                    else
                        $scope.updateSite($scope.editingSite);
                }
            };

            $scope.adding = false;
            $scope.addSite = function () {
                if ($scope.addedSite.model.validate()) {
                    site.create(ctx.vendorId, $scope.addedSite.model.toLO())
                    .then(function () {
                        $scope.adding = false;
                        $scope.resetAddModel();
                        loadSites();
                        messenger.show($rootScope.vcconst.messenger, 'success', $rootScope.lang.SITE_MSG_ADDSUCCESS, 5000);
                    })
                    .catch(function (err) {
                        $scope.adding = false;
                        messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.SITE_MSG_ADDFAILED, 5000);
                    });
                    $scope.adding = true;
                }
            };
            $scope.updateSite = function (st) {
                if (st && !st.updating && st.model.validate()) {
                    site.update(st.raw.id, st.model.toLO())
                    .then(function () {
                        st.updating = false;
                        messenger.show($rootScope.vcconst.messenger, 'success', $rootScope.lang.SITE_MSG_UPDATESUCCESS, 5000);
                        loadSites();
                    })
                    .catch(function (err) {
                        st.updating = false;
                        messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.SITE_MSG_UPDATEFAILED, 5000);
                    });
                    st.updating = true;
                }
            };
            
            vendor.getOne({ id: ctx.vendorId })
            .then(function (vd) {
                $scope.vendor = vd;
                $scope.addedSite = { model: new vcdatamodel.DiscoveryModel() };
                $scope.resetAddModel();
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    }]);
})();