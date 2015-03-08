(function () {
    angular.module('fitu')
    .controller('discovery', ['$scope', '$state', 'site', '$rootScope', 'lang', 'ucdatamodel', 'ucconst', '$location', function ($scope, $state, site, $rootScope, lang, ucdatamodel, ucconst, $location) {
            
            $scope.addPriceMode = function () {
                $scope.discoveryModel.pricesProp.array.push(new ucdatamodel.SitePriceModel().init({
                    amount: 50, freq: { num: 1, measure: 'h' }, people: 1, comments: ''
                }));
            };
            
            $scope.reportSite = function () {
                if ($scope.discoveryModel.validate()) {
                    if (!ctx.siteId) {
                        $scope.adding = true;
                        site.create(null, $scope.discoveryModel.toLO())
                        .then(function (data) {
                            $scope.adding = false;
                            $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.DISCOVERY_MSG_CREATED });
                            $state.gox(ucconst.states.sitedetail, { siteId: data.id });
                        })
                        .catch(function (err) {
                            $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.DISCOVERY_MSG_ERR_CREATE_UNKNOWN });
                            $scope.adding = false;
                        });
                    }
                    else {
                        $scope.updating = true;
                        site.update(ctx.siteId, $scope.discoveryModel.toLO())
                        .then(function () {
                            $scope.updating = false;
                            $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.DISCOVERY_MSG_UPDATED });
                            $state.gox(ucconst.states.sitedetail, { siteId: ctx.siteId });
                        })
                        .catch(function (err) {
                            $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.DISCOVERY_MSG_ERR_UPDATE_UNKNOWN });
                            $scope.updating = false;
                        });
                    }
                }
            };
            
            var ctx = $location.search(); console.log(ctx.siteId);
            if (ctx.siteId) {
                $scope.mode = 1;
                $scope.loading = true;
                $rootScope.pageTitle = lang.DISCOVERY_TITLE_UPDATE;
                site.getOne({ id: ctx.siteId })
                .then(function (data) {
                    if (!data.vendor)
                        $scope.discoveryModel = new ucdatamodel.DiscoveryModel().init(data);
                    else
                        $scope.hasVendor = true;
                    $scope.loading = false;
                })
                .catch(function (err) {
                    $scope.loading = false;
                });
            }
            else {
                $scope.mode = 2;
                $rootScope.pageTitle = lang.DISCOVERY_TITLE;
                $scope.discoveryModel = new ucdatamodel.DiscoveryModel().init({
                    name: '', intro: '', contact: '', location: { address: '', geo: '' }, picUrl: $rootScope.const.resources.defaultSitePic, tags: ['yg'],
                    open: { startsOn: { hour: 10, min: 0 }, endsOn: { hour: 20, min: 0 } }, trans: { subway: '', bus: '' }, prices: []
                });
            }
        }]);
})();