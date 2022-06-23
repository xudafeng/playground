(function() {

  var container = $('#pie-0');
  container.css({
    width: 600,
    height: 300
  });
  var myChart = echarts.init(container[0]);

  var option = {
    title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {
            value: 335,
            name: '直接访问'
          },
          {
            value: 310,
            name:'邮件营销'
          },
          {
            value: 234,
            name:'联盟广告'
          },
          {
            value: 135,
            name:'视频广告'
          },
          {
            value: 1548,
            name:'搜索引擎'
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart.setOption(option);

})();

(function() {
  var container = $('#pie-1');
  container.css({
    width: 600,
    height: 300
  });
  var myChart = echarts.init(container[0]);

  var option = {
    title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '60%'],
        data:[
          {
            value: 335,
            name: '直接访问'
          },
          {
            value: 310,
            name:'邮件营销'
          },
          {
            value: 234,
            name:'联盟广告'
          },
          {
            value: 135,
            name:'视频广告'
          },
          {
            value: 1548,
            name:'搜索引擎'
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  myChart.setOption(option);
})();

(function() {
  var container = $('#line-0');
  container.css({
    width: 600,
    height: 300
  });
  var myChart = echarts.init(container[0]);

  var option = {
    title: {
      text: '对数轴示例',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}'
    },
    legend: {
      left: 'left',
      data: ['2的指数', '3的指数']
    },
    xAxis: {
      type: 'category',
      name: 'x',
      splitLine: {show: false},
      data: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {
      type: 'log',
      name: 'y'
    },
    series: [
      {
        name: '3的指数',
        type: 'line',
        data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
      },
      {
        name: '2的指数',
        type: 'line',
        data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
      },
      {
        name: '1/2的指数',
        type: 'line',
        data: [1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256, 1/512]
      }
    ]
  };

  myChart.setOption(option);

})();

(function() {
  var container = $('#bar-0');
  container.css({
    width: 600,
    height: 300
  });
  var myChart = echarts.init(container[0]);

  var option = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '60%',
        data:[10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };
  myChart.setOption(option);

})();

(function() {
  var container = $('#bar-1');
  container.css({
    width: 600,
    height: 300
  });
  var myChart = echarts.init(container[0]);

  var option = {
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    yAxis:  {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    series: [
      {
        name: '直接访问',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: '邮件营销',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '联盟广告',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '视频广告',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: '搜索引擎',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  myChart.setOption(option);

})();
