(function () {
    angular.module('fitu')
    .controller('activities', ['$scope', '$rootScope', '$state', 'activity', 'ucconst', 'pagination', '$location', function ($scope, $rootScope, $state, activity, ucconst, pagination, $location) {
        var ctx = $location.search();
        
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return activity.getList({ page: page, pageSize: pageSize, tag: ctx.tag, siteId: ctx.siteId, vendorId: ctx.vendorId });
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
        
        $scope.goDetail = function (actId) {
            $state.gox(ucconst.states.actdetail, { actId: actId });
        };
        
        $scope.tag = ctx.tag;
        $scope.switchTag = function () {
            if ($scope.tag)
                $state.gox(ucconst.states.activities, { tag: $scope.tag });
            else
                $state.gox(ucconst.states.activities);
        };
        
        $scope.testWX = function () {
            wx.onMenuShareTimeline({
                title: 'title', // 分享标题
                link: 'http://www.belongscy.com', // 分享链接
                imgUrl: 'http://static.belongscy.com:9000/app/image/webclientshared/actpic.jpg', // 分享图标
                success: function () { 
                    console.log(arguments);
        // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    console.log(arguments);
        // 用户取消分享后执行的回调函数
                }
            });
        };
    }]);
})();