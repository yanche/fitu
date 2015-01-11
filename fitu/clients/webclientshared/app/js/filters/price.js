(function () {
    angular.module('fitulib')
    .filter('price', ['const', function (constants) {
        //{amount:, freq: {num:, measure: }, people:, comments: }
        return function (input) {
            var m = constants.priceMeasure.filter(function (m) { return m.key == input.freq.measure; })[0]
            var measure = (input.freq.num == 1 ? '' : input.freq.num) + (m ? m.value : '');
            var people = (input.people == 1 ? '' : input.people) + '人';
            return input.amount + '/' + people + ',' + measure;
        };
    }]);
})();