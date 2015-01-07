(function () {
    angular.module('fitulib')
    .filter('tag', ['const', function (constants) {
        return function (key) {
            var tag = constants.tags.filter(function (t) { return t.key == key; });
            if (tag.length > 0)
                return tag[0].value;
            else
                return '';
        };
    }]);
})();