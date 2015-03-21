(function () {
    angular.module('fitu')
    .controller('mobilevc', ['$scope', 'user', '$rootScope', '$state', 'ucconst', 'lang', 'ucerrcodes', function ($scope, user, $rootScope, $state, ucconst, lang, ucerrcodes) {
        $rootScope.pageTitle = lang.MOBILEVC_TITLE;
        
        $scope.requestSMSVC = function () {
            user.requestMobileVC()
            .then(function (data) {
                $scope.sent = true;
                $scope.sending = false;
                $scope.smsvcId = data.id;
            })
            .catch(function (err) {
                $scope.sending = false;
                $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: ucerrcodes.requestMobileVCEC.toErrMsg(err && err.data && err.data.errcode ? err.data.errcode : null) });
            });
            $scope.sending = true;
        };
        
        $scope.claimSMSVC = function () {
            if ($scope.vcInput && $scope.smsvcId) {
                user.claimMobileVC({ id: $scope.smsvcId, vcode: $scope.vcInput })
                .then(function (data) {
                    $scope.submitting = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.MOBILEVC_MSG_CLAIM_SUCCESS });
                    $state.gox(ucconst.states.myself);
                })
                .catch(function (err) {
                    $scope.submitting = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: ucerrcodes.claimMobileVCEC.toErrMsg(err && err.data && err.data.errcode ? err.data.errcode : null) });
                });
                $scope.submitting = true;
            }
        };
    }]);
})();