(function () {
    angular.module('fitulib')
    .factory('markdown', [function () {
        return {
            toHTML: markdown.toHTML
        };
    }]);
})();