(function () {
    angular.module('fitu')
    .controller('vendordetail', ['$scope', 'vendor', '$location', function ($scope, vendor, $location) {
        var ctx = $location.search();
        if (!ctx.vendorId)
            return;

        $scope.loading = true;
        vendor.getOne({ id: ctx.vendorId })
        .then(function (data) {
            $scope.vendor = data;
            $scope.loading = false;
        }, function (err) {
            console.log(err);
            $scope.loading = false;
        });
    }]);
})();