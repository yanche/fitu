(function () {
    angular.module('fitu', ['ui.router', 'ui.router.stateHelper', 'ngRoute', 'fitulib', 'fituhtml'])
    .run(['$rootScope', 'user', 'ucconst', 'lang', '$state', '$timeout', '$location', 'crypto', function ($rootScope, user, ucconst, lang, $state, $timeout, $location, crypto) {
        var loadUser = function (obj, state, params) {
            x = $location;
            //TODO, state transfer need optimization
            $rootScope.loadingUser = true;
            user.getLoginUser()
            .then(function (loginUser) {
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
        
        $rootScope.$on(ucconst.events.login, loadUser);
        $rootScope.$on(ucconst.events.logout, function () { $rootScope.user = null; });
        
        $rootScope.lastPageSwitchTS = new Date().getTime();
        
        $rootScope.$on('$stateNotFound', function (evt, unfoundState, fromState, fromParams) {
            console.log('state not found');
            console.log(arguments);
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
            else if (toState.name.indexOf(ucconst.states.myself) >= 0) {
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
            crypto.wxsign();
        });
        $rootScope.lang = lang;
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
                case ucconst.states.noteinbox:
                    return 'myself';
                case ucconst.states.siteidles:
                case ucconst.states.site:
                case ucconst.states.vendor:
                    return 'gym';
                default:
                    return '';
            }
        };
    }])
    .config(['$stateProvider', 'stateHelperProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function ($stateProvider, stateHelperProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $locationProvider.html5Mode(true);
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
                }]
            },{
                name: 'activities',
                url: '/activities?tag&siteId&vendorId',
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
                name: 'gym',
                url: '/gym',
                templateUrl: '/app/html/gym/gym.html',
                abstract: true,
                children: [{
                    name: 'vendor',
                    url: '/vendor?id',
                    templateUrl: '/app/html/gym/vendor.html',
                    controller: 'vendor'
                },{
                    name: 'site',
                    url: '/site?id',
                    templateUrl: '/app/html/gym/site.html',
                    controller: 'site'
                },{
                    name: 'siteidles',
                    url: '/siteidles?vendorId&siteId&tag',
                    templateUrl: '/app/html/gym/siteidles.html',
                    controller: 'siteidles'
                }]
            }]
        });
        $urlRouterProvider.when('/', '/activities');
    }]);
})();