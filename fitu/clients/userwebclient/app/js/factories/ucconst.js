(function () {
    angular.module('fitu')
    .factory('ucconst', [function () {
        return {
            events: {
                login: 'login',
                logout: 'logout',
                showMsg: 'showMsg',
                countPendingNote: 'countPendingNote'
            },
            msgType: {
                none: 0,
                success: 1,
                info: 2,
                warning: 3,
                error: 4
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
                subscribedsites: 'fitu.myself.subscribedsites',
                matrix: 'fitu.myself.matrix',
                mobilevc: 'fitu.myself.mobilevc',
                sites: 'fitu.sites',
                sitedetail: 'fitu.sitedetail',
                sitelocation: 'fitu.sitelocation',
                vendordetail: 'fitu.vendordetail',
                discovery: 'fitu.discovery',
                notfound: 'fitu.notfound'
            }
        };
    }]);
})();