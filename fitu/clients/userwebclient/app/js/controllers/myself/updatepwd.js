(function () {
    angular.module('fitu')
    .controller('updatepwd', ['$rootScope', '$scope', '$state', 'ucconst', 'ucdatamodel', 'user', function ($rootScope, $scope, $state, ucconst, ucdatamodel, user) {
        $scope.updatePWDModel = new ucdatamodel.UpdateLoginPWDModel();
        $scope.updating = false;
        $scope.updatePWD = function () {
            if ($scope.updatePWDModel.validate()) {
                var data = $scope.updatePWDModel.toPOJO();
                $scope.updating = true;
                user.changePassword(data.hash_pwd, data.confirm_hash_pwd)
                .then(function () {
                    console.log('密码修改成功');
                    //$scope.updatePWDModel.init();
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