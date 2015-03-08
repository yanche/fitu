(function () {
    angular.module('fitu')
    .controller('updatepwd', ['$rootScope', '$scope', '$state', 'ucconst', 'ucdatamodel', 'user', 'lang', function ($rootScope, $scope, $state, ucconst, ucdatamodel, user, lang) {
        $rootScope.pageTitle = lang.UPDATEPWD_TITLE;
        $scope.updatePWDModel = new ucdatamodel.UpdateLoginPWDModel();
        $scope.updating = false;
        $scope.updatePWD = function () {
            if ($scope.updatePWDModel.validate()) {
                var data = $scope.updatePWDModel.toLO();
                $scope.updating = true;
                user.changePassword(data.hash_pwd, data.confirm_hash_pwd)
                .then(function () {
                    //$scope.updatePWDModel.init();
                    $state.gox(ucconst.states.myself);
                    $scope.updating = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.UPDATEPWD_MSG_SUCCESS });
                    $state.gox(ucconst.states.myself);
                })
                .catch(function (err) {
                    if (err.status == 401)
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.UPDATEPWD_MSG_ERR_PWD });
                    else
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.UPDATEPWD_MSG_ERR_UNKNOWN });
                    console.log(err);
                    $scope.updating = false;
                });
            }
        };
    }]);
})();