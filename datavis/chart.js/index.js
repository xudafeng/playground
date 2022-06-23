/**

container id: type-index

*/
(function() {
  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
  };

  var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  };

  var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
  };

  var config_pie = {
    type: 'pie',
    data: {
      datasets: [{
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
        backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow,
          chartColors.green,
          chartColors.blue,
        ],
        label: 'Dataset 1'
      }],
      labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
      ]
    },
    options: {
      responsive: true
    }
  };

  var config_doughnut = {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
          randomScalingFactor(),
        ],
        backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow,
          chartColors.green,
          chartColors.blue,
        ],
        label: 'Dataset 1'
      }],
      labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
      ]
    },
    options: {
      responsive: true
    }
  };

  var ctx_pie = document.getElementById('pie-0').getContext('2d');
  var ctx_doughnut = document.getElementById('pie-1').getContext('2d');
  var myPie = new Chart(ctx_pie, config_pie);
  var myDoughnut = new Chart(ctx_doughnut, config_doughnut);
})();

(function() {
  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
  };
  var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  };
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var config = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'dataset 1',
        backgroundColor: chartColors.red,
        borderColor: chartColors.red,
        data: [
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor()
        ],
        fill: false,
      }, {
        label: 'dataset 2',
        fill: false,
        borderDash: [5, 5],
        backgroundColor: chartColors.blue,
        borderColor: chartColors.blue,
        data: [
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor()
        ],
      }, {
        label: 'dataset 2',
        fill: true,
        backgroundColor: chartColors.yellow,
        borderColor: chartColors.yellow,
        data: [
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor(), 
          randomScalingFactor()
        ],
      }]
    },
    options: {
      responsive: true,
      title:{
        display:true,
        text:'Chart.js Line Chart'
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
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  };

  var ctx = document.getElementById('line-0').getContext('2d');
  var myLine = new Chart(ctx, config);

})();

(function() {

  var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)'
  };

  var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  }
  var barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: chartColors.red,
      data: [
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor()
      ]
    }, {
      label: 'Dataset 2',
      backgroundColor: chartColors.blue,
      data: [
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor()
      ]
    }, {
      label: 'Dataset 3',
      backgroundColor: chartColors.green,
      data: [
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor()
      ]
    }]

  };
  var ctx = document.getElementById('bar-0').getContext('2d');
  myBar = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      title:{
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  });

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var color = Chart.helpers.color;
  var horizontalBarChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Dataset 1',
      backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
      borderColor: chartColors.red,
      borderWidth: 1,
      data: [
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor(), 
        randomScalingFactor()
      ]
    }]
  };

  var ctx_bar_1 = document.getElementById('bar-1').getContext('2d');

  var myHorizontalBar = new Chart(ctx_bar_1, {
    type: 'bar',
    data: horizontalBarChartData,
    options: {
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart'
      }
    }
  });
})();
