(function () {
    angular.module('fitu')
    .controller('profile', ['$rootScope', '$scope', '$state', 'user', 'validate', 'ucconst', 'ucdatamodel', function ($rootScope, $scope, $state, user, validate, ucconst, ucdatamodel) {
        $scope.profileModel = new ucdatamodel.UserProfileModel().init($rootScope.user);
        $scope.updating = false;
        $scope.updateProfile = function () {
            if ($scope.profileModel.validate()) {
                var data = $scope.profileModel.toPOJO();
                $scope.updating = true;
                user.updateUser(data)
                .then(function () {
                    angular.extend($rootScope.user, data);
                    console.log($rootScope.user);
                    console.log('更新成功');
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