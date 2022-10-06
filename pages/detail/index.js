const _Page = require("../../__antmove/component/componentClass.js")("Page");
import * as echarts from "../../ec-canvas/echarts";
let chart = null;
let us = "zhangsan4";

function getMinute(timeStamp){
  return Math.floor((timeStamp / (1000 * 3600)) * 10) / 10;
}

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
      width: width,
      height: height
  });
  canvas.setChart(chart); 
  var option = {
      title:{text:"本周学习时长"},
      backgroundColor: "#ffffff",
      color: ["#37A2DA", "#FF9F7F"],
      tooltip: {},
      xAxis: {
          show: false
      },
      yAxis: {
          show: false
      },
      radar: {
          // shape: 'circle',
          indicator: [
              {
                  name: "周一",
                  max: 5
              },
              {
                  name: "周二",
                  max: 5
              },
              {
                  name: "周三",
                  max: 5
              },
              {
                  name: "周四",
                  max: 5
              },
              {
                  name: "周五",
                  max: 5
              },
              {
                  name: "周六",
                  max: 5
              },
              {
                  name: "周天",
                  max: 5
              }
          ]
      },
      series: [
          {
              type: "radar",
              data: [
                  {
                      value: [4, 3, 5, 3, 4, 4,3],
                      name: "时长"
                  }
              ]
          }
      ]
  };
  my.request({
    url: 'https://api.aiwan.run/time/getUserTodayInterval?username='+ us,
    method: 'GET',
    headers: {
      'content-type': 'application/json', //默认值
    },
    dataType: 'json',
    success: function (res) {
      if (res.code === 200) {
        option.series[0].data[0].value = res.data.map((item) => {
          return getMinute(item.totalTimeStamp) || 0;
        });
      }
    },
    // fail: function (res) {
    //   my.alert({ content: 'fail' });
    // }
  });
  chart.setOption(option);
  return chart;
}
function initChart1(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
      width: width,
      height: height
  });
  canvas.setChart(chart);
  var option = {
      title: {
        text: "今天学习时长",
      },
      backgroundColor: "#ffffff",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        // prettier-ignore
        data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'],
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} m",
        },
        axisPointer: {
          snap: true,
        },
      },
      series: [
        {
          name: "todayTime",
          type: "line",
          smooth: true,
          // prettier-ignore
          data: [93, 60, 90, 120,0,0, 150, 180, ],
          markArea: {
            itemStyle: {
              color: "rgba(255, 173, 177, 0.4)",
            },
          },
        },
      ],
    };
    my.request({
      url: 'https://api.aiwan.run/time/getUserToday?username='+ us,
      method: 'GET',
      headers: {
        'content-type': 'application/json', //默认值
      },
      dataType: 'json',
      success: function (res) {
        if (res.code === 200) {
          option.series[0].data = res.data.map(
            (item) => {
              return Number(item.time || 0);
            }
          );
        }
      },
      fail: function (res) {
        my.alert({ content: 'fail' });
      }
    });
  chart.setOption(option);
  return chart;
}

_Page({
    onShareAppMessage: function(res) {
        return {
            title: "ECharts 可以在微信小程序中使用啦！",
            path: "/pages/index/index",
            success: function() {},
            fail: function() {}
        };
    },
    data: {
      time:"",
      username:"",
      totalTimeStampTemp:"",
      idx:0,
      ec: {
            onInit: initChart
      },
      ec2:{
        onInit: initChart1
      }
    },

    onLoad(query) {
      // 页面加载
      console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
      this.initData(query)
    },
    onReady() {
        setTimeout(function() {
            // 获取 chart 实例的方式
            console.log(chart);
        }, 2000);
    },
    initData(data){
      us = data.username
      this.setData({
        time:data.time,
        username:data.username,
        totalTimeStampTemp:data.totalTimeStampTemp,
        idx:Number(data.idx)
      })
    }
});
