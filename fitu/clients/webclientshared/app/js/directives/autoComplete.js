(function () {
    angular.module('fitulib')
    .directive('autoComplete', ['$parse', 'user', function ($parse, user) {
        return {
            restrict: 'E',
            template: '<input />',
            replace: true,
            link: function (scope, element, attrs) {
                var modelGet = $parse(attrs.selectBind);
                var modelSet = modelGet.assign;
                //jquery ui, autocomplete
                element.autocomplete({
                    source: function (req, res) {
                        var term = req.term.trim();
                        if (term.length === 0) {
                            res([]);
                        }
                        else {
                            user.queryUserContact(term)
                            .then(function (data) {
                                res(data.map(function (usercontact) { usercontact.label = [usercontact.personal.nickName, usercontact.personal.contact].join(','); return usercontact; }));
                            });
                        }
                    },
                    minLength: 1,
                    select: function (e, option) {
                        if (option.item) {
                            modelSet(scope, option.item);
                            return option.item.label;
                        }
                    }
                });
            }
        };
    }]);
})();