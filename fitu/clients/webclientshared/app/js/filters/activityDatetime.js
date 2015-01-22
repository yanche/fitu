(function () {
    angular.module('fitulib')
    .filter('activityDatetime', ['const', function (constants) {
            return function (startsOn, endsOn, showPassedDate) {
                var s = moment(startsOn), e = moment(endsOn), now = moment(), tomorrow = moment().add({ days: 1 });
                if (!s.isValid() || !e.isValid())
                    return '';
                else if (!showPassedDate && e <= now)
                    return '已结束';
                else if (!showPassedDate && s <= now)
                    return '已开始';
                else {
                    var date_s = s.format('M/D'), date_e = e.format('M/D'), yeardate_s = s.format('YYYY/M/D'), yeardate_e = e.format('YYYY/M/D'), yeardate_now = now.format('YYYY/M/D'), yeardate_tomorrow = tomorrow.format('YYYY/M/D'), time_s = s.format('HH:mm'), time_e = e.format('HH:mm');
                    if (s.format('YYYY') != now.format('YYYY'))
                        var crossYear = true;
                    if (yeardate_s == yeardate_now)
                        var s_datehint = '今天';
                    else if (yeardate_s == yeardate_tomorrow)
                        var s_datehint = '明天';
                    if (yeardate_e == yeardate_now)
                        var e_datehint = '今天';
                    else if (yeardate_e == yeardate_tomorrow)
                        var e_datehint = '明天';
                    return (s_datehint || ((crossYear ? yeardate_s : date_s) + ' ')) + time_s + ' ~ ' + (yeardate_s == yeardate_e ? time_e : (e_datehint || (date_e + ' ')) + time_e);
                }
            };
        }]);
})();