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
            goSiteDetail: function (siteId) {
                if (siteId)
                    $state.gox(ucconst.states.sitedetail, { siteId: siteId });
            },
            goUserPreview: function (userId) {
                if (userId)
                    $state.gox(ucconst.states.userpreview, { userId: userId });
            },
            goSendNote: function (options) {
                options = options || {};
                if (options.recipientId)
                    $state.gox(ucconst.states.sendnote, { recipientId: options.recipientId, actId: options.actId, re: options.re ? 'RE:' + options.re : undefined });
            }
        };
    }]);
})();