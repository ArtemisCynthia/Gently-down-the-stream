Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    this.initData()
  },
  data: {
    index: 0,
    zdata:[
      {img:"",username:"ssw",time:"20h"},
      {img:"",username:"ssw2",time:"21h"},
      {img:"",username:"ssw3",time:"21h"},
      {img:"",username:"ssw4",time:"21h"}
    ],
    ydata:[
      {img:"",username:"ssw",time:"20h"},
      {img:"",username:"ssw2",time:"21h"},
      {img:"",username:"ssw3",time:"21h"},
      {img:"",username:"ssw4",time:"21h"}
    ],
    tdata:[
      {img:"",username:"ssw",time:"20h"},
      {img:"",username:"ssw2",time:"21h"},
      {img:"",username:"ssw3",time:"21h"},
      {img:"",username:"ssw4",time:"21h"}
    ]
  },
  handleChange(index) {
    this.setData({ index });
  },
  gotodetail(e){
    console.log(e)
    my.navigateTo({
      url:"../detail/index?username=" + e.target.dataset.item.username + "&time=" + e.target.dataset.item.time + "&totalTimeStampTemp=" + e.target.dataset.item.totalTimeStampTemp + "&idx=" + e.target.dataset.idx ,
    });
  },
  initData(){
    let url1 = 'https://api.aiwan.run/time/time/getAllUserWeekTime'
    let url2 = 'https://api.aiwan.run/time/time/getAllUserMonthTime'
    let url3 = 'https://api.aiwan.run/time/time/getAllUserTotalTime'
    my.request({
      url: url1,
      method: 'GET',
      headers: {
        'content-type': 'application/json', //默认值
      },
      dataType: 'json',
      success: function (res) {
        this.setData({
          zdata:res.data.zdata
        })
      },
      fail: function (res) {
        my.alert({ content: 'fail' });
      }
    });
    my.request({
      url:url2,
      method:'GET',

      headers: {
        'content-type': 'application/json', //默认值
      },
      dataType: 'json',
      success: function (res) {
        this.setData({
          ydata:res.data.ydata
        })
      },
      // fail: function (res) {
      //   my.alert({ content: 'fail' });
      // }
    })
    my.request({
      url:url3,
      method:'GET',
      headers: {
        'content-type': 'application/json', //默认值
      },
      dataType: 'json',
      success: function (res) {
        this.setData({
          tdata:res.data.tdata
        })
      },
      // fail: function (res) {
      //   my.alert({ content: 'fail' });
      // }
    })
  }
});
