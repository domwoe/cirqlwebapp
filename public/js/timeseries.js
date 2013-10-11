$(function() {
    console.log('Hello world');

    chartOptions = {
        chart : {
            // type: '',
            zoomType: 'x',
            renderTo: 'container'
        },

        // navigator : {
        //     adaptToUpdatedData: false,
        //     series : {
        //         data : data
        //     }
        // },

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
        //         text: '1h'
        //     }, {
        //         type: 'day',
        //         count: 1,
        //         text: '1d'
        //     }, {
        //         type: 'month',
        //         count: 1,
        //         text: '1m'
        //     }, {
        //         type: 'year',
        //         count: 1,
        //         text: '1y'
        //     }, {
        //         type: 'all',
        //         text: 'All'
        //     }],
        //     inputEnabled: false, // it supports only days
        //     selected : 4 // all
        // },
        
        xAxis : {
            type: 'datetime'
            // events : {
            //     afterSetExtremes : afterSetExtremes
            // },
            // minRange: 3600 * 1000 // one hour
        },

        series : [{
            //data : []
            //dataGrouping: {
            //    enabled: false
            //}
        }]
    };    
    
    $(document).ready(function() {
        $.getJSON('http:///213.165.92.187:8080/api/user/1/room/14/quantity=temperature?callback=?', function(data) {
     
        // $.ajax({
        //     url : 'http:///213.165.92.187:8080/api/user/1/room/14/quantity=temperature?callback=?',
        //     type : 'GET',
        //     jsonpCallback: 'jsonCallback',
        //     contentType: "application/json",
        //     dataType : 'jsonp',
        //     //1jsonp : 'callback',
        //     success : function(data){    
            
                console.log(data[0].timestamp); 

                // Add a null value for the end date 
                //data = [].concat(data, [[Date.UTC(2011, 9, 14, 19, 59), null, null, null, null]]);
                    
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


/**
 * Load new data depending on the selected min and max
 */
function afterSetExtremes(e) {

    var url,
        currentExtremes = this.getExtremes(),
        range = e.max - e.min;
    var chart = $('#container').highcharts();
    chart.showLoading('Loading data from server...');
    $.getJSON('http://www.highcharts.com/samples/data/from-sql.php?start='+ Math.round(e.min) +
            '&end='+ Math.round(e.max) +'&callback=?', function(data) {
        
        chart.series[0].setData(data);
        chart.hideLoading();
    });
    
}
