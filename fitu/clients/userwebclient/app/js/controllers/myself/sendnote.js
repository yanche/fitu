(function () {
    angular.module('fitu')
    .controller('sendnote', ['$scope', '$location', 'member', 'pagination', 'activity', 'ucdatamodel', 'note', function ($scope, $location, member, pagination, activity, ucdatamodel, note) {
        var ctx = $location.search();
        
        if (ctx.actId || ctx.recipientId) {
            x = $scope.sendNoteModel = new ucdatamodel.SendNoteModel();
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
                $scope.sendNoteModel.init({ subject: '', content: '', emphasis: false });
            };
            $scope.resetNote();
        }
        else {
            $scope.badState = true;
        }
    }]);
})();