(function () {
    angular.module('fitu')
    .controller('discovery', ['$scope', '$state', 'site', '$rootScope', 'lang', 'ucdatamodel', 'ucconst', function ($scope, $state, site, $rootScope, lang, ucdatamodel, ucconst) {
            $rootScope.pageTitle = lang.DISCOVERY_TITLE;
            
            $scope.discoveryModel = new ucdatamodel.DiscoveryModel().init({
                name: '', intro: '', contact: '', location: { address: '', geo: '' }, picUrl: $rootScope.const.resources.defaultSitePic, tags: ['yg'],
                open: { startsOn: { hour: 10, min: 0 }, endsOn: { hour: 20, min: 0 } }, trans: { subway: '', bus: '' }, priceModes: []
            });
            
            $scope.addPriceMode = function () {
                $scope.discoveryModel.priceModesProp.array.push(new ucdatamodel.SitePriceModel().init({
                    amount: 50, freq: { num: 1, measure: 'h' }, people: 1, comments: ''
                }));
            };
            
            $scope.reportSite = function () {
                if ($scope.discoveryModel.validate()) {
                    $scope.adding = true;
                    site.create(null, $scope.discoveryModel.toLO())
                    .then(function (data) {
                        $scope.adding = false;
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.MATRIX_MSG_UPDATED });
                        $state.gox(ucconst.states.sitedetail, { siteId: data.id });
                    })
                    .catch(function (err) {
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.MATRIX_MSG_ERR_UPDATE_UNKNOWN });
                        $scope.adding = false;
                    });
                }
            };
        }]);
})();