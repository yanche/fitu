(function () {
    angular.module('fitu')
    .controller('mobilevc', ['$scope', 'user', '$rootScope', '$state', 'ucconst', 'lang', function ($scope, user, $rootScope, $state, ucconst, lang) {
        $rootScope.pageTitle = lang.MOBILEVC_TITLE;

        $scope.sendSMSVC = function () {
            user.mobileV()
            .then(function (data) {
                console.log(data);
                $scope.sent = true;
                $scope.sending = false;
                $scope.smsId = data.id;
            })
            .catch(function () {
                $scope.sending = false;
            });
            $scope.sending = true;
        };
    }]);
})();