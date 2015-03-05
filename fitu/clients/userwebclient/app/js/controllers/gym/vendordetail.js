(function () {
    angular.module('fitu')
    .controller('vendordetail', ['$scope', 'vendor', '$location', '$rootScope', 'lang', function ($scope, vendor, $location, $rootScope, lang) {
        var ctx = $location.search();
        if (!ctx.vendorId)
            return;

        $scope.loading = true;
        vendor.getOne({ id: ctx.vendorId })
        .then(function (data) {
            $scope.vendor = data;
            $scope.loading = false;
            $rootScope.pageTitle = lang.VENDOR_TITLE + data.name;
        })
        .catch(function (err) {
            $scope.loading = false;
            $rootScope.pageTitle = lang.TITLE_DEFAULT;
        });
    }]);
})();