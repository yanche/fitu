(function () {
    angular.module('fitulib')
    .filter('tag', ['const', function (constants) {
        return function (input) {
            var match = constants.tags.filter(function (t) { return t.key === input; });
            return match.length > 0 ? match[0].value : '';
        };
    }]);
})();