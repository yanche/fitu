(function () {
    angular.module('fitu')
    .controller('myself', ['$rootScope', '$scope', '$state', 'ucconst', 'user', 'lang', function ($rootScope, $scope, $state, ucconst, user, lang) {
        $rootScope.pageTitle = lang.MYSELF_TITLE_ME;
        $scope.logout = function () {
            user.logout()
            .then(function () {
                $scope.$emit(ucconst.events.logout);
                $state.gox(ucconst.states.activities);
                $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.LOGOUT_MSG_SUCCESS });
            })
            .catch(function (err) {
                $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.LOGOUT_MSG_ERR_UNKNOWN });
            });
        };
        user.getUserCredits($rootScope.user.id)
        .then(function (c) {
            $scope.credits = c.credits;
        })
        .catch(function (err) { });
    }]);
})();