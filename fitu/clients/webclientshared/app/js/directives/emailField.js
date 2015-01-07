(function () {
    angular.module('fitulib')
    .directive('emailField', ['validate', function (validate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var optional = (element.attr('optional') != null);
                var judge = function () {
                    if (validate.email(element.val(), optional))
                        element.parent('div').removeClass('has-error');
                    else
                        element.parent('div').addClass('has-error');
                };
                
                element.on('focusout', judge);
            }
        };
    }]);
})();