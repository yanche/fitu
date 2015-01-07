(function () {
    angular.module('fitulib')
    .factory('messenger', [function () {
        var host = {};
        return {
            register: function (name, fn) {
                host[name] = fn;
            },
            show: function (name, type, word, duration) {
                var tar = host[name];
                if (tar)
                    tar(type, word, duration);
                else
                    console.log('messenger host: ' + name + ' not found');
            }
        };
    }]);
})();