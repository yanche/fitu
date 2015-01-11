(function () {
    angular.module('fitu')
    .controller('sitelocation', ['$scope', '$location', 'site', function ($scope, $location, site) {
        var ctx = $location.search();
        $scope.loading = true;
        site.getOne({ id: ctx.siteId })
        .then(function (data) {
            $scope.site = data;
            $scope.loading = false;
        }, function (err) {
            console.log(err);
            $scope.loading = false;
        });
    }]);
})();