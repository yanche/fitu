(function () {
    angular.module('fitulib')
    .directive('preview', [function () {
        return {
            'restrict': 'E',
            'templateUrl': '/app/html/directives/preview.html',
            'replace': true,
            'scope': {
                'title': '=title',
                'imgsrc': '=imgsrc',
                'subtitle': '=subtitle',
                'content': '=content'
            }
        };
    }]);
})();