(function () {
    angular.module('fitu')
    .controller('vendordetail', ['$scope', 'vendor', '$location', function ($scope, vendor, $location) {
        var ctx = $location.search();
        vendor.getOne({ id: ctx.vendorId })
        .then(function (data) {
            $scope.vendor = data;
        }, function (err) {
            console.log(err);
        });
    }]);
})();