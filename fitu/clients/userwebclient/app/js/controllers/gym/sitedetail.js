(function () {
    angular.module('fitu')
    .controller('sitedetail', ['$scope', '$state', 'site', '$location', 'ucconst', 'pagination', 'validate', '$rootScope', 'message', 'sitefan', function ($scope, $state, site, $location, ucconst, pagination, validate, $rootScope, message, sitefan) {
        var ctx = $location.search();
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
            var loadFanRel = function () {
                $scope.loadingFanRel = true;
                sitefan.relationship({ siteId: ctx.siteId })
                .then(function (data) {
                    $scope.fanRelationship = data;
                    $scope.loadingFanRel = false;
                })
                .catch(function (err) {
                    $scope.loadingFanRel = false;
                });
            };
            loadFanRel();
            
            $scope.fan = function () {
                $scope.fanning = true;
                sitefan.fan({ siteId: ctx.siteId })
                .then(function () {
                    $scope.fanning = false;
                    $scope.site.fansCount++;
                    $rootScope.user.subscribe.sitesCount++;
                    loadFanRel();
                })
                .catch(function (err) {
                    $scope.fanning = false;
                });
            };
            
            $scope.noFan = function () {
                $scope.nofanning = true;
                sitefan.noFan({ siteId: ctx.siteId })
                .then(function () {
                    $scope.nofanning = false;
                    $scope.site.fansCount--;
                    $rootScope.user.subscribe.sitesCount--;
                    loadFanRel();
                })
                .catch(function (err) {
                    $scope.nofanning = false;
                });
            };
        }
        
        $scope.newMessage = '';
        $scope.sendNewSiteMessage = function () {
            if (validate.valuedString($scope.newMessage) && $rootScope.user) {
                $scope.sendingMsg = true;
                site.createMessage({ id: ctx.siteId, message: $scope.newMessage, replyToId: $scope.replyToMsg ? $scope.replyToMsg.id : null })
                .then(function () {
                    pageStore.refresh();
                    $scope.switchMsgPage(0); //first page
                    $scope.newMessage = '';
                    $scope.sendingMsg = false;
                })
                .catch(function (err) {
                    $scope.sendingMsg = false;
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
            return site.getMessages({ page: page, pageSize: pageSize, id: ctx.siteId });
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