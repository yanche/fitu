(function () {
    angular.module('fitu')
    .factory('ucconst', [function () {
        return {
            events: {
                login: 'login',
                logout: 'logout'
            },
            states: {
                login: 'fitu.login',
                activities: 'fitu.activities',
                signup: 'fitu.signup',
                actdetail: 'fitu.actdetail',
                actlocation: 'fitu.actlocation',
                myself: 'fitu.myself',
                profile: 'fitu.myself.profile',
                updateemail: 'fitu.myself.updateemail',
                updatepwd: 'fitu.myself.updatepwd',
                footprint: 'fitu.myself.footprint',
                leadership: 'fitu.myself.leadership',
                actlead: 'fitu.myself.actlead',
                sendnote: 'fitu.myself.sendnote',
                siteidles: 'fitu.gym.siteidles',
                site: 'fitu.gym.site',
                vendor: 'fitu.gym.vendor'
            }
        };
    }]);
})();