(function () {
    angular.module('fitu')
    .factory('util', ['$state', 'ucconst', 'const', function ($state, ucconst, constants) {
        return {
            actCancel: function (act) {
                return act && act.statusId == constants.actStatus.cancel;
            },
            actActive: function (act) {
                return act && act.statusId == constants.actStatus.active && moment(act.startsOn) > moment();
            },
            actEnds: function (act) {
                return act && moment(act.endsOn) <= moment();
            },
            actStarts: function (act) {
                var now = moment();
                return act && moment(act.startsOn) <= now && moment(act.endsOn) > now;
            },
            actNonActiveStatus: function (act) {
                if (!act)
                    return '';
                if (act.statusId == constants.actStatus.cancel)
                    return '已取消';
                var s = moment(act.startsOn), e = moment(act.endsOn), now = moment();
                if (!s.isValid() || !e.isValid())
                    return '';
                else if (s > now)
                    return '';
                else if (e > now)
                    return '已开始';
                else
                    return '已结束';
            }
        };
    }]);
})();