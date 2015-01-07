(function () {
    angular.module('fitulib')
    .filter('datetime', ['const', function (constants) {
        return function (input, format) {
            if (format == 'expired') {
                return new Date(input).getTime < new Date().getTime() ? '已过期' : '';
            }
            
            return moment(input).format(format || constants.dateTimeFormat);
        };
    }]);
})();