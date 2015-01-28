(function () {
    angular.module('fitu')
    .controller('main', ['$scope', '$window', 'ucconst', '$timeout', function ($scope, $window, ucconst, $timeout) {
        $scope.goBack = function () {
            $window.history.back();
        };
        
        $scope.goAhead = function () {
            $window.history.forward();
        };
        
        $scope.msgType = ucconst.msgType.none;
        $scope.lastMsgTS = null;
        $scope.$on(ucconst.events.showMsg, function (evt, options) {
            $scope.msgType = options.msgType;
            $scope.confirmDialog = Boolean(options.onConfirm);
            $scope.msg = options.msg;
            $scope.showMsg = true;
            $scope.cancelFn = options.onCancel;
            $scope.confirmFn = options.onConfirm;
                
            var ts = new Date().getTime();
            $scope.lastMsgTS = ts;
            $timeout(function () {
                if (ts == $scope.lastMsgTS)
                    $scope.cancelMsg();
            }, 5000);
        });
        
        $scope.cancelMsg = function () {
            $scope.showMsg = false;
            $scope.lastMsgTS = null;
            if ($scope.cancelFn)
                $timeout($scope.cancelFn);
        };
        
        $scope.confirmMsg = function () {
            $scope.showMsg = false;
            $scope.lastMsgTS = null;
            if ($scope.confirmFn)
                $timeout($scope.confirmFn);
        };
        
        $scope.checkSth = function () {/*
        console.log('check sth');
        wx.checkJsApi({
            jsApiList: ['startRecord'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res) {
                alert('checkSth success');
                alert(JSON.stringify(arguments));
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });*/
            
        /*
        wx.onMenuShareAppMessage({
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            link: 'www.baidu.com', // 分享链接
            imgUrl: 'http://static.1dong.me:9000/app/image/webclientshared/sitepic.jpg', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                alert('onMenuShareAppMessage success');
                alert(JSON.stringify(arguments));
            },
            cancel: function () {
                alert('onMenuShareAppMessage cancel');
                alert(JSON.stringify(arguments));
            }
        });*/
            };
            
            $scope.checkSth2 = function () {
        /*
        console.log('check sth2');
        wx.startRecord({
            success: function (res) {
                alert('checkSth2 success');
                alert(JSON.stringify(arguments));
            }
        });*/
        };
    }]);
})();