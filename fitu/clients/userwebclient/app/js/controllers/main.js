(function () {
    angular.module('fitu')
    .controller('main', ['$scope', '$window', function ($scope, $window) {
        $scope.goBack = function () {
            $window.history.back();
        };
    }]);
})();