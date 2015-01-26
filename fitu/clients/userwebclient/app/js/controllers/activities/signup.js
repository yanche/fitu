(function () {
    angular.module('fitu')
    .controller('signup', ['$scope', 'member', '$state', '$location', 'ucconst', '$rootScope', '$timeout', 'activity', function ($scope, member, $state, $location, ucconst, $rootScope, $timeout, activity) {
        var ctx = $location.search();
        
        if (!$rootScope.user) {
            $scope.goLoginTimeout = 3;
            var waiter = function () {
                //TODO: in-out-in
                if ($state.current.name == ucconst.states.signup) {
                    var nowleft = $scope.goLoginTimeout - 1;
                    if (nowleft == -1)
                        $state.gox(ucconst.states.login, { state: ucconst.states.signup, actId: ctx.actId });
                    else {
                        $scope.goLoginTimeout = nowleft;
                        $timeout(waiter, 1000);
                    }
                }
            };
            $timeout(waiter, 1000);

            $scope.goLogin = function () {
                $state.gox(ucconst.states.login, { state: ucconst.states.signup, actId: ctx.actId });
            };
        }
        else {
            $scope.loading = true;
            activity.getOne(ctx.actId)
            .then(function (data) {
                $scope.activity = data;
                $scope.loading = false;
            })
            .catch(function (err) {
                console.log(err);
                $scope.loading = false;
            });
            
            $scope.processing = false;
            $scope.signup = function () {
                $scope.processing = true;
                member.create(ctx.actId)
                .then(function (data) {
                    console.log(data);
                    $state.gox(ucconst.states.footprint);
                    $scope.processing = false;
                }, function (err) {
                    console.log(err);
                    $scope.processing = false;
                });
            };
        }
    }]);
})();