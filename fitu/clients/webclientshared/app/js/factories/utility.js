(function () {
    angular.module('fitulib')
    .factory('utility', ['const', '$q', function (constants, $q) {
        var CachedLoader = function (fn) {
            this.pendingQ = [];
            this.loaded = false;
            this.result = null;
            this.fn = fn;
        };
        
        CachedLoader.prototype.load = function (refresh) {
            var me = this;
            var defer = new $q.defer();
            if (me.loaded && !refresh)
                defer.resolve(me.result);
            else {
                me.loaded = false;
                me.result = null;
                me.pendingQ.push(defer);
                if (me.pendingQ.length == 1) {
                    me.fn()
                    .then(function (data) {
                        me.loaded = true;
                        me.result = data;
                        while (me.pendingQ.length > 0)
                            me.pendingQ.shift().resolve(data);
                    })
                    .catch(function (err) {
                        me.loaded = false;
                        me.result = null;
                        while (me.pendingQ.length > 0)
                            me.pendingQ.shift().reject(err);
                    });
                }
            }
            return defer.promise;
        };
        
        CachedLoader.prototype.refresh = function () {
            this.loaded = false;
            this.result = null;
        };
        
        return {
            getStaticUrl: function (url) {
                return constants.siteInfo.staticBase + url;
            },
            getRelativeUrl: function (url) {
                var len = constants.siteInfo.staticBase.length;
                if (url.slice(0, len) == constants.siteInfo.staticBase)
                    return url.substr(len);
                else
                    return url;
            },
            CachedLoader: CachedLoader
        };
    }]);
})();