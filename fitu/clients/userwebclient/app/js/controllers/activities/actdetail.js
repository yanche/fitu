(function () {
    angular.module('fitu')
    .controller('actdetail', ['$scope', '$location', '$state', 'activity', 'member', 'ucconst', 'geo', 'pagination', 'message', 'validate', '$rootScope', function ($scope, $location, $state, activity, member, ucconst, geo, pagination, message, validate, $rootScope) {
        var ctx = $location.search();
        $scope.loading = true;
        activity.getOne(ctx.actId)
        .then(function (data) {
            $scope.activity = data;
            $scope.loading = false;
        })
        .catch(function (err) {
            console.log(err);
            $scope.loading = false;
        });
        
        member.getList({ actId: ctx.actId, preview: 0, page: 0, pageSize: 6 })
        .then(function (data) {
            $scope.memCount = data.total;
            $scope.members = data.list;
        })
        .catch(function (err) {
        });
        
        $scope.goLocation = function () {
            $state.gox(ucconst.states.actlocation, { actId: ctx.actId });
        };
        
        $scope.goSignup = function () {
            $state.gox(ucconst.states.signup, { actId: ctx.actId });
        };
        
        $scope.goUserPreview = function (user) {
            $state.gox(ucconst.states.userpreview, { userId: user.id });
        };
        
        /*
        $scope.gettingUserPos = true;
        geo.getLocation()
        .then(function (position) {
            $scope.userPos = { lat: position.coords.latitude, lng: position.coords.longitude };
            $scope.gettingUserPos = false;
        })
        .catch(function (err) {
            $scope.userPos = null;
            $scope.gettingUserPos = false;
        });*/
        $scope.newMessage = '';
        $scope.sendNewActMessage = function () {
            if (validate.valuedString($scope.newMessage) && $rootScope.user) {
                activity.createMessage({ id: ctx.actId, message: $scope.newMessage, replyToId: $scope.replyToMsg ? $scope.replyToMsg.id : null })
                .then(function () {
                    pageStore.refresh();
                    $scope.switchMsgPage(0); //first page
                    $scope.newMessage = '';
                })
                .catch(function (err) {
                });
            }
        };
        
        $scope.likeMessage = function (msg) {
            if ($rootScope.user) {
                message.likeMessage({ id: msg.id, like: !Boolean(msg.like.me) })
                .then(function () {
                    if (msg.like.me) {
                        msg.like.me = false;
                        msg.like.count--;
                    }
                    else {
                        msg.like.me = true;
                        msg.like.count++;
                    }
                })
                .catch(function (err) {
                });
            }
        };
        
        $scope.replyToClick = function (msg) {
            $scope.replyToMsg = msg;
        };
        
        var messagePageSize = 5;
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return activity.getMessages({ page: page, pageSize: pageSize, id: ctx.actId });
        });
        
        $scope.msgVisibles = [];
        $scope.loadingMsg = false;
        $scope.currentMsgPage = 0;
        //caution!! multi-request
        $scope.switchMsgPage = function (page) {
            $scope.loadingMsg = true;
            pageStore.navigate(page, messagePageSize)
            .then(function (list) {
                $scope.loadingMsg = false;
                $scope.msgVisibles = list;
                $scope.currentMsgPage = page;
            })
            .catch(function (err) {
                $scope.loadingMsg = false;
                console.log(err);
            });
        };
        $scope.switchMsgPage(0);
        
        $scope.getMsgPageNavs = function () {
            return pageStore.getPageNavs(messagePageSize, 3, $scope.currentMsgPage);
        };
    }]);
})();