(function () {
    angular.module('fituvd')
    .factory('vcconst', [function () {
        return {
            states: {
                login: 'fituvd.login',
                profile: 'fituvd.vendor.profile',
                admins: 'fituvd.vendor.admins',
                sites: 'fituvd.vendor.sites',
                siteidles: 'fituvd.vendor.siteidles',
                statistics: 'fituvd.vendor.statistics',
            },
            events: {
                logout: 'logout'
            },
            messenger: 'vendorMSG'
        };
    }]);
})();