(function () {
    angular.module('fitu')
    .controller('actlocation', ['$scope', '$location', 'activity', 'lang', '$rootScope', function ($scope, $location, activity, lang, $rootScope) {
        var ctx = $location.search();
        if (!ctx.actId)
            return;

        $scope.loading = true;
        activity.getOne(ctx.actId)
        .then(function (data) {
            $scope.activity = data;
            $scope.loading = false;
            $rootScope.pageTitle = lang.ACTLOC_TITLE + data.name;
        })
        .catch(function (err) {
            console.log(err);
            $scope.loading = false;
            $rootScope.pageTitle = lang.TITLE_DEFAULT;
        });
    }]);
})();