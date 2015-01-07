﻿(function () {
    angular.module('fitu')
    .controller('noteoutbox', ['$scope', 'note', 'pagination', function ($scope, note, pagination) {
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return note.getMyNotes_OUT({ page: page, pageSize: pageSize });
        });
        
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
                console.log(err);
            });
        };
        $scope.switchPage(0);
        
        $scope.getPageNavs = function () {
            return pageStore.getPageNavs(pageSize, 3, $scope.currentPage);
        };
    }]);
})();