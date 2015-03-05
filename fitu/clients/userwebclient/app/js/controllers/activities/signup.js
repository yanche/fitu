(function () {
    angular.module('fitu')
    .controller('signup', ['$scope', 'member', '$state', '$location', 'ucconst', '$rootScope', '$timeout', 'activity', 'lang', function ($scope, member, $state, $location, ucconst, $rootScope, $timeout, activity, lang) {
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
            if (!ctx.actId)
                return;

            $scope.loading = true;
            activity.getOne(ctx.actId)
            .then(function (data) {
                $scope.activity = data;
                $scope.loading = false;
                $rootScope.pageTitle = lang.SIGNUP_TITLES + data.name;
            })
            .catch(function (err) {
                console.log(err);
                $scope.loading = false;
                $rootScope.pageTitle = lang.TITLE_DEFAULT;
            });
            
            $scope.processing = false;
            $scope.signup = function () {
                $scope.processing = true;
                member.create(ctx.actId)
                .then(function (data) {
                    console.log(data);
                    $state.gox(ucconst.states.footprint);
                    $scope.processing = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.SIGNUP_MSG_SUCCESS });
                })
                .catch(function (err) {
                    if (err.status == 409)
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.SIGNUP_MSG_ERR_CONFLICT });
                    else
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.SIGNUP_MSG_ERR_UNKNOWN });
                    console.log(err);
                    $scope.processing = false;
                });
            };
        }
    }]);
})();