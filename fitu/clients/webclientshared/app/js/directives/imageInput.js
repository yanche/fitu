(function () {
    angular.module('fitulib')
    .directive('imageInput', ['$parse', 'const', function ($parse, constant) {
        return {
            restrict: 'E',
            templateUrl: '/app/html/directives/imageInput.html',
            replace: true,
            link: function (scope, element, attrs) {
                scope.head = 'head' in attrs;
                var h = Number(attrs.imageHeight), w = Number(attrs.imageWidth);
                var modelGet = $parse(attrs.imageBind);
                var modelSet = modelGet.assign;
                
                var fileinputBtn = element.find('input[type=file]');
                    fileinputBtn.bind('change', function () {
                        alert('file change evt');
                        var file = fileinputBtn[0].files[0], fileReader = new FileReader();
                        alert('has file: ' + Boolean(file));
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function (e) {
                            var dataUrl = e.target.result;
                            alert('onload, dataurl: ' + dataUrl.slice(0,10) + ', h: ' + h + ', w: ' + w);
                        if (!isNaN(h) && !isNaN(w)) {
                            var img = document.createElement('img');
                            img.src = dataUrl;
                            var canvas = document.createElement('canvas');
                            canvas.width = w;
                            canvas.height = h;
                            var cvs = canvas.getContext('2d');
                            cvs.drawImage(img, 0, 0, w, h);
                                dataUrl = canvas.toDataURL('image/jpeg');
                                alert('resized: ' + dataUrl.slice(0, 10));
                        }
                        modelSet(scope, dataUrl);
                        scope.$apply();
                    };
                });
            }
        };
    }]);
})();