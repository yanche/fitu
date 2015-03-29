(function () {
    angular.module('fituad', ['ui.router', 'ui.router.stateHelper', 'ngRoute', 'fitulib', 'fituhtml'])
    .config(['$stateProvider', 'stateHelperProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, stateHelperProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $locationProvider.html5Mode(true);
        stateHelperProvider.setNestedState({
            name: 'fituad',
            templateUrl: '/app/html/main.html',
            controller: 'main',
            abstract: true,
            children: [{
                name: 'dataop',
                abstract: true,
                templateUrl: '/app/html/dataop/dataop.html',
                controller: 'dataop',
                url: '/dataop',
                children: [{
                    name: 'activity',
                    url: '/activity',
                    templateUrl: '/app/html/dataop/activity.html',
                    controller: 'activitydataop'
                }, {
                    name: 'site',
                    url: '/site',
                    templateUrl: '/app/html/dataop/site.html',
                    controller: 'sitedataop'
                }, {
                    name: 'vendor',
                    url: '/vendor',
                    templateUrl: '/app/html/dataop/vendor.html',
                    controller: 'vendordataop'
                }, {
                    name: 'user',
                    url: '/user',
                    templateUrl: '/app/html/dataop/user.html',
                    controller: 'userdataop'
                }]
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