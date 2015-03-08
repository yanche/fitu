(function () {
    angular.module('fitu')
    .controller('actdetail', ['$scope', '$location', '$state', 'activity', 'member', 'ucconst', 'geo', 'pagestore', 'message', 'validate', '$rootScope', 'const', 'ucdatamodel', 'lang', function ($scope, $location, $state, activity, member, ucconst, geo, pagestore, message, validate, $rootScope, constants, ucdatamodel, lang) {
        var ctx = $location.search();
        if (!ctx.actId)
            return;

        $scope.loading = true;
        activity.getOne(ctx.actId)
        .then(function (data) {
            $scope.activity = data;
            $scope.loading = false;
            $rootScope.pageTitle = lang.ACTDETAIL_TITLE + data.name;
        })
        .catch(function (err) {
            $scope.loading = false;
            $rootScope.pageTitle = lang.TITLE_DEFAULT;
        });
        
        member.getList({ actId: ctx.actId, preview: 1, page: 0, pageSize: 6, active: 1 })
        .then(function (data) {
            $scope.memCount = data.total;
            $scope.members = data.list;
        })
        .catch(function (err) {
        });
        
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
        $scope.sendNewActMessage = function () {
            if ($scope.msgModel.validate() && $rootScope.user) {
                $scope.sendingMsg = true;
                activity.createMessage({ id: ctx.actId, message: $scope.msgModel.toLO().msg, replyToId: $scope.replyToMsg ? $scope.replyToMsg.id : null })
                .then(function () {
                    pageDL.refresh();
                    if ($scope.currentMsgPage == 1)
                        loadPage(1);
                    else
                        $scope.currentMsgPage = 1; //first page
                    $scope.totalMsgPages = 0;
                    $scope.resetMsgModel();
                    $scope.sendingMsg = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.ACTDETAIL_MSG_SUCCESS_NEWMSG });
                })
                .catch(function (err) {
                    $scope.sendingMsg = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.ACTDETAIL_MSG_ERR_NEWMSG_UNKNOWN });
                });
            }
        };
        $scope.resetMsgModel = function () {
            $scope.msgModel.init({ msg: '' });
        };
        $scope.msgModel = new ucdatamodel.MsgModel();
        $scope.resetMsgModel();

        $scope.liking = false;
        $scope.likeMessage = function (msg) {
            if ($rootScope.user && !$scope.liking) {
                $scope.liking = true;
                var like = !Boolean(msg.like.me);
                message.likeMessage({ id: msg.id, like: like })
                .then(function () {
                    $scope.liking = false;
                    if (!like) {
                        msg.like.me = false;
                        msg.like.count--;
                    }
                    else {
                        msg.like.me = true;
                        msg.like.count++;
                    }
                })
                .catch(function (err) {
                    $scope.liking = false;
                });
            }
        };
        
        $scope.replyToClick = function (msg) {
            $scope.replyToMsg = msg;
        };
        
        var msgPageSize = 5;
        var msgsLoadFn = function (page) {
            return activity.getMessages({ page: page, pageSize: msgPageSize, id: ctx.actId });
        };
        var pageDL = new pagestore.PageDataLoader(msgsLoadFn);
        var loadPage = function (pg) {
            $scope.msgVisibles = null;
            $scope.loadingMsg = !pageDL.pageLoaded(pg - 1);
            pageDL.loadPage(pg - 1)
            .then(function (data) {
                $scope.totalMsgPages = Math.ceil(data.total / msgPageSize);
                $scope.refreshingMsgs = false;
                if ($scope.currentMsgPage == pg) {
                    $scope.msgVisibles = data.list;
                    $scope.loadingMsg = false;
                }
            })
            .catch(function (err) {
                if ($scope.currentMsgPage == pg) {
                    $scope.loadingMsg = false;
                }
            });
        };
        $scope.$watch('currentMsgPage', function (newVal, oldVal) {
            if (newVal != null) {
                loadPage(newVal);
            }
        });
        $scope.currentMsgPage = 1;
        $scope.totalMsgPages = 0;
        $scope.visibleMsgCount = 3;
        
        $scope.refreshingMsgs = false;
        $scope.refreshMsgs = function () {
            $scope.refreshingMsgs = true;
            pageDL.refresh();
            if ($scope.currentMsgPage == 1)
                loadPage(1);
            else
                $scope.currentMsgPage = 1;
            $scope.totalMsgPages = 0;
        };
    }]);
})();