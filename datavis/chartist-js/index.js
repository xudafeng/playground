(function() {

  var data = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40]
  };

  var options = {
    labelInterpolationFnc: function(value) {
      return value[0]
    }
  };

  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      labelInterpolationFnc: function(value) {
        return value;
      }
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 80,
      chartPadding: 20
    }]
  ];

  new Chartist.Pie('#pie-0', data, options, responsiveOptions);


  new Chartist.Pie('#pie-1', {
    series: [20, 10, 30, 40]
  }, {
    donut: true,
    donutWidth: 30,
    showLabel: true
  });

})();

(function() {
  var chart = new Chartist.Line('#line-0', {
    series: [
      {
        name: 'series-1',
        data: [
          {x: new Date(143134652600), y: 53},
          {x: new Date(143234652600), y: 40},
          {x: new Date(143340052600), y: 45},
          {x: new Date(143366652600), y: 40},
          {x: new Date(143410652600), y: 20},
          {x: new Date(143508652600), y: 32},
          {x: new Date(143569652600), y: 18},
          {x: new Date(143579652600), y: 11}
        ]
      },
      {
        name: 'series-2',
        data: [
          {x: new Date(143134652600), y: 53},
          {x: new Date(143234652600), y: 35},
          {x: new Date(143334652600), y: 30},
          {x: new Date(143384652600), y: 30},
          {x: new Date(143568652600), y: 10}
        ]
      }
    ]
  }, {
    axisX: {
      type: Chartist.FixedScaleAxis,
      divisor: 5,
      labelInterpolationFnc: function(value) {
        return moment(value).format('MMM D');
      }
    }
  });
})();

(function() {
  new Chartist.Bar('#bar-0', {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ]
  }, {
    stackBars: true,
    axisY: {
      labelInterpolationFnc: function(value) {
        return (value / 1000) + 'k';
      }
    }
  }).on('draw', function(data) {
    if (data.type === 'bar') {
      data.element.attr({
        style: 'stroke-width: 30px'
      });
    }
  });

  new Chartist.Bar('#bar-1', {
    labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    series: [20, 60, 120, 200, 180, 20, 10]
  }, {
    distributeSeries: true
  });

})();
