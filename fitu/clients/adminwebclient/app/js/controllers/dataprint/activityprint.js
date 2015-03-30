(function () {
    angular.module('fituad')
    .controller('activityprint', ['$scope', 'dataprint', function ($scope, dataprint) {
        dataprint.activityprint({ timespan: 10 })
        .then(function (data) {
            var endDay = moment();
            var startDay = endDay.clone().add({ days: -10 });
            $scope.canvasWidth = 1000;
            $scope.canvasHeight = 300;
            data = data.map(function (d) { return { day: moment(d._id).format('YYYY/MM/DD'), count: d.value.count }; });
            var adjs = [];
            while (startDay <= endDay) {
                var fm = startDay.format('YYYY/MM/DD');
                var d = data.filter(function (v) { return v.day == fm; })[0];
                var count = d ? d.count : 0;
                adjs.push({ day: fm, count: count });
                startDay.add({ days: 1 });
            }
            $scope.data = {
                labels: adjs.map(function (d) { return d.day; }),
                datasets: [{
                    label: "activity print",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: adjs.map(function (d) { return d.count; })
                }]
            };
        })
        .catch(function (err) {
            console.error(err);
        });
    }]);
})();