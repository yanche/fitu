(function () {
    angular.module('fituvd')
    .controller('profile', ['$location', '$scope', 'vendor', 'utility', 'vcdatamodel', 'messenger', '$rootScope', function ($location, $scope, vendor, utility, vcdatamodel, messenger, $rootScope) {
        var ctx = $location.search();
        if (ctx.vendorId) {
            var load = function () {
                vendor.getOne({ id: ctx.vendorId })
                .then(function (vd) {
                    $scope.vendorModel = new vcdatamodel.VendorModel().init(vd);
                })
                .catch(function (err) {
                    console.log(err);
                });
            };
            load();
            
            $scope.updating = false;
            $scope.updateVendor = function () {
                if ($scope.vendorModel && $scope.vendorModel.validate()) {
                    $scope.updating = true;
                    vendor.update({ id: ctx.vendorId, data: angular.extend({}, $scope.vendorModel.toLO()) })
                    .then(function () {
                        load();
                        $scope.updating = false;
                        messenger.show($rootScope.vcconst.messenger, 'success', $rootScope.lang.PROFILE_MSG_UPDATESUCCESS, 5000);
                    })
                    .catch(function (err) {
                        console.log(err);
                        $scope.updating = false;
                        messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.PROFILE_MSG_UPDATEFAILED, 5000);
                    });
                }
            };
        }
    }]);
})();