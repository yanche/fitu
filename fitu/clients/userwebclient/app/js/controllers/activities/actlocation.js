(function () {
    angular.module('fitu')
    .controller('actlocation', ['$scope', '$location', 'activity', function ($scope, $location, activity) {
        var ctx = $location.search();
        if (!ctx.actId)
            return;

        $scope.loading = true;
        activity.getOne(ctx.actId)
        .then(function (data) {
            $scope.activity = data;
            $scope.loading = false;
        }, function (err) {
            console.log(err);
            $scope.loading = false;
        });
    }]);
})();