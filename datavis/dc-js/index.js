/**

container id: type-index

*/

var chart = dc.barChart('#test');
var experiments = d3.csv.parse(d3.select('pre#data').text());
experiments.forEach(function(x) {
  x.Speed = +x.Speed;
});
var ndx = crossfilter(experiments);
var runDimension = ndx.dimension(function(d) {
  return +d.Run;
});
var speedSumGroup = runDimension
  .group()
  .reduceSum(function(d) {
    return d.Speed * d.Run / 1000;
  });

chart
  .width(800)
  .height(400)
  .x(d3.scale.linear().domain([6, 20]))
  .brushOn(false)
  .yAxisLabel('This is the Y Axis!')
  .xAxisLabel('This is the X Axis!')
  .dimension(runDimension)
  .group(speedSumGroup)
  .on('renderlet', function(chart) {
    chart.selectAll('rect').on('click', function(d) {
      console.log('click!', d);
    });
  })
  .render();
