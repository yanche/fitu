(function () {
    angular.module('fitu')
    .controller('login', ['$rootScope', '$scope', '$location', '$state', 'validate', 'user', '$state', 'ucconst', 'ucdatamodel', function ($rootScope, $scope, $location, $state, validate, user, $state, ucconst, ucdatamodel) {
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
                })
                .catch(function (err) {
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
                .then(function (data) {
                    $scope.registering = false;
                    $scope.logining = true;
                    return user.login(pojo.email, pojo.hash_pwd);
                })
                .then(function () {
                    var params = angular.extend({}, ctx);
                    delete params.state;
                    $scope.$emit(ucconst.events.login, ctx.state || ucconst.states.myself, params);
                    $scope.logining = false;
                })
                .catch(function (err) {
                    $scope.registering = false;
                    $scope.logining = false;
                    console.log(err);
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
    }]);
})();