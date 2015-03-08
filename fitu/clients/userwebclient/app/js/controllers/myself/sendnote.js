(function () {
    angular.module('fitu')
    .controller('sendnote', ['$scope', '$location', 'member', 'pagination', 'activity', 'ucdatamodel', 'note', 'user', 'ucconst', 'lang', '$rootScope', function ($scope, $location, member, pagination, activity, ucdatamodel, note, user, ucconst, lang, $rootScope) {
        $rootScope.pageTitle = lang.SENDNOTE_TITLE;
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
                    note.sendNote({ actId: ctx.actId, recipientId: ctx.recipientId, data: $scope.sendNoteModel.toLO() })
                    .then(function () {
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.SENDNOTE_MSG_SUCCESS_SEND });
                        $scope.sending = false;
                        $scope.resetNote();
                    })
                    .catch(function (err) {
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.SENDNOTE_MSG_ERR_SEND });
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