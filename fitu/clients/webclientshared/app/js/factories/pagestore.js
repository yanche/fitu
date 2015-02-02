(function () {
    angular.module('fitulib')
    .factory('pagestore', ['utility', function (utility) {
        var PageDataLoader = function (loadFn) {
            this._loadFn = loadFn;
            this._pages_cl = [];
        };
        PageDataLoader.prototype.loadPage = function (page) {
            var _page = Number(page);
            if (isNaN(_page) || _page < 0)
                throw new Error('bad page input: ' + page);
                
            var cl = this._pages_cl[_page];
            if (cl)
                return cl.load();
            else {
                var loadFn = this._loadFn;
                cl = new utility.CachedLoader(function () {
                    return loadFn(_page);
                });
                this._pages_cl[_page] = cl;
                return cl.load();
            }
        };
        PageDataLoader.prototype.pageLoaded = function (page) {
            var _page = Number(page);
            if (isNaN(_page) || _page < 0)
                throw new Error('bad page input: ' + page);
                
            var cl = this._pages_cl[_page];
            return cl && cl.loaded;
        };
        PageDataLoader.prototype.refresh = function () {
            this._pages_cl.forEach(function (cl) {
                if (cl)
                    cl.refresh();
            });

        };
        return {
            PageDataLoader: PageDataLoader
        };
    }]);
})();