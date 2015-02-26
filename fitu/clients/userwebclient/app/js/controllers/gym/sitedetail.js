(function () {
    angular.module('fitu')
    .controller('sitedetail', ['$scope', '$state', 'site', '$location', 'ucconst', 'pagestore', 'validate', '$rootScope', 'message', 'sitefan', 'ucdatamodel', 'lang', function ($scope, $state, site, $location, ucconst, pagestore, validate, $rootScope, message, sitefan, ucdatamodel, lang) {
        var ctx = $location.search();
        if (!ctx.siteId)
            return;

        $scope.loading = true;
        site.getOne({ id: ctx.siteId })
        .then(function (data) {
            $scope.site = data;
            $scope.loading = false;
        }, function (err) {
            console.log(err);
            $scope.loading = false;
        });
        
        if ($rootScope.user) {
            $scope.loadingFanRel = true;
            sitefan.relationship({ siteId: ctx.siteId })
            .then(function (data) {
                $scope.fanRelationship = data;
                $scope.loadingFanRel = false;
            })
            .catch(function (err) {
                $scope.loadingFanRel = false;
            });
            
            $scope.fanning = false;
            $scope.fan = function () {
                if (!$scope.fanning) {
                    $scope.fanning = true;
                    sitefan.fan({ siteId: ctx.siteId })
                    .then(function () {
                        $scope.fanning = false;
                        $scope.site.fansCount++;
                        $rootScope.user.subscribe.sitesCount++;
                        $scope.fanRelationship = { subscribe: true };
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.SITEDETAIL_MSG_SUCCESS_FAN });
                    })
                    .catch(function (err) {
                        $scope.fanning = false;
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.SITEDETAIL_MSG_ERR_FAN_UNKNOWN });
                    });
                }
            };

            $scope.nofanning = false;
            $scope.noFan = function () {
                if (!$scope.nofanning) {
                    $scope.nofanning = true;
                    sitefan.noFan({ siteId: ctx.siteId })
                    .then(function () {
                        $scope.nofanning = false;
                        $scope.site.fansCount--;
                        $rootScope.user.subscribe.sitesCount--;
                        $scope.fanRelationship = { subscribe: false };
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.SITEDETAIL_MSG_SUCCESS_NOFAN });
                    })
                    .catch(function (err) {
                        $scope.nofanning = false;
                        $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.SITEDETAIL_MSG_ERR_NOFAN_UNKNOWN });
                    });
                };
            }
        }
        
        $scope.sendNewSiteMessage = function () {
            if ($scope.msgModel.validate() && $rootScope.user) {
                $scope.sendingMsg = true;
                site.createMessage({ id: ctx.siteId, message: $scope.msgModel.toPOJO().msg, replyToId: $scope.replyToMsg ? $scope.replyToMsg.id : null })
                .then(function () {
                    pageDL.refresh();
                    if ($scope.currentMsgPage == 1)
                        loadPage(1);
                    else
                        $scope.currentMsgPage = 1; //first page
                    $scope.totalMsgPages = 0;
                    $scope.resetMsgModel();
                    $scope.sendingMsg = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.success, msg: lang.SITEDETAIL_MSG_SUCCESS_NEWMSG });
                })
                .catch(function (err) {
                    $scope.sendingMsg = false;
                    $scope.$emit(ucconst.events.showMsg, { msgType: ucconst.msgType.error, msg: lang.SITEDETAIL_MSG_ERR_NEWMSG_UNKNOWN });
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
            return site.getMessages({ page: page, pageSize: msgPageSize, id: ctx.siteId });
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