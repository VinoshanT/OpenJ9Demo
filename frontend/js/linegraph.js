var config = {
    type: 'line',
    data: {
        labels: [0],
        datasets: [{
            label: 'Hotspot',
            backgroundColor: window.chartColors.hotspot,
            borderColor: window.chartColors.hotspot,
            data: [ 
                0
            ],
            fill: false,
        }, {
            label: 'OpenJ9',
            fill: false,
            backgroundColor: window.chartColors.vanilla,
            borderColor: window.chartColors.vanilla,
            data: [
                0
            ],
        }, {
            label: 'OpenJ9 (w/ Ram Cache)',
            fill: false,
            backgroundColor: window.chartColors.ramcache,
            borderColor: window.chartColors.ramcache,
            data: [
                0
            ],
        }
    ]
    },
    options: {
        title: {
            display: true,
            text: 'Performance Results'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Number of Executions'
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time (ms)'
                }
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
};

