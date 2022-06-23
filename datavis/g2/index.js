(function() {

  var data = [
    {name: 'Microsoft Internet Explorer', value: 56.33 },
    {name: 'Chrome', value: 24.03},
    {name: 'Firefox', value: 10.38},
    {name: 'Safari',  value: 4.77},
    {name: 'Opera', value: 0.91},
    {name: 'Proprietary or Undetectable', value: 0.2}
  ];
  var Stat = G2.Stat;
  var chart = new G2.Chart({
    id: 'pie-0',
    forceFit: true,
    height: 450
  });
  chart.source(data);
  // 重要：绘制饼图时，必须声明 theta 坐标系
  chart.coord('theta', {
    radius: 0.8 // 设置饼图的大小
  });
  chart.legend('name', {
    position: 'bottom'
  });
  chart.tooltip({
    title: null,
    map: {
      value: 'value'
    }
  });
  chart.intervalStack()
    .position(Stat.summary.percent('value'))
    .color('name')
    .label('name*..percent',function(name, percent){
      percent = (percent * 100).toFixed(2) + '%';
      return name + ' ' + percent;
    });
  chart.render();
  // 设置默认选中
  var geom = chart.getGeoms()[0]; // 获取所有的图形
  var items = geom.getData(); // 获取图形对应的数据
  geom.setSelected(items[1]); // 设置选中

})();

(function() {
  var data = [
    {year:2007, area:'亚太地区', profit: 7860*0.189},
    {year:2007, area:'非洲及中东', profit: 7860*0.042},
    {year:2007, area:'拉丁美洲', profit: 7860*0.025},
    {year:2007, area:'中欧和东欧', profit: 7860*0.018},
    {year:2007, area:'西欧', profit: 7860*0.462},
    {year:2007, area:'北美', profit: 7860*0.265},
    {year:2011, area:'亚太地区', profit: 7620*0.539},
    {year:2011, area:'非洲及中东', profit: 7620*0.065},
    {year:2011, area:'拉丁美洲', profit: 7620*0.065},
    {year:2011, area:'中欧和东欧', profit: 7620*0.034},
    {year:2011, area:'西欧', profit: 7620*0.063},
    {year:2011, area:'北美', profit: 7620*0.234}
  ];
  function formatter(text,item){
    var point = item.point; // 每个弧度对应的点
    var percent = point['..percent']; // ..proportion 字段由Stat.summary.proportion统计函数生成
    percent = (percent * 100).toFixed(2) + '%';
    return percent;
  }
  var Stat = G2.Stat;
  var chart = new G2.Chart({
    id: 'pie-1',
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: 80
    }
  });
  chart.source(data);
  // 以 year 为维度划分分面
  chart.facet(['year'], {
    margin: 50,
    facetTitle: {
      colDimTitle: {
        title: null
      },
      colTitle: { 
        title: {
          fontSize: 18,
          textAlign: 'center',
          fill: '#999'
        }
      }
    }
  }); 
  chart.legend({
    position: 'bottom'
  });
  chart.coord('theta', {
    radius: 1,
    inner: 0.35
  });
  chart.tooltip({
    title: null
  });
  chart.intervalStack().position(Stat.summary.percent('profit'))
    .color('area')
    .label('..percent', {
      offset: -2
    })
    .style({
      lineWidth: 1
    });
  chart.render();

})();

(function() {
  var data = [
    {"month":0,"tem":7,"city":"tokyo"},
    {"month":1,"tem":6.9,"city":"tokyo"},
    {"month":2,"tem":9.5,"city":"tokyo"},
    {"month":3,"tem":14.5,"city":"tokyo"},
    {"month":4,"tem":18.2,"city":"tokyo"},
    {"month":5,"tem":21.5,"city":"tokyo"},
    {"month":6,"tem":25.2,"city":"tokyo"},
    {"month":7,"tem":26.5,"city":"tokyo"},
    {"month":8,"tem":23.3,"city":"tokyo"},
    {"month":9,"tem":18.3,"city":"tokyo"},
    {"month":10,"tem":13.9,"city":"tokyo"},
    {"month":11,"tem":9.6,"city":"tokyo"},
    {"month":0,"tem":-0.2,"city":"newYork"},
    {"month":1,"tem":0.8,"city":"newYork"},
    {"month":2,"tem":5.7,"city":"newYork"},
    {"month":3,"tem":11.3,"city":"newYork"},
    {"month":4,"tem":17,"city":"newYork"},
    {"month":5,"tem":22,"city":"newYork"},
    {"month":6,"tem":24.8,"city":"newYork"},
    {"month":7,"tem":24.1,"city":"newYork"},
    {"month":8,"tem":20.1,"city":"newYork"},
    {"month":9,"tem":14.1,"city":"newYork"},
    {"month":10,"tem":8.6,"city":"newYork"},
    {"month":11,"tem":2.5,"city":"newYork"},
    {"month":0,"tem":-0.9,"city":"berlin"},
    {"month":1,"tem":0.6,"city":"berlin"},
    {"month":2,"tem":3.5,"city":"berlin"},
    {"month":3,"tem":8.4,"city":"berlin"},
    {"month":4,"tem":13.5,"city":"berlin"},
    {"month":5,"tem":17,"city":"berlin"},
    {"month":6,"tem":18.6,"city":"berlin"},
    {"month":7,"tem":17.9,"city":"berlin"},
    {"month":8,"tem":14.3,"city":"berlin"},
    {"month":9,"tem":9,"city":"berlin"},
    {"month":10,"tem":3.9,"city":"berlin"},
    {"month":11,"tem":1,"city":"berlin"}
  ];
  var chart = new G2.Chart({
    id: 'line-0',
    forceFit: true,
    height: 450
  });
  var defs = {'month':{
    type: 'cat',
    values: [
      '一月','二月','三月','四月','五月','六月',
      '七月','八月','九月','十月','十一月','十二月']
  }};
  chart.source(data,defs);
  chart.tooltip(true, {
    custom: true, // 使用自定义的 tooltip
    offset: 50
  });
  chart.line().position('month*tem').color('city');
  chart.render();
})();

(function() {
  $.getJSON('./data.json', function(data) {
    var Stat = G2.Stat;
    var Frame = G2.Frame;
    var frame = new Frame(data);
    frame = Frame.combinColumns(frame,["小于5岁","5至13岁","14至17岁","18至24岁","25至44岁","45至64岁","65岁及以上"],'人口数量','年龄段','State');
    var chart = new G2.Chart({
      id: 'bar-0',
      forceFit: true,
      height: 450,
      plotCfg: {
        margin: [30, 80, 90, 40],
        background: { 
          stroke: '#ccc', // 边颜色
          lineWidth: 1, // 边框粗细
        } // 绘图区域背景设置
      }
    });
    chart.source(frame);
    chart.legend({
      position: 'bottom'
    });
    chart.axis('State', {
      title: null
    });
    chart.axis('人口数量', {
      titleOffset: 75,
      formatter: function(val) {
        return val / 1000000 + 'M';
      },
      position: 'right'
    });
    chart.intervalStack().position('State*人口数量').color('年龄段', ['#98ABC5', '#8A89A6', '#7B6888', '#6B486B', '#A05D56', '#D0743C', '#FF8C00']).size(9);
    chart.render();
  });

})();

(function() {
  $.getJSON('./data.json',function(data) {
    var Stat = G2.Stat;
    var chart = new G2.Chart({
      id : 'bar-1',
      forceFit: true,
      height: 450,
      plotCfg: {
        margin: [20, 60, 80, 120]
      }
    });
    var Frame = G2.Frame;
    var frame = new Frame(data);
    frame = Frame.sort(frame, 'release');
    chart.setMode('select'); // 开启框选模式
    chart.select('rangeX'); // 设置 X 轴范围的框选
    chart.source(frame, { 
      '..count': {
        alias: 'top2000 唱片总量'
      },
      release: {
        tickInterval: 5,
        alias: '唱片发行年份'
      }
    });
    chart.interval().position(Stat.summary.count('release')).color('#e50000');
    chart.render();
    // 监听双击事件，这里用于复原图表
    chart.on('plotdbclick', function(ev) {
      chart.set('filters', {});
      chart.repaint();
    });
  });
})();
