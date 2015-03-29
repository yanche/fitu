(function () {
    angular.module('fituad')
    .controller('admin', ['$scope', '$state', 'adconst', 'user', 'messenger', 'lang', function ($scope, $state, adconst, user, messenger, lang) {
        $scope.goLogs = function () {
            $state.gox(adconst.states.logs);
        };
            
        $scope.goDataPrint = function () {
            $state.gox(adconst.states.dataprint);
        };
            
        $scope.goDataOP = function () {
            $state.gox(adconst.states.dataop);
        };

        $scope.logout = function () {
            user.logout()
            .then(function () {
                $scope.$emit(adconst.events.logout);
            })
            .catch(function (err) {
                messenger.show(adconst.messenger, 'error', lang.LOGOUT_MSG_FAILED, 5000);
            });
        };

        $scope.state = $state;
    }]);
})();