﻿(function () {
    angular.module('fitu', ['ngAnimate', 'ui.router', 'ui.router.stateHelper', 'fitulib', 'fituhtml', 'fituhtmluser'])
    .run(['$rootScope', 'user', 'ucconst', 'lang', '$state', '$timeout', '$location', 'crypto', 'wxb', 'link', 'util', 'note', 'const', function ($rootScope, user, ucconst, lang, $state, $timeout, $location, crypto, wxb, link, util, note, constant) {
        $rootScope.mobile = constant.siteInfo.mobile;
        //not the best approach, on WP
        $rootScope.inWx = navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0;
        var loadUser = function (obj, state, params) {
            //TODO, state transfer need optimization
            $rootScope.loadingUser = true;
            user.getLoginUser()
            .then(function (loginUser) {
                loadPendingNotesCount();
                $rootScope.user = loginUser;
                $rootScope.loadingUser = false;
                if (state) $state.gox(state, params || {});
                else {
                    $timeout(function () {
                        if ($state.current.name == ucconst.states.login) {
                            var ctx = $location.search();
                            if (ctx.state) {
                                var state = ctx.state;
                                delete ctx.state;
                                $state.gox(state, ctx);
                            }
                            else
                                $state.gox(ucconst.states.activities, {});
                        }
                    }, 50);
                }
            })
            .catch(function (err) {
                console.log(err);
                $rootScope.user = null;
                $rootScope.loadingUser = false;
            });
        };
        //try auto login
        if ($.cookie('sessionId')) loadUser();
        
        var loadPendingNotesCount = function () {
            note.getPendingNotesCount()
            .then(function (data) {
                $rootScope.pendingNotesCount = data;
            })
            .catch(function () {
                console.error('failed to load pending notes count');
                $rootScope.pendingNotesCount = { note: 0, sys: 0 };
            });
        };
        
        $rootScope.$on(ucconst.events.login, loadUser);
        $rootScope.$on(ucconst.events.logout, function () { $rootScope.user = null; });
        $rootScope.$on(ucconst.events.countPendingNote, loadPendingNotesCount); 
        
        $rootScope.lastPageSwitchTS = new Date().getTime();
            
        //angular-ui-router v0.3.0 ?
        $rootScope.$on('$stateNotFound', function (evt, unfoundState, fromState, fromParams) {
            console.log('state not found');
            console.log(arguments);
            $state.gox(ucconst.states.notfound);
        });
        $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
            console.log('state change with error');
            console.log(arguments);
        });
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            console.log('state chaging from: ' + $state.href(fromState.name, toParams) + ', to: ' + $state.href(toState.name, toParams) + ' starts');
            if (toState.name == ucconst.states.login) {
                if ($rootScope.user)
                    evt.preventDefault();
            }
            else if (toState.name.indexOf(ucconst.states.myself) >= 0 || toState.name == ucconst.states.discovery) {
                if (!$rootScope.user) {
                    evt.preventDefault();
                    $timeout(function () {
                        var params = angular.extend({}, toParams);
                        params.state = toState.name;
                        for (var i in params)
                            if (params[i] === undefined)
                                delete params[i];
                        $state.gox(ucconst.states.login, params);
                    });
                }
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState, fromParams) {
            console.log('state chaging from: ' + $state.href(fromState.name, toParams) + ', to: ' + $state.href(toState.name, toParams) + ' ends');
            $timeout(crypto.wxsign, 10);
        });
        $rootScope.lang = lang;
        $rootScope.link = link;
        $rootScope.util = util;
        $rootScope.currentState = function () {
            return $state.current.name;
        };
        $rootScope.currentNav = function () {
            var state = $state.current.name;
            switch (state) {
                case ucconst.states.activities:
                case ucconst.states.signup:
                case ucconst.states.actdetail:
                case ucconst.states.actlocation:
                case ucconst.states.userpreview:
                    return 'activities';
                case ucconst.states.login:
                case ucconst.states.myself:
                case ucconst.states.profile:
                case ucconst.states.updateemail:
                case ucconst.states.updatepwd:
                case ucconst.states.footprint:
                case ucconst.states.leadership:
                case ucconst.states.actlead:
                case ucconst.states.sendnote:
                case ucconst.states.noteoutbox:
                case ucconst.states.notesys:
                case ucconst.states.noteinbox:
                case ucconst.states.fans:
                case ucconst.states.subscribedusers:
                case ucconst.states.subscribedsites:
                case ucconst.states.matrix:
                case ucconst.states.mobilevc:
                    return 'myself';
                case ucconst.states.sites:
                case ucconst.states.sitedetail:
                case ucconst.states.sitelocation:
                case ucconst.states.vendordetail:
                case ucconst.states.discovery:
                    return 'gym';
                case ucconst.states.notfound:
                default:
                    return '';
            }
        };
    }])
    .config(['$stateProvider', 'stateHelperProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$animateProvider', function ($stateProvider, stateHelperProvider, $urlRouterProvider, $locationProvider, $httpProvider, $animateProvider) {
        $httpProvider.defaults.withCredentials = true;
        //$locationProvider.html5Mode(true);
        $animateProvider.classNameFilter(/^((?!(fa-spin)).)*$/);
        stateHelperProvider.setNestedState({
            name: 'fitu',
            abstract: true,
            templateUrl: '/app/html/main.html',
            controller: 'main',
            children: [{
                name: 'login',
                url: '/login',
                templateUrl: '/app/html/login/login.html',
                controller: 'login'
            }, {
                name: 'notfound',
                url: '/notfound',
                templateUrl: '/app/html/notfound/notfound.html',
            },{
                name: 'myself',
                url: '/myself',
                templateUrl: '/app/html/myself/myself.html',
                controller: 'myself',
                children: [{
                    name: 'profile',
                    url: '/profile',
                    templateUrl: '/app/html/myself/profile.html',
                    controller: 'profile'
                },{
                    name: 'updateemail',
                    url: '/updateemail',
                    templateUrl: '/app/html/myself/updateemail.html',
                    controller: 'updateemail'
                },{
                    name: 'updatepwd',
                    url: '/updatepwd',
                    templateUrl: '/app/html/myself/updatepwd.html',
                    controller: 'updatepwd'
                },{
                    name: 'footprint',
                    url: '/footprint',
                    templateUrl: '/app/html/myself/footprint.html',
                    controller: 'footprint'
                },{
                    name: 'leadership',
                    url: '/leadership',
                    templateUrl: '/app/html/myself/leadership.html',
                    controller: 'leadership'
                },{
                    name: 'actlead',
                    url: '/actlead?actId',
                    templateUrl: '/app/html/myself/actlead.html',
                    controller: 'actlead'
                },{
                    name: 'sendnote',
                    url: '/sendnote?recipientId&actId&re',
                    templateUrl: '/app/html/myself/sendnote.html',
                    controller: 'sendnote'
                },{
                    name: 'noteinbox',
                    url: '/noteinbox',
                    templateUrl: '/app/html/myself/noteinbox.html',
                    controller: 'noteinbox'
                },{
                    name: 'noteoutbox',
                    url: '/noteoutbox',
                    templateUrl: '/app/html/myself/noteoutbox.html',
                    controller: 'noteoutbox'
                },{
                    name: 'notesys',
                    url: '/notesys',
                    templateUrl: '/app/html/myself/notesys.html',
                    controller: 'notesys'
                },{
                    name: 'fans',
                    url: '/fans',
                    templateUrl: '/app/html/myself/fans.html',
                    controller: 'fans'
                },{
                    name: 'subscribedusers',
                    url: '/subscribedusers',
                    templateUrl: '/app/html/myself/subscribedusers.html',
                    controller: 'subscribedusers'
                },{
                    name: 'subscribedsites',
                    url: '/subscribedsites',
                    templateUrl: '/app/html/myself/subscribedsites.html',
                    controller: 'subscribedsites'
                },{
                    name: 'matrix',
                    url: '/matrix?siteId&actId',
                    templateUrl: '/app/html/myself/matrix.html',
                    controller: 'matrix'
                }, {
                    name: 'mobilevc',
                    url: '/mobilevc',
                    templateUrl: '/app/html/myself/mobilevc.html',
                    controller: 'mobilevc'
                }]
            },{
                name: 'activities',
                url: '/activities?tag&siteId&vendorId&&all',
                templateUrl: '/app/html/activities/activities.html',
                controller: 'activities'
            },{
                name: 'userpreview',
                url: '/userpreview?userId',
                templateUrl: '/app/html/activities/userpreview.html',
                controller: 'userpreview'
            },{
                name: 'signup',
                url: '/signup?actId',
                templateUrl: '/app/html/activities/signup.html',
                controller: 'signup'
            },{
                name: 'actdetail',
                url: '/actdetail?actId',
                templateUrl: '/app/html/activities/actdetail.html',
                controller: 'actdetail'
            },{
                name: 'actlocation',
                url: '/actlocation?actId',
                templateUrl: '/app/html/activities/actlocation.html',
                controller: 'actlocation'
            },{
                name: 'vendordetail',
                url: '/vendordetail?vendorId',
                templateUrl: '/app/html/gym/vendordetail.html',
                controller: 'vendordetail'
            },{
                name: 'sitedetail',
                url: '/sitedetail?siteId',
                templateUrl: '/app/html/gym/sitedetail.html',
                controller: 'sitedetail'
            },{
                name: 'sites',
                url: '/sites?vendorId&siteId&tag',
                templateUrl: '/app/html/gym/sites.html',
                controller: 'sites'
            },{
                name: 'sitelocation',
                url: '/sitelocation?siteId',
                templateUrl: '/app/html/gym/sitelocation.html',
                controller: 'sitelocation'
            }, {
                name: 'discovery',
                url: '/discovery?siteId',
                templateUrl: '/app/html/gym/discovery.html',
                controller: 'discovery'
            }]
        });
        $urlRouterProvider.when('/', '/activities').when('', '/activities').otherwise('/notfound');
    }]);
})();