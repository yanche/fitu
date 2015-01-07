(function () {
    angular.module('fituvd')
    .controller('login', ['$scope', '$state', 'user', 'vendor', 'validate', '$rootScope', '$location', 'messenger', '$q', function ($scope, $state, user, vendor, validate, $rootScope, $location, messenger, $q) {
        var ctx = $location.search();
        
        $scope.logining = false;
        $scope.loading = false;
        
        var loadVendor = function () {
            $scope.loading = true;
            var pageSize = 10, page = 0;
            return vendor.getManagableVendors({ preview: true, page: page, pageSize: pageSize })
            .then(function (data) {
                if (data.total > 0 && data.total > data.list.length) {
                    var ret = data.list;
                    var promises = [], page = 1;
                    while (page * pageSize < data.total) {
                        promises.push(vendor.getManagableVendors({ preview: true, page: page, pageSize: pageSize }));
                        ++page;
                    }
                    return $q.all(promises)
                    .then(function (rests) {
                        rests.forEach(function (r) {
                            ret = ret.concat(r.list);
                        });
                        return { list: ret, total: data.total };
                    });
                }
                else
                    return data;
            })
            .then(function (data) {
                if (data.total > 0) {
                    $rootScope.vendors = data.list;
                    var retState = ctx.state || $rootScope.vcconst.states.profile;
                    delete ctx.state;
                    $state.gox(retState, ctx);
                }
                else {
                    messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.LOGIN_MSG_NOVENDOR, 5000);
                }
                $scope.loading = false;
            })
            .catch(function (err) {
                console.log('login/get vendors error: ' + err);
                $scope.loading = false;
            });
        };
        
        //try auto login
        if ($.cookie('sessionId')) {
            loadVendor();
        }
        
        $scope.login = function () {
            if (validate.email($scope.email) && validate.valuedString($scope.password)) {
                $scope.logining = true;
                user.login($scope.email.toLowerCase(), $.md5($scope.password))
                .then(function () {
                    $scope.logining = false;
                    return loadVendor();
                })
                .catch(function (err) {
                    messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.LOGIN_MSG_FAILED, 5000);
                    $scope.logining = false;
                });
            }
        };
    }]);
})();