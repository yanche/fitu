(function () {
    angular.module('fitulib')
    .factory('validate', [function () {
        var emailRegex = new RegExp('^(\\w)+(\\.\\w+)*@(\\w)+((\\.\\w+)+)$');
        var phoneRegex = new RegExp('^[0-9]{11}$');
        var hashRegex = new RegExp('^[a-fA-F0-9]{32}$');
        var dateRegex = new RegExp('^[0-9]{1,4}/(((0?[1-9]|1[0-2])/(0?[1-9]|[12][0-9]))|((0?[13-9]|1[0-2])/30)|((0?[13578]|1[02])/31))$');
        var numletterReg = new RegExp('^[a-zA-Z0-9]+$');
        
        var isString = function (str) {
            return (typeof str) === 'string' || (str instanceof String);
        };
        var isNullOrEmpty = function (input) {
            return input == '' || input == null;
        };
        return {
            isString: isString,
            nullOrEmpty: isNullOrEmpty,
            email: function (input, optional) {
                return emailRegex.test(input) || (optional && isNullOrEmpty(input));
            },
            phone: function (input, optional) {
                return phoneRegex.test(input) || (optional && isNullOrEmpty(input));
            },
            gender: function (input, optional) {
                return input == '男' || input == '女' || (optional && isNullOrEmpty(input));
            },
            password: function (input, optional) {
                return (isString(input) && input.length >= 6) || (optional && isNullOrEmpty(input));
            },
            valuedString: function (input, optional) {
                return (isString(input) && input.trim().length > 0) || (optional && isNullOrEmpty(input));
            },
            positiveInteger: function (input, optional) {
                if (optional && isNullOrEmpty(input))
                    return true;
                else if (isNullOrEmpty(input))
                    return false;
                else {
                    var num = Number(input);
                    return !isNaN(num) && num > 0 && Math.ceil(num) == num;
                }
            },
            positiveFloat: function (input, optional) {
                if (optional && isNullOrEmpty(input))
                    return true;
                else if (isNullOrEmpty(input))
                    return false;
                else {
                    var num = Number(input);
                    return !isNaN(num) && num > 0;
                }
            },
            nonNegFloat: function (input, optional) {
                if (optional && isNullOrEmpty(input))
                    return true;
                else if (isNullOrEmpty(input))
                    return false;
                else {
                    var num = Number(input);
                    return !isNaN(num) && num >= 0;
                }
            },
            nonEmptyArray: function (input) {
                return Array.isArray(input) && input.length > 0;
            },
            picBase64: function (input, optional) {
                return (isString(input) && input.indexOf('data:image') === 0) || (optional && isNullOrEmpty(input));
            },
            url: function (input, optional) {
                //TODO:
                return isString(input) || (optional && isNullOrEmpty(input));
            },
            nickName: function (input, optional) {
                return (isString(input) && input.length >= 1 && input[0] != ' ' && input[input.length - 1] != ' ') || (optional && isNullOrEmpty(input));
            },
            alwaysTrue: function () {
                return true;
            },
            alwaysFalse: function () {
                return false;
            },
            datetime: function (input, optional) {
                return (input && !isNaN(new Date(input).getTime())) || (optional && isNullOrEmpty(input));
            },
            //latitude
            lat: function (lat) {
                var lat = Number(lat);
                return !isNaN(lat) && lat >= 30 && lat <= 32;
            },
            //longtitude
            lng: function (lng) {
                var lng = Number(lng);
                return !isNaN(lng) && lng >= 120 && lng <= 122;
            }
        };
    }]);
})();