﻿(function () {
    angular.module('fitu')
    .controller('noteinbox', ['$scope', 'note', 'pagination', '$state', 'ucconst', function ($scope, note, pagination, $state, ucconst) {
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return note.getMyNotes_IN({ page: page, pageSize: pageSize });
        });
        
        var pageSize = 10;
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
                console.log(err);
            });
        };
        $scope.switchPage(0);
        
        $scope.getPageNavs = function () {
            return pageStore.getPageNavs(pageSize, 3, $scope.currentPage);
        };

        $scope.replyNote = function (nt, evt) {
            $state.gox(ucconst.states.sendnote, { recipientId: nt.author.id, re: 'RE:' + nt.subject });
            evt.stopPropagation();
        };
    }]);
})();