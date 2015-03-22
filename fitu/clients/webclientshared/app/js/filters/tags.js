(function () {
    angular.module('fitulib')
    .filter('tags', ['const', function (constants) {
        return function (input) {
            if (Array.isArray(input)) {
                var ret = [];
                input.forEach(function (i) {
                    var match = constants.tags.filter(function (t) { return t.key === i; });
                    if (match.length > 0)
                        ret.push(match[0].value);
                });
                return ret.join(', ');
            }
            else
                return '';
        };
    }]);
})();