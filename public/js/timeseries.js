$(function() {

    $.urlParam = function(name){
            var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
                return null;
            }else{
                return results[1] || 0;
            }   
        }
    var user = $.urlParam('user');
    var room = $.urlParam('room');
    var quantity = $.urlParam('quantity');
    var period = $.urlParam('period');

    // Set colors for area according to quantitiy 
    if (quantity === 'temperature') {
        rgbcolor = '#f39c12';
    }   
    else if (quantity === 'humidity') {
        rgbcolor = '#3498db'
    }
    else if (quantity === 'co2') {
        rgbcolor = '#2ecc71'
    } 

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
                        [0, rgbcolor],
                        [1, Highcharts.Color(rgbcolor).setOpacity(0).get('rgba')]
                    ]
                },
                lineWidth: 0,
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

        series : [{turboThreshold:0
        }],

        legend: {   
            enabled: false
        },
        
        credits: {
            enabled: false
        }
    }; 

    chart = new Highcharts.Chart(chartOptions);
                chart.showLoading();

    if (quantity === 'temperature') {
        chart.yAxis[0].axisTitle.attr({
            text: 'Temperatur [°C]'
        });
    }   
    else if (quantity === 'humidity') {
        chart.yAxis[0].axisTitle.attr({
            text: 'Luftfeuchtigkeit [%]'
        });
    }
    else if (quantity === 'co2') {
        chart.yAxis[0].axisTitle.attr({
            text: 'Luftqualität (CO2 [ppm])'
        });
    } 
    
    $(document).ready(function() {
        
        $.getJSON('http:///213.165.92.187:8080/api/user/'+user+'/room/'+room+'/quantity='+quantity+'&period='+period+'?callback=?', function(data) {
     
                
                // create the chart
                chart.hideLoading();
                $.each(data, function(i,point) {
                    point.x = parseInt(point.timestamp);
                    point.y = point.value;
                }); 
                chart.series[0].setData(data);
                
            
        });
    });    
});

