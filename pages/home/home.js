var init
Page({
  data: {
    h: "00",
    m: "00",
    s: "00",
    wh: "00",
    wm: "00",
    ws: "00",
    starttime:0,
    startbutton: {
      text: "开始",
      ontap: "start",
      class: "start_button"
    },
    stopbutton: {
      text: "停止",
      ontap: "stop",
      class: "stop_button"
    }
  },
  onLoad(){
    let app = getApp()
    my.request({
      url:"https://api.aiwan.run//time/getWeek?username=" + app.globalData.username,
      method: 'GET',
      headers: {
        'content-type': 'application/json', //默认值
      },
      dataType: 'json',
      success: function (res) {
       let tep = res.data.time.split(":")
       this.setData({
         wh:tep[0],
         wm:tep[1],
         ws:tep[2]
       })
      },
      fail: function (res) {
        my.alert({ content: 'fail' });
      }
    })
  },
  start: function () {
    clearInterval(init);

    var that = this;
    if(that.data.starttime === 0){
      this.setData({
        starttime:Date.now()
      })
    }
    that.setData({
      h: "00",
      m: "00",
      s: "00",
      startbutton: {
        text: "暂停",
        ontap: "wait",
        class: "wait_button"
      }
    })
    init = setInterval(function () {
      that.timer()
    }, 1000);
  },
  stop: function () {
    console.log("stop")
    var that = this;
    var sec = Number(that.data.s);
    var min = Number(that.data.m);
    var hou = Number(that.data.h);
    var wsec = Number(that.data.ws);
    var wmin = Number(that.data.wm);
    var whou = Number(that.data.wh);
    var countsec = (sec + wsec) % 60;
    var moresec = Math.floor((sec + wsec) / 60);
    var countmin = (min + wmin + moresec) % 60;
    var moremin = Math.floor((min + wmin + moresec) / 60);
    var counthou = (hou + whou + moremin) % 60;
    var morehou = Math.floor((hou + whou + moremin) / 60);
    var endTime = Date.now();
    var app = getApp();
    var _wh = (counthou < 10 ? "0" + counthou : "" + counthou)
    var _wm = (countmin < 10 ? "0" + countmin : "" + countmin)
    var _ws = (countsec < 10 ? "0" + countsec : "" + countsec)
    var _time = _wh + ":" + _wm + ":" + _ws
    my.request({
      url:"https://api.aiwan.run/time/upload",
      method: 'POST',
      headers: {
        'content-type': 'application/json', //默认值
      },
      dataType: 'json',
      data:{
        username:app.globalData.username,
        endTime:endTime,
        startTime:that.data.starttime,
        timeStamp:3243223,
        time:_time
      },
      success: function (res) {
        console.log("nihao")
        that.setData({
          h: "00",
          m: "00",
          s: "00",
          wh: _wh,
          wm: _wm,
          ws: _ws,
          startbutton: {
            text: "开始",
            ontap: "start",
            class: "start_button"
          }
        })
        clearInterval(init);
      },
      fail: function (res) {
        my.alert({ content: 'fail' });
      }
    })
    console.log("stt")
  },
  wait: function () {
    clearInterval(init);
    var that = this;
    that.setData({
      h: that.data.h,
      m: that.data.m,
      s: that.data.s,
      startbutton: {
        text: "继续",
        ontap: "next",
        class: "next_button"
      }
    })
  },
  next: function () {
    clearInterval(init);
    var that = this;
    that.setData({
      h: that.data.h,
      m: that.data.m,
      s: that.data.s,
      startbutton: {
        text: "暂停",
        ontap: "wait",
        class: "wait_button"
      }
    })
    init = setInterval(function () {
      that.timer()
    }, 1000);
  },
  timer: function () {
    var that = this;
    var sec = Number(that.data.s);
    var min = Number(that.data.m);
    var hou = Number(that.data.h);
    console.log(that.data.s);
    sec = sec + 1
    that.setData({
      s: (sec < 10 ? "0" + sec : "" + sec)
    })
    if (sec >= 60) {
      min = min + 1
      that.setData({
        s: "00",
        m: (min < 10 ? "0" + min : "" + min)
      })
    }
    if (min >= 60) {
      hou = hou + 1
      that.setData({
        m: "00",
        h: (hou < 10 ? "0" + hou : "" + hou)
      })
    }
  }
})