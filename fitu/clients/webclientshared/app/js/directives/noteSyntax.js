(function () {
    angular.module('fitulib')
    .directive('noteSyntax', ['const', 'markdown', function (constants, markdown) {
        var handlers = {
            html: function (element, content) {
                element.html(content);
            },
            plain: function (element, content) {
                element.text(content);
            },
            markdown: function (element, content) {
                element.html(markdown.toHTML(content));
            }
        };
            
        return {
            restrict: 'A',
            scope: {
                target: '='
            },
            link: function (scope, element, attrs) {
                var h = handlers[scope.target.type];
                if (h)
                    h(element, scope.target.content);
            }
        };
    }]);
})();