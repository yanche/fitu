(function () {
    angular.module('fitulib')
    .filter('gender', ['const', 'lang', function (constants, lang) {
        return function (input) {
            switch (input) {
                case constants.gender.male:
                    return lang.GLOBAL_LABEL_SEXMALE;
                case constants.gender.female:
                    return lang.GLOBAL_LABEL_SEXFEMALE;
                default:
                    return lang.GLOBAL_LABEL_SEXNON;
            }
        };
    }]);
})();