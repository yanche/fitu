(function () {
    angular.module('fitu')
    .controller('actlead', ['$scope', '$location', 'member', 'pagestore', 'activity', '$state', 'ucconst', 'const', 'lang', function ($scope, $location, member, pagestore, activity, $state, ucconst, constants, lang) {
        var ctx = $location.search();
        if (ctx.actId) {
            $scope.loadingAct = true;
            activity.getOne(ctx.actId)
            .then(function (data) {
                $scope.activity = data;
                $scope.loadingAct = false;
            })
            .catch(function (err) {
                console.log(err);
                $scope.loadingAct = false;
            });
                
            var loadCensus = function () {
                $scope.loadingCensus = true;
                activity.getCensus(ctx.actId)
                .then(function (data) {
                    $scope.census = data;
                    $scope.loadingCensus = false;
                })
                .catch(function (err) {
                    console.log(err);
                    $scope.loadingCensus = false;
                });
            };
                
            loadCensus();
            
            var pageSize = 5;
            var membersLoadFn = function (page) {
                return member.getList({ actId: ctx.actId, page: page, pageSize: pageSize });
            };
            var pageDL = new pagestore.PageDataLoader(membersLoadFn);
            $scope.$watch('currentPage', function (newVal, oldVal) {
                if (newVal != null) {
                    $scope.visibles = null;
                    $scope.loadingMem = !pageDL.pageLoaded(newVal - 1);
                    pageDL.loadPage(newVal - 1)
                    .then(function (data) {
                        $scope.totalPages = Math.ceil(data.total / pageSize);
                        if ($scope.currentPage == newVal) {
                            $scope.visibles = data.list;
                            $scope.loadingMem = false;
                        }
                    });
                }
            });
            $scope.currentPage = 1;
            $scope.totalPages = 0;
            $scope.visibleCount = 3;

            $scope.doConfirm = function (mem) {
                member.updateStatus(mem.id, constants.memberStatus.confirmed)
                .then(function () {
                    mem.statusId = constants.memberStatus.confirmed;
                    loadCensus();
                })
                .catch(function (err) {
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.ACTLEAD_MSG_ERR_MEMBERSTATUS });
                });
            };
            
            $scope.doPending = function (mem) {
                member.updateStatus(mem.id, constants.memberStatus.pending)
                .then(function () {
                    mem.statusId = constants.memberStatus.pending;
                    loadCensus();
                })
                .catch(function (err) {
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.ACTLEAD_MSG_ERR_MEMBERSTATUS });
                });
            };

            $scope.cancelAct = function (act) {
                $scope.$emit(ucconst.events.showMsg, {
                    msgType: ucconst.msgType.warning,
                    msg: lang.ACTLEAD_MSG_ACTCANCEL_CONFIRM,
                    onConfirm: function () {
                        activity.delete(act.id)
                        .then(function () {
                            act.statusId = constants.actStatus.cancel;
                            $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.ACTLEAD_MSG_ACTCANCEL_SUCCESS });
                        })
                        .catch(function (err) {
                            $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.ACTLEAD_MSG_ACTCANCEL_FAIL });
                        });
                    }
                });
            };
        }
    }]);
})();