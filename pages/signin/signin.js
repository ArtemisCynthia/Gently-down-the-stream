Page({
  data: {
    uinputclass: "input",
    einputclass: "input",
    pinputclass: "input",
    apinputclass: "input"
  },
  onSubmit(e) {
    my.request({
      url:"https:https://api.aiwan.run/user/register",
      method: 'POST',
      headers: {
        'content-type': 'application/json', //默认值
      },
      dataType: 'json',
      data:{
        username:e.detail.value.username,
        password:e.detail.value.password
      },
      success: function (res) {
        my.redirectTo({
          url:"/pages/index/index"
        })
      },
      fail: function (res) {
        my.alert({ content: 'fail' });
      }
    })
    my.redirectTo({
      url:"/pages/index/index"
    })
  },
  onReset() {

  },
  uonfocus() {
    this.setData({
      uinputclass: "blue"
    })
  },
  uonblur() {
    this.setData({
      uinputclass: "input"
    })
  },
  eonfocus() {
    this.setData({
      einputclass: "blue"
    })
  },
  eonblur() {
    this.setData({
      einputclass: "input"
    })
  },
  ponfocus() {
    this.setData({
      pinputclass: "blue"
    })
  },
  ponblur() {
    this.setData({
      pinputclass: "input"
    })
  },
  aponfocus() {
    this.setData({
      apinputclass: "blue"
    })
  },
  aponblur(e) {
    this.setData({
      apinputclass: "input"
    })
  },
});