(function () {
    angular.module('fitu')
    .controller('sitelocation', ['$scope', '$location', 'site', '$rootScope', 'lang', function ($scope, $location, site, $rootScope, lang) {
        var ctx = $location.search();
        if (!ctx.siteId)
            return;

        $scope.loading = true;
        site.getOne({ id: ctx.siteId })
        .then(function (data) {
            $scope.site = data;
            $scope.loading = false;
            $rootScope.pageTitle = lang.SITELOC_TITLE + data.name;
        })
        .catch(function (err) {
            console.log(err);
            $scope.loading = false;
            $rootScope.pageTitle = lang.TITLE_DEFAULT;
        });
    }]);
})();