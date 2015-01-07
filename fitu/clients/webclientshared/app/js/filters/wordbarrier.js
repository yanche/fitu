(function () {
    angular.module('fitulib')
    .filter('wordbarrier', ['validate', function (validate) {
        return function (input, limit) {
            if (!validate.isString(input))
                return input;
            var limit = Number(limit);
            if (isNaN(limit))
                return input;
            if (limit < 0)
                limit = 0;
            //input should be string
            if (input.length <= limit)
                return input;
            else
                return input.slice(0, limit - 3) + '...';
        };
    }]);
})();