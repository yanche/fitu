(function () {
    angular.module('fitulib')
    .directive('sysnote', ['const', function (constants) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/sysnote.html',
            replace: true,
            scope: {
                note: '='
            },
            link: function (scope, element, attrs) {
                var sj = element.find('._noteSys_subject'), bd = element.find('._noteSys_body');
                if (scope.note.subject.type == constants.noteContentTypes.html)
                    sj.html(scope.note.subject.content);
                else
                    sj.text(scope.note.subject.content);
                if (scope.note.body.type == constants.noteContentTypes.html)
                    bd.html(scope.note.body.content);
                else
                    bd.text(scope.note.body.content);
            }
        };
    }]);
})();