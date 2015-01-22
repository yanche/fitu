/*(function () {
    angular.module('fitulib')
    .filter('memberStatus', ['const', function (constants) {
        return function (input) {
            switch (input) {
                case constants.status.member.queued:
                    return '等待';
                case constants.status.member.inTeam:
                    return '入队';
                case constants.status.member.quit:
                    return '退出';
                default:
                    return '未知';
            }
        };
    }]);
})();*/