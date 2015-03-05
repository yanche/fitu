(function () {
    angular.module('fitu')
    .controller('updateemail', ['$rootScope', '$scope', '$state', 'ucconst', 'ucdatamodel', 'user', 'lang', function ($rootScope, $scope, $state, ucconst, ucdatamodel, user, lang) {
        $rootScope.pageTitle = lang.UPDATEEMAIL_TITLE;
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
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.UPDATEEMAIL_MSG_SUCCESS });
                    $state.gox(ucconst.states.myself);
                })
                .catch(function (err) {
                    if (err.status == 409)
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.UPDATEEMAIL_MSG_ERR_CONFLICT });
                    else if (err.status == 401)
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.UPDATEEMAIL_MSG_ERR_PWD });
                    else
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.UPDATEEMAIL_MSG_ERR_UNKNOWN });
                    console.log(err);
                    $scope.updating = false;
                });
            }
        };
        $scope.emailAvailable = 2; //0: available, 1: not, 2: unknown
        $scope.checkEmailAvailability = function () {
            if ($scope.updateEmailModel.emailProp.validate()) {
                user.emailAvailable($scope.updateEmailModel.emailProp.val)
                .then(function (available) {
                    $scope.emailAvailable = available ? 0 : 1;
                })
                .catch(function (err) {
                    $scope.emailAvailable = 2;
                });
            }
            else
                $scope.emailAvailable = 2;
        };
    }]);
})();