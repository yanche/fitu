(function () {
    angular.module('fitu_ad', ['ui.router', 'ui.router.stateHelper', 'ngRoute', 'fitulib', 'fituhtml'])
    .config(['$stateProvider', 'stateHelperProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
        function ($stateProvider, stateHelperProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $locationProvider.html5Mode(true);
        stateHelperProvider.setNestedState({
            name: 'main',
            templateUrl: '/app/html/main.html',
            controller: 'main',
            url: '/main'
        });
        $urlRouterProvider.when('/', '/main');
    }]);
})();