(function () {
    angular.module('fitu')
    .controller('profile', ['$rootScope', '$scope', '$state', 'user', 'validate', 'ucconst', 'ucdatamodel', 'lang', function ($rootScope, $scope, $state, user, validate, ucconst, ucdatamodel, lang) {
        $rootScope.pageTitle = lang.PROFILE_TITLE;
        var usercopy = angular.copy($rootScope.user);
        usercopy.headUrl = $filter('picUrl')(usercopy.headUrl);
        $scope.profileModel = new ucdatamodel.UserProfileModel().init(usercopy);
        $scope.updating = false;
        $scope.updateProfile = function () {
            if ($scope.profileModel.validate()) {
                var data = $scope.profileModel.toLO();
                $scope.updating = true;
                user.updateUser(data)
                .then(function () {
                    return user.getLoginUser(true);
                })
                .then(function (updateduser) {
                    angular.extend($rootScope.user, updateduser);
                    $scope.profileModel.init(updateduser);
                    $scope.updating = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.PROFILE_MSG_SUCCESS });
                    $state.gox(ucconst.states.myself);
                })
                .catch(function (err) {
                    if (err.status == 409)
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.PROFILE_MSG_ERR_CONFLICT });
                    else
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.PROFILE_MSG_ERR_UNKNOWN });
                    console.log(err);
                    $scope.updating = false;
                });
            }
        };
        $scope.nickNameAvailable = 2; //0: available, 1: not, 2: unknown
        $scope.checkNickNameAvailability = function () {
            if (validate.nickName($scope.profileModel.nickNameProp.val)) {
                user.nickNameAvailable($scope.profileModel.nickNameProp.val)
                .then(function (available) {
                    $scope.nickNameAvailable = available ? 0 : 1;
                })
                .catch(function (err) {
                    $scope.nickNameAvailable = 2;
                });
            }
            else
                $scope.nickNameAvailable = 2;
        };
    }]);
})();