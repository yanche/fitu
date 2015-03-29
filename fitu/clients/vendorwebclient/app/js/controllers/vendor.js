(function () {
    angular.module('fituvd')
    .controller('vendor', ['$scope', '$state', '$rootScope', '$location', 'validate', 'utility', 'vcconst', 'user', 'messenger', 'lang', function ($scope, $state, $rootScope, $location, validate, utility, vcconst, user, messenger, lang) {
        var ctx = $location.search();

        $scope.state = $state;

        if (!ctx.vendorId) {
            ctx.vendorId = $rootScope.vendors[0].id;
            $state.gox($state.current.name, ctx);
        }
        
        $rootScope.currentVendor = ctx.vendorId ? $rootScope.vendors.filter(function (vd) { return vd.id == ctx.vendorId; })[0]: $rootScope.vendors[0];
        $scope.showVendorSwitchPanel = false;
        
        $scope.switchVendor = function (vendor) {
            if (vendor != $rootScope.currentVendor) {
                ctx.vendorId = vendor.id;
                $state.gox($state.current.name, ctx);
                $scope.showVendorSwitchPanel = false;
                $rootScope.currentVendor = vendor;
            }
        };

        $scope.goProfile = function () {
            $state.gox(vcconst.states.profile, ctx);
        };
        
        $scope.goAdmins = function () {
            $state.gox(vcconst.states.admins, ctx);
        };

        $scope.goSites = function () {
            $state.gox(vcconst.states.sites, ctx);
        };

        $scope.goStatistics = function () {
            $state.gox(vcconst.states.statistics, ctx);
        };

        $scope.logout = function () {
            user.logout()
            .then(function () {
                $scope.$emit(vcconst.events.logout);
                messenger.show(vcconst.messenger, 'success', lang.LOGOUT_MSG_SUCCESS, 5000);
            })
            .catch(function (err) {
                console.log(err);
                messenger.show(vcconst.messenger, 'error', lang.LOGOUT_MSG_FAILED, 5000);
            });
        };

        if (!$rootScope.currentVendor) {
            $scope.switchVendor($rootScope.vendors[0]);
        }
    }]);
})();