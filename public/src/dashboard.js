socket.emit('viewCount')
var xValues = [];
socket.once('viewCounted', function (data) {
    $('.text-lg').text(data.counter)
    for (let i = 0; i < data.counters.length + 1; i++) {
        xValues.push(i)
    }
    data.counters.push(data.counter)
    var viewsChart = new Chart("viewsChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                pointBackgroundColor: "rgba(0,0,255,1)",
                data: data.counters
              }]
        },
        options: {
            legend: {
                display: false,
            },
                title: {
                    display: true,
                    text: 'View Count per Day'
                }
            
        }
      });
})

