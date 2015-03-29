(function () {
    angular.module('fituad', ['ui.router', 'ui.router.stateHelper', 'ngRoute', 'fitulib', 'fituhtml'])
    .run(['adconst', 'lang', '$rootScope', 'user', '$location', '$state', '$timeout', function (adconst, lang, $rootScope, user, $location, $state, $timeout) {
        $rootScope.lang = lang;
        $rootScope.adconst = adconst;
        $rootScope.$on(adconst.events.logout, function () {
            console.log('user logout');
            var ctx = $location.search();
            ctx.state = $state.current.name;
            $state.gox(adconst.states.login, ctx);
            $rootScope.godOrOb = false;
        });
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            if (toState.name == adconst.states.login) {
                if ($rootScope.godOrOb)
                    evt.preventDefault();
            }
            else {
                if (!$rootScope.godOrOb) {
                    evt.preventDefault();
                    $timeout(function () {
                        var ctx = $location.search();
                        ctx.state = toState.name;
                        $state.gox(adconst.states.login, ctx);
                    });
                }
            }
        });
        $rootScope.$on('$stateNotFound', function (evt, unfoundState, fromState, fromParams) {
            console.log('state not found');
            console.log(arguments);
        });
        $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, error) {
            console.log('state change with error');
            console.log(arguments);
        });
    }])
    .config(['$stateProvider', 'stateHelperProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, stateHelperProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $locationProvider.html5Mode(true);
        stateHelperProvider.setNestedState({
            name: 'fituad',
            templateUrl: '/app/html/main.html',
            controller: 'main',
            abstract: true,
            children: [{
                name: 'admin',
                abstract: true,
                templateUrl: '/app/html/layout.html',
                controller: 'admin',
                children: [{
                    name: 'dataop',
                    templateUrl: '/app/html/dataop/dataop.html',
                    controller: 'dataop',
                    url: '/dataop'
                }, {
                    name: 'dataprint',
                    templateUrl: '/app/html/dataprint/dataprint.html',
                    controller: 'dataprint',
                    url: '/dataprint'
                }, {
                    name: 'logs',
                    templateUrl: '/app/html/logs/logs.html',
                    controller: 'logs',
                    url: '/logs'
                }]
            }, {
                name: 'login',
                url: '/login',
                templateUrl: '/app/html/login/login.html',
                controller: 'login'
            }]
        });
        $urlRouterProvider.when('/', '/login');
    }]);
})();