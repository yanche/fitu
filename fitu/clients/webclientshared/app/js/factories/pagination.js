(function () {
    angular.module('fitulib')
    .factory('pagination', ['$q', function ($q) {
        //loader should be a function, take page & pageSize as input, return deferred result, with {list: [], total: }
        //or loader could be an array, for static page store
        var PageStore = function (loader) {
            if (Array.isArray(loader)) {
                this._store = loader;
                this._total = loader.length;
                this._static = true;
                this._status = 1;
            }
            else {
                this._store = [];
                this._total = 0;
                this._loader = loader;
                this._static = false;
                this._status = 0;
            }
        };
        //page here starts from 0, not good enough if multi-request happens at same time
        PageStore.prototype.navigate = function (_page, _pageSize, refresh) {
            var page = Number(_page), pageSize = Number(_pageSize);
            if (isNaN(page) || page < 0 || isNaN(pageSize) || pageSize <= 0)
                throw new Error('bad arguments, page: ' + _page + ', pageSize: ' + _pageSize);
            
            var start = page * pageSize, end = (page + 1) * pageSize, me = this, defer = new $q.defer();
            if (me._static || (me._status != 0 && !refresh && me._itemExist(start, me._total > end ? end : me._total))) {
                console.log('returning item in page: ' + page + ', pageSize: ' + pageSize + ' from cache.');
                defer.resolve(me._store.slice(start, me._total > end ? end : me._total));
            }
            else {
                console.log('loading item in page: ' + page + ', pageSize: ' + pageSize + ' from server.');
                me._loader(_page, _pageSize)
                .then(function (data) {
                    me._status = 1;
                    me._total = data.total;
                    if (end > me._total) end = me._total;
                    for (var i = start; i < end; ++i)
                        me._store[i] = data.list[i - start];
                    defer.resolve(me._store.slice(start, end));
                })
                .catch(function (err) {
                    defer.reject(err);
                });
            }
            return defer.promise;
        };
        PageStore.prototype._itemExist = function (start, end) {
            for (var i = start; i < end; ++i) {
                if (!this._store[i])
                    return false;
            }
            return true;
        };
        PageStore.prototype.getTotal = function () {
            return this._status == 0 ? 0 : this._total;
        };
        //_maxNav must be odd number
        PageStore.prototype.getPageNavs = function (_pageSize, _maxNav, _currentPage) {
            var maxNav = Number(_maxNav), pageSize = Number(_pageSize), currentPage = Number(_currentPage);
            if (isNaN(maxNav) || maxNav <= 0 || Math.floor(maxNav / 2) == maxNav / 2 || isNaN(pageSize) || pageSize <= 0 || isNaN(currentPage) || currentPage < 0)
                throw new Error('bad arguments, pageSize: ' + _pageSize + ', maxNav: ' + _maxNav + ', currentPage: ' + _currentPage);
            var totalPages = Math.ceil(this.getTotal() / pageSize);
            var needPages = Math.min(maxNav, totalPages);
            if (needPages == totalPages) {
                var ret = new Array(needPages), i = 0;
                while (i < ret.length) {
                    ret[i] = i;
                    ++i;
                }
                return { nav: ret, min: 0, max: totalPages - 1, total: totalPages };
            }
            else {
                var padding = Math.floor(maxNav / 2);
                var start = currentPage - padding, end = currentPage + padding;
                if (start < 0) {
                    end = end + (0 - start);
                    start = 0;
                }
                else if (end > totalPages - 1) {
                    start = start - (end - totalPages + 1);
                    end = totalPages - 1;
                }
                var ret = new Array(needPages), i = 0;
                while (i < ret.length) {
                    ret[i] = i + start;
                    ++i;
                }
                return { nav: ret, min: 0, max: totalPages - 1, total: totalPages };
            }
        };
        PageStore.prototype.refresh = function (statics) {
            if (Array.isArray(statics)) {
                this._store = statics;
                this._total = statics.length;
                this._static = true;
                this._status = 1;
                delete this._loader;
            }
            else {
                this._store = [];
                this._total = 0;
                this._status = 0;
            }
        };
        
        return {
            PageStore: PageStore
        };
    }]);
})();