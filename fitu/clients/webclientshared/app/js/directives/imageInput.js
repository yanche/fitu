(function () {
    angular.module('fitulib')
    .directive('imageInput', ['$parse', 'const', function ($parse, constant) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/imageInput.html',
            replace: true,
            link: function (scope, element, attrs) {
                scope.unsupport = Boolean(FileReader);

                scope.head = 'head' in attrs;
                var h = Number(attrs.imageHeight), w = Number(attrs.imageWidth);
                var modelGet = $parse(attrs.imageBind);
                var modelSet = modelGet.assign;
                    
                var fileinputBtn = element.find('input[type=file]');
                fileinputBtn.bind('change', function () {
                    if (FileReader) {
                        var file = fileinputBtn[0].files[0], fileReader = new FileReader();
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function (e) {
                            if (!isNaN(h) && !isNaN(w)) {
                                var img = new Image();
                                img.src = e.target.result;
                                img.onload = function () {
                                    var canvas = document.createElement('canvas');
                                    canvas.width = w;
                                    canvas.height = h;
                                    var ctx = canvas.getContext("2d");
                                    ctx.drawImage(this, 0, 0, w, h);
                                    var dataURL = canvas.toDataURL("image/jpeg");
                                    //alert('resized, dataurl: ' + dataURL.slice(0, 20) + ', length: ' + dataURL.length + ', w,h:' + w + ' ' + h);
                                    modelSet(scope, dataURL);
                                    scope.$apply();
                                };
                            }
                            else {
                                modelSet(scope, e.target.result);
                                scope.$apply();
                            }
                        };
                    }
                });
            }
        };
    }]);
})();