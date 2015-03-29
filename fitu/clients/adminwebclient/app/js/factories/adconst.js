(function () {
    angular.module('fituad')
    .factory('adconst', [function () {
        return {
            states: {
                login: 'fituad.login',
                logs: 'fituad.admin.logs',
                dataprint: 'fituad.admin.dataprint',
                dataop: 'fituad.admin.dataop',
            },
            events: {
                logout: 'logout'
            },
            messenger: 'adminMSG'
        };
    }]);
})();