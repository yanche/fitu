(function () {
    angular.module('fitulib')
    .filter('price', ['const', function (constants) {
        //{amount:, freq: {num:, measure: }, people:, comments: }
        return function (input) {
            var measure = (input.freq.num == 1 ? '' : input.freq.num) + constants.priceMeasure[input.freq.measure];
            var people = (input.people == 1 ? '' : input.people) + '人';
            return input.amount + '/' + people + ',' + measure;
        };
    }]);
})();