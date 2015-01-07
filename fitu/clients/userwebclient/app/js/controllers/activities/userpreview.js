(function () {
    angular.module('fitu')
    .controller('userpreview', ['$scope', 'user', '$location', 'ucconst', '$state', function ($scope, user, $location, ucconst, $state) {
        var ctx = $location.search();
        if (ctx.userId) {
            user.getPreview(ctx.userId)
            .then(function (data) {
                $scope.userpublic = data;
            })
            .catch(function (err) { });
            
            $scope.goSendNote = function () {
                $state.gox(ucconst.states.sendnote, { recipientId: $scope.userpublic.id });
            };
        }
    }]);
})();