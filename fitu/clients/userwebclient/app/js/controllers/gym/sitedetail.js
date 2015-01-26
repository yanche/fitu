(function () {
    angular.module('fitu')
    .controller('sitedetail', ['$scope', '$state', 'site', '$location', 'ucconst', 'pagination', 'validate', '$rootScope', 'message', 'sitefan', 'ucdatamodel', function ($scope, $state, site, $location, ucconst, pagination, validate, $rootScope, message, sitefan, ucdatamodel) {
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
                    })
                    .catch(function (err) {
                        $scope.fanning = false;
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
                    })
                    .catch(function (err) {
                        $scope.nofanning = false;
                    });
                };
            }
        }
        
        $scope.sendNewSiteMessage = function () {
            if ($scope.msgModel.validate() && $rootScope.user) {
                $scope.sendingMsg = true;
                site.createMessage({ id: ctx.siteId, message: $scope.msgModel.toPOJO().msg, replyToId: $scope.replyToMsg ? $scope.replyToMsg.id : null })
                .then(function () {
                    pageStore.refresh();
                    $scope.switchMsgPage(0); //first page
                    $scope.resetMsgModel();
                    $scope.sendingMsg = false;
                })
                .catch(function (err) {
                    $scope.sendingMsg = false;
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
        
        var messagePageSize = 5;
        var pageStore = new pagination.PageStore(function (page, pageSize) {
            return site.getMessages({ page: page, pageSize: pageSize, id: ctx.siteId });
        });
        
        $scope.msgVisibles = [];
        $scope.loadingMsg = false;
        $scope.currentMsgPage = 0;
        //caution!! multi-request
        $scope.switchMsgPage = function (page) {
            $scope.loadingMsg = true;
            return pageStore.navigate(page, messagePageSize)
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
            
        $scope.refreshingMsgs = false;
        $scope.refreshMsgs = function () {
            $scope.refreshingMsgs = true;
            pageStore.refresh();
            $scope.switchMsgPage(0)
            .then(function () {
                $scope.refreshingMsgs = false;
            })
            .catch(function (err) {
                $scope.refreshingMsgs = false;
            });
        };
        
        $scope.getMsgPageNavs = function () {
            return pageStore.getPageNavs(messagePageSize, 3, $scope.currentMsgPage);
        };
    }]);
})();