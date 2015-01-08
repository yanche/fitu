(function () {
    angular.module('fitu')
    .controller('userpreview', ['$scope', 'user', '$location', 'ucconst', '$state', function ($scope, user, $location, ucconst, $state) {
        var ctx = $location.search();
        if (ctx.userId) {
            $scope.loading = true;
            user.getPreview(ctx.userId)
            .then(function (data) {
                $scope.userpublic = data;
                $scope.loading = false;
            })
            .catch(function (err) {
                $scope.loading = false;
            });
            
            $scope.goSendNote = function () {
                $state.gox(ucconst.states.sendnote, { recipientId: $scope.userpublic.id });
            };
        }
    }]);
})();