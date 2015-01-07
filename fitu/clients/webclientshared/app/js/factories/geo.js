(function () {
    angular.module('fitulib')
    .factory('geo', ['$q', function ($q) {
        var getLocation = function () {
            var defer = new $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log(position);
                    defer.resolve(position);
                }, function (error) {
                    switch (error.code) {
                        case error.TIMEOUT:
                            console.log('geolocation: timeout');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log('geolocation: failed to get position');
                            break;
                        case error.PERMISSION_DENIED:
                            console.log('geolocation: permission denied');
                            break;
                        case error.UNKNOWN_ERROR:
                        default:
                            console.log('geolocation: unknown error');
                            break;
                    }
                    defer.reject(error);
                }, {
                    enableHighAcuracy: true,
                    timeout: 5000,
                    maximumAge: 5000
                });
            }
            else {
                console.log('geolocation: not supported');
                defer.reject();
            }
            return defer.promise;
        };
        
        return {
            getLocation: getLocation
        };
    }]);
})();