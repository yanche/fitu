(function () {
    angular.module('fitu')
    .controller('userpreview', ['$scope', 'user', '$location', 'ucconst', '$state', 'userfan', '$rootScope', function ($scope, user, $location, ucconst, $state, userfan, $rootScope) {
        var ctx = $location.search();
        if (ctx.userId) {
            $scope.loading = true;
            user.getOnePreview(ctx.userId)
            .then(function (data) {
                $scope.userpublic = data;
                $scope.loading = false;
            })
            .catch(function (err) {
                $scope.loading = false;
            });
            
            if ($rootScope.user) {
                if ($rootScope.user.id != ctx.userId) {
                    var loadFanRel = function () {
                        $scope.loadingFanRel = true;
                        userfan.relationship({ userId: ctx.userId })
                        .then(function (data) {
                            $scope.fanRelationship = data;
                            $scope.loadingFanRel = false;
                        })
                        .catch(function (err) {
                            $scope.loadingFanRel = false;
                        });
                    };
                    loadFanRel();

                    $scope.fan = function () {
                        $scope.fanning = true;
                        userfan.fan({ userId: ctx.userId })
                        .then(function () {
                            $scope.fanning = false;
                            $scope.userpublic.fansCount++;
                            $rootScope.user.subscribe.usersCount++;
                            loadFanRel();
                        })
                        .catch(function (err) {
                            $scope.fanning = false;
                        });
                    };
                    
                    $scope.noFan = function () {
                        $scope.nofanning = true;
                        userfan.noFan({ userId: ctx.userId })
                        .then(function () {
                            $scope.nofanning = false;
                            $scope.userpublic.fansCount--;
                            $rootScope.user.subscribe.usersCount--;
                            loadFanRel();
                        })
                        .catch(function (err) {
                            $scope.nofanning = false;
                        });
                    };
                }
                else
                    $scope.selfView = true;
            }
            
            $scope.goSendNote = function () {
                $state.gox(ucconst.states.sendnote, { recipientId: $scope.userpublic.id });
            };
        }
    }]);
})();