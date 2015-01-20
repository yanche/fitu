(function () {
    angular.module('fitulib')
    .directive('sysnote', ['const', 'markdown', function (constants, markdown) {
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
            restrict: 'E',
            templateUrl: '/app/html/directives/sysnote.html',
            replace: true,
            scope: {
                note: '='
            },
            link: function (scope, element, attrs) {
                var sj = element.find('._noteSys_subject'), bd = element.find('._noteSys_body');
                var subjectHandler = handlers[scope.note.subject.type];
                var bodyHandler = handlers[scope.note.body.type];
                if (subjectHandler)
                    subjectHandler(sj, scope.note.subject.content);
                if (bodyHandler)
                    bodyHandler(bd, scope.note.body.content);
            }
        };
    }]);
})();