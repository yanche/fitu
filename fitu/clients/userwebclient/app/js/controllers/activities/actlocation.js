(function () {
    angular.module('fitu')
    .controller('actlocation', ['$scope', '$location', '$state', 'activity', '$state', 'ucconst', function ($scope, $location, $state, activity, $state, ucconst) {
        var ctx = $location.search();
        $scope.loading = true;
        activity.getOne(ctx.actId)
        .then(function (data) {
            $scope.activity = data;
            $scope.loading = false;
        }, function (err) {
            console.log(err);
            $scope.loading = false;
        });

        $scope.goDetail = function () {
            $state.gox(ucconst.states.actdetail, { actId: ctx.actId });
        };
    }]);
})();