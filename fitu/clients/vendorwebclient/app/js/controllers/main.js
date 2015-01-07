(function () {
    angular.module('fituvd')
    .controller('main', ['$scope', '$state', 'user', 'vendor', '$rootScope', function ($scope, $state, user, vendor, $rootScope) {
        /*
        user.getLoginUser()
        .then(function (loginUser) {
            $rootScope.user = loginUser;
        })
        .catch(function (err) {
            console.log(err);
            $rootScope.user = null;
        })
        .then(function () {
            if (!$rootScope.user) {
                //pop up login window
            }
        })
        .then(function () {
            if ($rootScope.user)
                return vendor.getManagableVendors();
            else
                return [];
        })
        .then(function (vds) {
            $rootScope.vendors = vds;
        });
         */
    }]);
})();