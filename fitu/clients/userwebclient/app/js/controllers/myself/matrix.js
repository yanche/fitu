(function () {
    angular.module('fitu')
    .controller('matrix', ['$scope', '$state', 'site', '$location', 'ucconst', 'validate', '$rootScope', 'ucdatamodel', 'const', 'activity', function ($scope, $state, site, $location, ucconst, validate, $rootScope, ucdatamodel, constants, activity) {
        var ctx = $location.search();
        if (!ctx.siteId)
            return;
        $scope.loading = true;
        site.getOne({ id: ctx.siteId })
        .then(function (data) {
            $scope.site = data;
            initModel();
            $scope.loading = false;
        }, function (err) {
            console.log(err);
            $scope.loading = false;
        });
        
        $scope.matrixModel = new ucdatamodel.MatrixModel();
        var initModel = function () {
            $scope.matrixModel.init({
                name: '',
                intro: '',
                startsOn: moment().add({ days: 3 }).hour(16).minute(0).format(constants.dateTimeFormat),
                endsOn: moment().add({ days: 3 }).hour(17).minute(0).format(constants.dateTimeFormat),
                capacity: 5,
                price: $scope.site.prices[0].amount,
                picUrl: $scope.site.picUrl,
                tags: $scope.site.tags
            });
        };

        $scope.reset = function () {
            initModel();
        };
        
        $scope.submit = function () {
            if ($scope.matrixModel.validate()) {
                $scope.adding = true;
                activity.create({ siteId: ctx.siteId, data: $scope.matrixModel.toPOJO() })
                .then(function (data) {
                    if(data.id)
                        $state.gox(ucconst.states.actdetail, { actId: data.id });
                    else
                        $state.gox(ucconst.states.activities);
                    $scope.adding = false;
                })
                .catch(function (err) {
                    $scope.adding = false;
                });
            }
        };
    }]);
})();