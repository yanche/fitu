(function () {
    angular.module('fitulib')
    .filter('siteopen', ['const', function (constants) {
        return function (input) {
            if (!input)
                return '';
            var d = new Date();
            d.setHours(input.hour);
            d.setMinutes(input.min);
            return d;
        };
    }]);
})();