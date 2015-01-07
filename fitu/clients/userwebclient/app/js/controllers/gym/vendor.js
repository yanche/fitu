(function () {
    angular.module('fitu')
    .controller('vendor', ['$scope', 'vendor', '$location', function ($scope, vendor, $location) {
        var ctx = $location.search();
        vendor.getOne({ id: ctx.id })
        .then(function (data) {
            $scope.vendor = data;
        }, function (err) {
            console.log(err);
        });
    }]);
})();