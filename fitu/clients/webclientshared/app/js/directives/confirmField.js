(function () {
    angular.module('fitulib')
    .directive('confirmField', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var modelGet = $parse(attrs.confirm);
                var optional = (element.attr('optional') != null);
                var judge = function () {
                    if (element.val() == modelGet(scope) || (optional && element.val().length == 0))
                        element.parent('div').removeClass('has-error');
                    else
                        element.parent('div').addClass('has-error');
                };
                
                element.on('focusout', judge);
            }
        };
    }]);
})();