(function () {
    angular.module('fituad')
    .controller('login', ['$scope', 'user', 'crypto', 'messenger', '$rootScope', 'lang', 'adconst', 'datamodel', '$location', '$state', function ($scope, user, crypto, messenger, $rootScope, lang, adconst, datamodel, $location, $state) {
        $scope.loginModel = new datamodel.LoginModel();

        $scope.login = function () {
            if ($scope.loginModel.validate()) {
                var lo = $scope.loginModel.toLO();
                user.login(lo.email, lo.hash_pwd)
                .then(function () {
                    $scope.logining = false;
                    loadUser();
                })
                .catch(function (err) {
                    messenger.show(adconst.messenger, 'error', lang.LOGIN_MSG_AUTHN, 5000);
                    $scope.logining = false;
                });
                $scope.logining = true;
            }
        };

        var loadUser = function () {
            user.getLoginUser()
            .then(function (data) {
                if (data.special == 1 || data.special == 2) {
                    $rootScope.godOrOb = true;
                    var ctx = $location.search();
                    var retState = ctx.state || adconst.states.logs;
                    delete ctx.state;
                    $state.gox(retState, ctx);
                }
                else {
                    messenger.show(adconst.messenger, 'error', lang.LOGIN_MSG_AUTHZ, 5000);
                }
                $scope.loading = false;
            })
            .catch(function (err) {
                console.log(err);
                $scope.loading = false;
                messenger.show(adconst.messenger, 'error', lang.LOGIN_MSG_AUTHN, 5000);
            });
            $scope.loading = true;
        };

        //try auto login
        if ($.cookie('sessionId')) {
            loadUser();
        }
    }]);
})();