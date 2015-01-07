(function () {
    angular.module('fitulib')
    .directive('requiredField', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var optional = (element.attr('optional') != null);
                var judge = function () {
                    if (element.val().length > 0)
                        element.parent('div').removeClass('has-error');
                    else
                        element.parent('div').addClass('has-error');
                };
                
                element.on('focusout', judge);
            }
        };
    }]);
})();