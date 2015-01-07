(function () {
    angular.module('fitu')
    .controller('myself', ['$rootScope', '$scope', '$state', 'ucconst', 'user', function ($rootScope, $scope, $state, ucconst, user) {
        $scope.logout = function () {
            user.logout()
            .then(function () {
                $scope.$emit(ucconst.events.logout);
                $state.gox(ucconst.states.activities);
            })
            .catch(function (err) {
                console.log(err);
                console.log('登出失败！');
            });
        };
    }]);
})();