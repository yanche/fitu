(function () {
    angular.module('fituvd', ['ui.router', 'ui.router.stateHelper', 'ngRoute', 'fitulib', 'fituhtml'])
    .run(['$rootScope', '$state', '$timeout', '$location', 'vcconst', 'validate', function ($rootScope, $state, $timeout, $location, vcconst, validate) {
        $rootScope.vendors = [];
        $rootScope.currentVendor = null;
        $rootScope.vcconst = vcconst;
        $rootScope.$on(vcconst.events.logout, function () {
            console.log('user logout');
            $rootScope.vendors = [];
            $rootScope.currentVendor = null;
            var ctx = $location.search();
            ctx.state = $state.current.name;
            $state.gox(vcconst.states.login, ctx);
        });
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
            console.log('state chaging from: ' + $state.href(fromState.name, toParams) + ', to: ' + $state.href(toState.name, toParams));
            if (toState.name == vcconst.states.login) {
                if (validate.nonEmptyArray($rootScope.vendors))
                    evt.preventDefault();
            }
            else {
                if (!validate.nonEmptyArray($rootScope.vendors)) {
                    evt.preventDefault();
                    $timeout(function () {
						var ctx = $location.search();
						ctx.state = toState.name;
                        $state.gox(vcconst.states.login, ctx);
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
    .config(['$stateProvider', 'stateHelperProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function ($stateProvider, stateHelperProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $locationProvider.html5Mode(true);
        stateHelperProvider.setNestedState({
            name: 'fituvd',
            abstract: true,
            templateUrl: '/app/html/main.html',
            controller: 'main',
            children: [{
                name: 'vendor',
                abstract: true,
                templateUrl: '/app/html/layout.html',
                controller: 'vendor',
                children: [{
                    name: 'profile',
                    url: '/profile?vendorId',
                    templateUrl: '/app/html/profile/profile.html',
                    controller: 'profile'
                },{
                    name: 'admins',
                    url: '/admins?vendorId',
                    templateUrl: '/app/html/admins/admins.html',
                    controller: 'admins'
                },{
                    name: 'sites',
                    url: '/sites?vendorId',
                    templateUrl: '/app/html/sites/sites.html',
                    controller: 'sites'
                },{
                    name: 'siteidles',
                    url: '/siteidles?vendorId&siteId',
                    templateUrl: '/app/html/siteidles/siteidles.html',
                    controller: 'siteidles'
                },{
                    name: 'statistics',
                    url: '/statistics?vendorId',
                    templateUrl: '/app/html/statistics/statistics.html',
                    controller: 'statistics'
                }]
            },{
                name: 'login',
                url: '/login',
                templateUrl: '/app/html/login/login.html',
                controller: 'login'
            }]
        });
        $urlRouterProvider.when('/', '/login');
    }]);
})();