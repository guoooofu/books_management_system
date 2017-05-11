$(document).ready(function(){
  // 后台表格
  (function(){
    // 基于准备好的dom，初始化echarts实例
   var myChart = echarts.init(document.getElementById('main'));
   // 指定图表的配置项和数据
   var option = {
       title: {
           text: '用户分布表'
       },
       tooltip: {},
       legend: {
           data:['人数']
       },
       xAxis: {
           data: ["系统管理员","图书管理员","教师","学生"]
       },
       yAxis: {},
       series: [{
           name: '人数',
           type: 'bar',
           data: [5, 80, 200, 1200 ]
       }]
   };
   // 使用刚指定的配置项和数据显示图表。
   myChart.setOption(option);
  })()
})
