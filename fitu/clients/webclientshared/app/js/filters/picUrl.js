(function () {
    angular.module('fitulib')
    .filter('picUrl', ['const', 'validate', 'utility', 'url', function (constants, validate, utility, url) {
        return function (input) {
            if (!input)
                return '';
            else if (validate.isString(input))
                    return url.join((input.slice(0, 4) =='http'? '' : constants.siteInfo.storageBase), input);
            else {
                var storage = input.storage, path = input.path;
                switch (storage) {
                    case 'azure':
                        return url.join('https://fitu.blob.core.chinacloudapi.cn/fituexternal/', path);
                    case 'qiniu':
                        return url.join('http://7xi81w.com1.z0.glb.clouddn.com/', path);
                    case 'local':
                        return url.join(constants.siteInfo.storageBase, path);
                    default:
                        return url.join(constants.siteInfo.storageBase, path);
                }
            }
        };
    }]);
})();