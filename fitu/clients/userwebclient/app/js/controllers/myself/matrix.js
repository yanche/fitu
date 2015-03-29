(function () {
    angular.module('fitu')
    .controller('matrix', ['$scope', '$state', 'site', '$location', 'ucconst', 'validate', '$rootScope', 'ucdatamodel', 'const', 'activity', 'lang', '$filter', function ($scope, $state, site, $location, ucconst, validate, $rootScope, ucdatamodel, constants, activity, lang, $filter) {
        var picUrlFilter = $filter('picUrl');
        $rootScope.pageTitle = lang.MATRIX_TITLE;
        var ctx = $location.search();
        if (ctx.actId) {
            $scope.mode = 1; //update mode
            activity.getOne(ctx.actId)
            .then(function (data) {
                $scope.activity = data;
                return site.getOne({ id: $scope.activity.site.id });
            })
            .then(function (data) {
                $scope.site = data;
                $scope.initModel();
                $scope.loading = false;
            })
            .catch(function (err) {
                console.log(err);
                $scope.loading = false;
            });
            $scope.loading = true;
        }
        else if (ctx.siteId) {
            $scope.mode = 2; //creation mode
            site.getOne({ id: ctx.siteId })
            .then(function (data) {
                $scope.site = data;
                $scope.initModel();
                $scope.loading = false;
            })
            .catch(function (err) {
                console.log(err);
                $scope.loading = false;
            });
            $scope.loading = true;

            activity.getList({ page: 0, pageSize: 3, lead: 1, siteId: ctx.siteId })
            .then(function (last) {
                $scope.siblings = last.list.slice(0, 3);
                $scope.loadingSiblings = false;
            })
            .catch(function (err) {
                $scope.loadingSiblings = false;
            });
            $scope.loadingSiblings = true;
        }
        else {
            $scope.mode = 0; //bad mode
            return;
        }
        
        $scope.matrixModel = new ucdatamodel.MatrixModel();
        $scope.initModel = function (sa) {
            if (!sa) {
                $scope.matrixModel.init($scope.activity ? {
                    name: $scope.activity.name,
                    intro: $scope.activity.intro,
                    startsOn: moment($scope.activity.startsOn).format(constants.dateTimeFormat),
                    endsOn: moment($scope.activity.endsOn).format(constants.dateTimeFormat),
                    capacity: $scope.activity.capacity,
                    price: $scope.activity.price,
                    picUrl: picUrlFilter($scope.activity.picUrl),
                    tags: $scope.activity.tags,
                    bar: $scope.activity.bar
                } : {
                    name: '',
                    intro: '',
                    startsOn: moment().add({ days: 3 }).hour(16).minute(0).format(constants.dateTimeFormat),
                    endsOn: moment().add({ days: 3 }).hour(17).minute(0).format(constants.dateTimeFormat),
                    capacity: 5,
                    price: $scope.site.prices.length > 0 ? $scope.site.prices[0].amount : 50,
                    picUrl: picUrlFilter($scope.site.picUrl),
                    tags: $scope.site.tags,
                    bar: ''
                });
                $scope.sibInUse = null;
            }
            else {
                var ms = moment(sa.startsOn), me = moment(sa.endsOn);
                $scope.matrixModel.init({
                    name: sa.name,
                    intro: sa.intro,
                    startsOn: moment().add({ days: 3 }).hour(ms.hour()).minute(ms.minute()).format(constants.dateTimeFormat),
                    endsOn: moment().add({ days: 3 }).hour(me.hour()).minute(me.minute()).format(constants.dateTimeFormat),
                    capacity: sa.capacity,
                    price: sa.price,
                    picUrl: picUrlFilter(sa.picUrl),
                    tags: sa.tags,
                    bar: sa.bar
                });
                $scope.sibInUse = sa;
            }
            $scope.candidateActTags = constants.tags.filter(function (t) { return $scope.site.tags.some(function (tg) { return tg == t.key; }) });
        };
        
        $scope.submit = function () {
            if ($scope.matrixModel.validate()) {
                if ($scope.activity) {
                    activity.update({ id: $scope.activity.id, data: $scope.matrixModel.toLO() })
                    .then(function (data) {
                        $state.gox(ucconst.states.actdetail, { actId: $scope.activity.id });
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.MATRIX_MSG_UPDATED });
                        $scope.updating = false;
                    })
                    .catch(function (err) {
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.MATRIX_MSG_ERR_UPDATE_UNKNOWN });
                        $scope.updating = false;
                    });
                    $scope.updating = true;
                }
                else {
                    activity.create({ siteId: ctx.siteId, data: $scope.matrixModel.toLO() })
                    .then(function (data) {
                        if (data.id)
                            $state.gox(ucconst.states.actdetail, { actId: data.id });
                        else
                            $state.gox(ucconst.states.activities);
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.MATRIX_MSG_CREATED });
                        $scope.adding = false;
                    })
                    .catch(function (err) {
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.MATRIX_MSG_ERR_CREATION_UNKNOWN });
                        $scope.adding = false;
                    });
                    $scope.adding = true;
                }
            }
        };
    }]);
})();