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
                userpreview: 'fitu.userpreview',
                myself: 'fitu.myself',
                profile: 'fitu.myself.profile',
                updateemail: 'fitu.myself.updateemail',
                updatepwd: 'fitu.myself.updatepwd',
                footprint: 'fitu.myself.footprint',
                leadership: 'fitu.myself.leadership',
                actlead: 'fitu.myself.actlead',
                sendnote: 'fitu.myself.sendnote',
                noteinbox: 'fitu.myself.noteinbox',
                noteoutbox: 'fitu.myself.noteoutbox',
                notesys: 'fitu.myself.notesys',
                fans: 'fitu.myself.fans',
                subscribedusers: 'fitu.myself.subscribedusers',
                matrix: 'fitu.myself.matrix',
                sites: 'fitu.gym.sites',
                sitedetail: 'fitu.gym.sitedetail',
                sitelocation: 'fitu.gym.sitelocation',
                vendordetail: 'fitu.gym.vendordetail'
            }
        };
    }]);
})();