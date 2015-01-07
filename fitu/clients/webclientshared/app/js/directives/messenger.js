(function () {
    angular.module('fitulib')
    .directive('messenger', ['messenger', '$timeout', function (messenger, $timeout) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/messenger.html',
            replace: true,
            link: function (scope, element, attrs) {
                if (attrs.name) {
                    var showMsg = function (type, words, duration) {
                        var msg = $('<div />').append($('<i/>').addClass('fa fa-times clickable remove').css('cursor', 'pointer').on('click', function () {
                            msg.remove();
                        }))
                        .append($('<span/>').text(words)).addClass('message').addClass(type);
                        msg.hover(function () {
                            if (deadLock) {
                                $timeout.cancel(deadLock);
                                deadLock = null;
                            }
                        }, function () {
                            deadLock = setTimeout();
                        });
                        msg.appendTo(element);
                        
                        var setTimeout = function () {
                            return $timeout(function () {
                                msg.fadeOut(300, function () { msg.remove(); });
                            }, duration);
                        };
                        var deadLock = setTimeout();
                    };

                    messenger.register(attrs.name, showMsg);
                }
            }
        }
    }]);
})();