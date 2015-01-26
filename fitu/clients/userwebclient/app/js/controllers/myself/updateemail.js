(function () {
    angular.module('fitu')
    .controller('updateemail', ['$rootScope', '$scope', '$state', 'ucconst', 'ucdatamodel', 'user', function ($rootScope, $scope, $state, ucconst, ucdatamodel, user) {
        $scope.updateEmailModel = new ucdatamodel.UpdateLoginEmailModel();
        $scope.updating = false;
        $scope.updateEmail = function () {
            if ($scope.updateEmailModel.validate()) {
                var data = $scope.updateEmailModel.toPOJO();
                $scope.updating = true;
                user.changeEmail(data.email, data.confirm_hash_pwd)
                .then(function () {
                    angular.extend($rootScope.user, { email: data.email });
                    //$scope.updateEmailModel.init();
                    $state.gox(ucconst.states.myself);
                    $scope.updating = false;
                })
                .catch(function (err) {
                    console.log(err);
                    $scope.updating = false;
                });
            }
        };
    }]);
})();