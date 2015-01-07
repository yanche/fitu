(function () {
    angular.module('fitulib')
    .directive('map', ['geo', function (geo) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/map.html',
            replace: true,
            scope: {
                lat: '=',
                lng: '=',
                needSearch: '='
            },
            link: function (scope, element, attrs) {
                var searchArea = element.find('.searchcontainer');
                var mapArea = element.find('.bmap').height(element.height() - (scope.needSearch ? searchArea.height() : 0)).get(0); //set the hight of map area
                
                var map = new BMap.Map(mapArea);
                var initPoint = new BMap.Point(scope.lng || 121.482581, scope.lat || 31.240517);
                map.centerAndZoom(initPoint, 13);
                map.enableScrollWheelZoom();
                map.enableKeyboard();
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                var marker = null;

                if (scope.needSearch) {
                    scope.search = function (term) {
                        localSearch.search(term);
                    };
                    
                    var localSearch = new BMap.LocalSearch(initPoint, {
                        renderOptions: { map: map }
                    });

                    map.addEventListener('click', function (evt) {
                        updatePosition(evt.point);
                    });
                    var markerDrag = function (evt) {
                        updatePosition(evt.point);
                    };
                    var updatePosition = function (point) {
                        scope.lng = point.lng;
                        scope.lat = point.lat;
                        scope.$apply();
                    };
                }
                
                var lastMarkTS = null;
                var markMap = function () {
                    var now = new Date().getTime();
                    if (scope.lng && scope.lat && (!lastMarkTS || now - lastMarkTS > 100)) {
                        var point = new BMap.Point(scope.lng, scope.lat);
                        map.removeOverlay(marker);
                        marker = new BMap.Marker(point);
                        if (scope.needSearch) {
                            marker.enableDragging();
                            marker.addEventListener('dragend', markerDrag);
                        }
                        map.addOverlay(marker);
                        map.panTo(point);
                        lastMarkTS = now;
                    }
                };

                scope.$watch('lng', markMap);
                scope.$watch('lat', markMap);
            }
        };
    }]);
})();