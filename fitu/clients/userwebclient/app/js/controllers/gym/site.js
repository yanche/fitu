(function () {
    angular.module('fitu')
    .controller('site', ['$scope', '$state', 'site', '$location', function ($scope, $state, site, $location) {
        var ctx = $location.search();
        site.getOne({ id: ctx.id })
        .then(function (data) {
            $scope.site = data;
        }, function (err) {
            console.log(err);
        });
    }]);
})();