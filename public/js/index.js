$(document).ready(function(){
  // 页面加载时开始轮播
  $('.carousel').carousel();
  //下拉菜单
  $('.dropdown-toggle').dropdown();
  //particleground插件
  $('#particleground').particleground({
    minSpeedX:0.2,
    minSpeedY:0.2,
    directionX:"left",
    directionY:"down",
    density:7000,
    particleRadius:5,
    lineWidth:0.5
  });
})
