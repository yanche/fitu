(function () {
    angular.module('fitu')
    .controller('sendnote', ['$scope', '$location', 'member', 'pagination', 'activity', 'ucdatamodel', 'note', 'user', function ($scope, $location, member, pagination, activity, ucdatamodel, note, user) {
        var ctx = $location.search();
        
        if (ctx.actId || ctx.recipientId) {
            if (ctx.recipientId) {
                $scope.loading = true;
                user.getOnePreview(ctx.recipientId)
                .then(function (data) {
                    $scope.recipient = data;
                    $scope.loading = false;
                })
                .catch(function (err) {
                    $scope.loading = false;
                });
            }
            else {
                $scope.loading = true;
                activity.getOne(ctx.actId)
                .then(function (data) {
                    $scope.activity = data;
                    $scope.loading = false;
                })
                .catch(function (err) {
                    $scope.loading = false;
                });
            }

            $scope.sendNoteModel = new ucdatamodel.SendNoteModel();
            $scope.sendNote = function () {
                if ($scope.sendNoteModel.validate()) {
                    $scope.sending = true;
                    note.sendNote({ actId: ctx.actId, recipientId: ctx.recipientId, data: $scope.sendNoteModel.toPOJO() })
                    .then(function () {
                        $scope.sending = false;
                        $scope.resetNote();
                    })
                    .catch(function (err) {
                        $scope.sending = false;
                    });
                }
            };
            $scope.resetNote = function () {
                $scope.sendNoteModel.init({ subject: ctx.re || '', content: '', emphasis: false });
            };
            $scope.resetNote();
        }
        else {
            $scope.noReceiver = true;
        }
    }]);
})();