
Page({
  data: {
    hasUserInfo: false,
    username: "",
    avatar: "../../assets/head.png"
  },
  onShow(){
    let app = getApp()
    this.setData({
      username:app.globalData.username
    })
  },
  clear() {
    my.redirectTo({
      url:"/pages/index/index"
    })
  },
})
