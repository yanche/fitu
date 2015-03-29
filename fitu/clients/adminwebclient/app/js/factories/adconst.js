(function () {
    angular.module('fituvd')
    .factory('adconst', [function () {
        return {
            states: {
                login: 'fituad.login',
                logs: 'fituad.logs',
                dataprint: 'fituad.dataprint',
                activitydataop: 'fituad.dataop.activity',
                sitedataop: 'fituad.dataop.site',
                vendordataop: 'fituad.dataop.vendor',
                userdataop: 'fituad.dataop.user'
            },
            events: {
                logout: 'logout'
            }
        };
    }]);
})();