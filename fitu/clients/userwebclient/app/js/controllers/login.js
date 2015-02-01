(function () {
    angular.module('fitu')
    .controller('login', ['$rootScope', '$scope', '$location', '$state', 'validate', 'user', '$state', 'ucconst', 'ucdatamodel' ,'lang', function ($rootScope, $scope, $location, $state, validate, user, $state, ucconst, ucdatamodel, lang) {
        var ctx = $location.search();
        $scope.logining = false;
        $scope.registering = false;
        $scope.loginModel = new ucdatamodel.LoginModel();
        $scope.login = function () {
            if ($scope.loginModel.validate()) {
                var pojo = $scope.loginModel.toPOJO();
                $scope.logining = true;
                user.login(pojo.email, pojo.hash_pwd)
                .then(function () {
                    var params = angular.extend({}, ctx);
                    delete params.state;
                    $scope.$emit(ucconst.events.login, ctx.state || ucconst.states.myself, params);
                    $scope.logining = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.LOGIN_MSG_SUCCESS });
                })
                .catch(function (err) {
                    $scope.$emit(ucconst.events.showMsg, {msgType: ucconst.msgType.error, msg: lang.LOGIN_MSG_ERR});
                    console.log(err);
                    console.log('登录失败！');
                    $scope.logining = false;
                });
            }
        };
        
        $scope.registerModel = new ucdatamodel.RegisterModel();
        $scope.register = function () {
            if ($scope.registerModel.validate()) {
                $scope.registering = true;
                var pojo = $scope.registerModel.toPOJO();
                user.create(pojo)
                .catch(function (err) {
                    if(err.status == 409)
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.REGISTER_MSG_ERR_CONFLICT });
                    else
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.REGISTER_MSG_ERR_UNKNOWN });
                    $scope.registering = false;
                    console.log(err);
                    return false;
                })
                .then(function (data) {
                    if (false !== data) {
                        $scope.registering = false;
                        $scope.logining = true;
                        return user.login(pojo.email, pojo.hash_pwd);
                    }
                    else
                        return false;
                })
                .catch(function (err) {
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.REGISTER_MSG_ERR_LOGINFAIL });
                    $scope.logining = false;
                    console.log(err);
                    return false;
                })
                .then(function (data) {
                    if (false !== data) {
                        var params = angular.extend({}, ctx);
                        delete params.state;
                        $scope.$emit(ucconst.events.login, ctx.state || ucconst.states.myself, params);
                        $scope.logining = false;
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.REGISTER_MSG_SUCCESS });
                    }
                });
            }
        };
        
        $scope.emailAvailable = 2; //0: available, 1: not, 2: unknown
        $scope.checkEmailAvailability = function () {
            if ($scope.registerModel.emailProp.validate()) {
                user.emailAvailable($scope.registerModel.emailProp.val)
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
        $scope.nickNameAvailable = 2; //0: available, 1: not, 2: unknown
        $scope.checkNickNameAvailability = function () {
            if (validate.nickName($scope.registerModel.nickNameProp.val)) {
                user.nickNameAvailable($scope.registerModel.nickNameProp.val)
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

        $scope.resetPwd = function () {
            if ($scope.loginModel.emailProp.validate()) {
                var email = $scope.loginModel.emailProp.val;
                $scope.$emit(ucconst.events.showMsg, {
                    msgType: ucconst.msgType.success,
                    msg: lang.LOGIN_MSG_CONFIRM_RESETPWD + email,
                    onConfirm: function () {
                        user.resetpwd(email)
                        .then(function () {
                            $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.LOGIN_MSG_SUCCESS_RESETPWD });
                        })
                        .catch(function (err) {
                            if (err.status == 500)
                                $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.LOGIN_MSG_ERR_EMAIL });
                            else if (err.status == 409)
                                $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.LOGIN_MSG_ERR_DUP });
                            else if (err.status == 400)
                                $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.LOGIN_MSG_ERR_NOTFOUND });
                            else
                                $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.LOGIN_MSG_ERR_UNKNOWN }); 
                        });
                    }
                });

            }
        };
    }]);
})();