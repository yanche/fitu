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
        };
    }]);
})();