(function () {
    angular.module('fitulib')
    .animation('._slide_down', [function () {
        return {
            addClass: function (element, className, done) {
                element.slideDown();
            },
            removeClass: function (element, className, done) {
                element.slideUp();
            }
        };
    }]);
})();