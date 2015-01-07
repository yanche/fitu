(function () {
    angular.module('fituvd')
    .controller('admins', ['$location', '$scope', 'vendor', 'pagination', 'messenger', '$rootScope', function ($location, $scope, vendor, pagination, messenger, $rootScope) {
        var ctx = $location.search();
        if (ctx.vendorId) {
            var pageStore = new pagination.PageStore([]);
            
            var pageSize = 5;
            $scope.visibles = [];
            $scope.loading = false;
            $scope.currentPage = 0;
            //caution!! multi-request
            $scope.switchPage = function (page) {
                $scope.loading = true;
                pageStore.navigate(page, pageSize)
                .then(function (list) {
                    $scope.loading = false;
                    $scope.visibles = list;
                    $scope.currentPage = page;
                })
                .catch(function (err) {
                    $scope.loading = false;
                    $scope.visibles = [];
                    $scope.currentPage = page;
                    console.log(err);
                });
            };
            
            $scope.getPageNavs = function () {
                return pageStore.getPageNavs(pageSize, 5, $scope.currentPage);
            };
            
            var load = function () {
                $scope.loading = true;
                vendor.getOne({ id: ctx.vendorId })
                .then(function (vd) {
                    $scope.loading = false;
                    pageStore.refresh(vd.admins);
                    $scope.switchPage(0);
                    $scope.admins = vd.admins;
                })
                .catch(function (err) {
                    console.log(err);
                    $scope.loading = false;
                });
            };
            load();
            
            $scope.adding = false;
            $scope.addAdmin = function () {
                if ($scope.selectedUser) {
                    var admins = $scope.admins.map(function (admin) { return admin.id; });
                    if (admins.every(function (id) { return id != $scope.selectedUser.id; })) {
                        $scope.adding = true;
                        admins.push($scope.selectedUser.id);
                        vendor.update({ id: ctx.vendorId, data: { admins: admins } })
                        .then(function () {
                            load();
                            messenger.show($rootScope.vcconst.messenger, 'success', $rootScope.lang.ADMINS_MSG_ADDSUCCESS, 5000);
                            $scope.searchWords = null;
                            $scope.adding = false;
                        })
                        .catch(function (err) {
                            //TODO: move
                            messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.ADMINS_MSG_ADDFAILED, 5000);
                            console.log(err);
                            $scope.adding = false;
                        });
                    }
                }
            };
            
            $scope.removeAdmin = function (admin) {
                var leftAdmins = $scope.admins.filter(function (ad) { return admin != ad; }).map(function (ad) { return ad.id; });
                vendor.update({ id: ctx.vendorId, data: { admins: leftAdmins } })
                .then(function () {
                    load();
                    messenger.show($rootScope.vcconst.messenger, 'success', $rootScope.lang.ADMINS_MSG_REMOVESUCCESS, 5000);
                })
                .catch(function (err) {
                    //TODO: move
                    messenger.show($rootScope.vcconst.messenger, 'error', $rootScope.lang.ADMINS_MSG_REMOVEFAILED, 5000);
                    console.log(err);
                });
            };
        }
    }]);
})();