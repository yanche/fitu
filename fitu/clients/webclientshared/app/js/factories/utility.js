(function () {
    angular.module('fitulib')
    .factory('utility', ['const', '$q', 'lang', function (constants, $q, lang) {
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
            
        //this is a preparation for multi-lingual
        var SmartString = function (langId) {
            this.langId = langId;
        };
        SmartString.prototype.toString = function () {
            return lang[this.langId] || '';
        };
        
        var ErrorCode = function () {
            this.map = {};
            this.default = null;
        };
        ErrorCode.prototype.register = function (errcode, langId) {
            if (errcode)
                this.map[errcode] = new SmartString(langId);
            else
                this.default = new SmartString(langId);
        };
        ErrorCode.prototype.toErrMsg = function (errcode) {
            if (errcode && this.map[errcode])
                return this.map[errcode].toString();
            else
                return this.default ? this.default.toString() : '';
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
            CachedLoader: CachedLoader,
            SmartString: SmartString,
            ErrorCode: ErrorCode
        };
    }]);
})();