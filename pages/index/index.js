Page({
  data: {},
  onLoad() {},
  goToSigin(){
    my.navigateTo({url:"../signin/signin"})
  },
  onSubmit(e) {
    let app = getApp()
    my.request({
      url:"https:https://api.aiwan.run/user/login",
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
        
        app.globalData.username = e.detail.value.username
        my.switchTab({
          url:"/pages/home/home"
        })
      },
      fail: function (res) {
        my.alert({ content: '用户名或密码错误！' });
      }
    })
    app.globalData.username = e.detail.value.username
    console.log(app.globalData.username)
    my.switchTab({
      url:"/pages/home/home"
    })
  },
});
