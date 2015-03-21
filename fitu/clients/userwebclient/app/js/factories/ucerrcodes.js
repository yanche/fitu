(function () {
    angular.module('fitu')
    .factory('ucerrcodes', ['utility', function (utility) {
        var requestMobileVCEC = new utility.ErrorCode();
        requestMobileVCEC.register(null, 'MOBILEVC_MSG_REQ_UNKNOWN');
        requestMobileVCEC.register(2, 'MOBILEVC_MSG_REQ_NOPHONE');
        requestMobileVCEC.register(3, 'MOBILEVC_MSG_REQ_VERIFIED');
        requestMobileVCEC.register(4, 'MOBILEVC_MSG_REQ_FREQ');

        var claimMobileVCEC = new utility.ErrorCode();
        claimMobileVCEC.register(null, 'MOBILEVC_MSG_CLAIM_UNKNOWN');
        claimMobileVCEC.register(2, 'MOBILEVC_MSG_CLAIM_EXP');
        claimMobileVCEC.register(3, 'MOBILEVC_MSG_CLAIM_CLAIMED');
        claimMobileVCEC.register(4, 'MOBILEVC_MSG_CLAIM_NOTFOUND');
        claimMobileVCEC.register(5, 'MOBILEVC_MSG_CLAIM_NOTMATCH');
        claimMobileVCEC.register(6, 'MOBILEVC_MSG_CLAIM_NOPHONE');
        claimMobileVCEC.register(7, 'MOBILEVC_MSG_CLAIM_VERIFIED');
        
        return {
            requestMobileVCEC: requestMobileVCEC,
            claimMobileVCEC: claimMobileVCEC
        };
    }]);
})();