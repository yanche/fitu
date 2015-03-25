(function () {
    angular.module('fitulib')
    .filter('picUrl', ['const', 'validate', 'utility', function (constants, validate, utility) {
        return function (input) {
            if (!input)
                return '';
            else if (validate.isString(input))
                    return (input.slice(0, 4) =='http'? '' : constants.siteInfo.staticBase) + input;
            else {
                var storage = input.storage, path = input.path;
                switch (storage) {
                    case 'azure':
                        return 'https://fitu.blob.core.chinacloudapi.cn/fituexternal/' + path;
                    case 'qiniu':
                        return 'http://7xi81w.com1.z0.glb.clouddn.com/' + path;
                    default:
                        return constants.siteInfo.staticBase + path;
                }
            }
        };
    }]);
})();