(function () {
    angular.module('fitu')
    .factory('link', ['$state', 'ucconst', function ($state, ucconst) {
        return {
            goActDetail: function (actId) {
                if (actId)
                    $state.gox(ucconst.states.actdetail, { actId: actId });
            },
            goActLead: function (actId) {
                if (actId)
                    $state.gox(ucconst.states.actlead, { actId: actId });
            },
            goSignUp: function (actId) {
                if (actId)
                    $state.gox(ucconst.states.signup, { actId: actId });
            },
            goActLocation: function (actId) {
                if (actId)
                    $state.gox(ucconst.states.actlocation, { actId: actId });
            },
            goSiteDetail: function (siteId) {
                if (siteId)
                    $state.gox(ucconst.states.sitedetail, { siteId: siteId });
            },
            goSiteLocation: function (siteId) {
                if (siteId)
                    $state.gox(ucconst.states.sitelocation, { siteId: siteId });
            },
            goVendorDetail: function (vendorId) {
                if (vendorId)
                    $state.gox(ucconst.states.vendordetail, { vendorId: vendorId });
            },
            goMatrix: function (options) {
                options = options || {};
                if (options.siteId || options.actId)
                    $state.gox(ucconst.states.matrix, { siteId: options.siteId, actId: options.actId });
            },
            goUserPreview: function (userId) {
                if (userId)
                    $state.gox(ucconst.states.userpreview, { userId: userId });
            },
            goSendNote: function (options) {
                options = options || {};
                if (options.recipientId || options.actId)
                    $state.gox(ucconst.states.sendnote, { recipientId: options.recipientId, actId: options.actId, re: options.re ? 'RE:' + options.re : undefined });
            }
        };
    }]);
})();