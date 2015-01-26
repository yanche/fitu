(function () {
    angular.module('fitu')
    .controller('matrix', ['$scope', '$state', 'site', '$location', 'ucconst', 'validate', '$rootScope', 'ucdatamodel', 'const', 'activity', function ($scope, $state, site, $location, ucconst, validate, $rootScope, ucdatamodel, constants, activity) {
        var ctx = $location.search();
        if (ctx.actId) {
            $scope.loading = true;
            $scope.mode = 1; //update mode
            activity.getOne(ctx.actId)
            .then(function (data) {
                $scope.activity = data;
                return site.getOne({ id: $scope.activity.site.id });
            })
            .then(function (data) {
                $scope.site = data;
                initModel();
                $scope.loading = false;
            })
            .catch(function (err) {
                console.log(err);
                $scope.loading = false;
            });
        }
        else if (ctx.siteId) {
            $scope.loading = true;
            $scope.mode = 2; //creation mode
            site.getOne({ id: ctx.siteId })
            .then(function (data) {
                $scope.site = data;
                initModel();
                $scope.loading = false;
            })
            .catch(function (err) {
                console.log(err);
                $scope.loading = false;
            });
        }
        else {
            $scope.mode = 0; //bad mode
            return;
        }
        
        $scope.matrixModel = new ucdatamodel.MatrixModel();
        var initModel = function () {
            $scope.matrixModel.init($scope.activity ? {
                name: $scope.activity.name,
                intro: $scope.activity.intro,
                startsOn: moment($scope.activity.startsOn).format(constants.dateTimeFormat),
                endsOn: moment($scope.activity.endsOn).format(constants.dateTimeFormat),
                capacity: $scope.activity.capacity,
                price: $scope.activity.price,
                picUrl: $scope.activity.picUrl,
                tags: $scope.activity.tags
            } : {
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
                if ($scope.activity) {
                    $scope.updating = true;
                    activity.update({ id: $scope.activity.id, data: $scope.matrixModel.toPOJO() })
                    .then(function (data) {
                        $state.gox(ucconst.states.actdetail, { actId: $scope.activity.id });
                        $scope.updating = false;
                    })
                    .catch(function (err) {
                        $scope.updating = false;
                    });
                }
                else {
                    $scope.adding = true;
                    activity.create({ siteId: ctx.siteId, data: $scope.matrixModel.toPOJO() })
                    .then(function (data) {
                        if (data.id)
                            $state.gox(ucconst.states.actdetail, { actId: data.id });
                        else
                            $state.gox(ucconst.states.activities);
                        $scope.adding = false;
                    })
                    .catch(function (err) {
                        $scope.adding = false;
                    });
                }
            }
        };
    }]);
})();