(function () {
    angular.module('fitulib')
    .filter('sensitiveDatetime', ['const', function (constants) {
        return function (input) {
            var d = new Date(input)
            if (isNaN(d.getTime()))
                return '';
            else {
                var now = new Date().getTime();
                d = d.getTime();
                //in seconds
                var gap = (now - d) / 1000;
                if (gap < 0)
                    return '未来';
                else if (gap < 60)
                    return '刚刚';
                else if (gap < 660)
                    return Math.floor(gap / 60) + '分钟前';
                else if (gap < 1800)
                    return '半小时前';
                else if (gap < 3600)
                    return '1小时内';
                else if (gap < 39600)
                    return Math.floor(gap / 3600) + '小时前';
                else if (gap < 3600 * 24)
                    return '1天内';
                else if (gap < 3600 * 24 * 6)
                    return Math.floor(gap / (3600 * 24)) + '天前';
                else
                    return moment(input).format(constants.dateFormat);
            }
        };
    }]);
})();