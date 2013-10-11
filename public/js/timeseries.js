$(function() {

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    chartOptions = {

        chart : {
            type: 'area',
            zoomType: 'x',
            renderTo: 'container'
        },

        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        scrollbar: {
            liveRedraw: false
        },
        
        title: {
            text: ''
        },
        
        subtitle: {
            text: ''
        },
        
        // rangeSelector : {
        //     buttons: [{
        //         type: 'hour',
        //         count: 1,
        //         text: 'Stunde'
        //     }, {
        //         type: 'day',
        //         count: 1,
        //         text: 'Tag'
        //     }, {
        //         type: 'week',
        //         count: 1,
        //         text: 'Woche'
        //     }],
        //     inputEnabled: false, // it supports only days
        //     selected : 3 // week
        // },
        
        xAxis : {
            type: 'datetime'
        },

        series : [{
        }],

        legend: {   
            enabled: false
        },
        
        credits: {
            enabled: false
        }
    };    
    
    $(document).ready(function() {
        $.getJSON('http:///213.165.92.187:8080/api/user/1/room/14/quantity=co2?callback=?', function(data) {
     
                
                // create the chart
                chart = new Highcharts.Chart(chartOptions);
                $.each(data, function(i,point) {
                    point.x = parseInt(point.timestamp);
                    point.y = point.value;
                }); 
                chart.series[0].setData(data);
            
        });
    });    
});

