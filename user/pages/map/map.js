// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    long: 108.199861, 
    lat: 22.834368,
    // lat: 30.281714,
    // long: 120.180895,
    markers:[

      {
        id: 0,
        latitude: 22.834368,
        longitude: 108.199861,
        width: 40,
        height: 40,
        label: {
          content: "下城",
          color: "#fff",
          fontSize: 12,
          anchorX: -(0.5 * (3 * 24))/2,
          textAlign: "center"
        }
      },


      {
        id: 1,
        latitude: 22.81673,
        longitude: 108.3669,
        callout:{
          content: '你所在的位置'
        },

        label: {
          content: "下城",
          color: "#fff",
          fontSize: 12,
          anchorX: -(0.5 * (3 * 24))/2,
          textAlign: "center"
        }
      },
    ],

    pl:[

      {
        points:[
          { latitude: 30.271825,
            longitude: 120.180895,},
          { latitude: 30.291825,
            longitude: 120.180895,}
        ],
        width: 2,
        color: '#f80',
      }


    ]

  },  // data

  touchMap(e){
    console.log('点击了地图', e.detail)
    const d = e.detail
    for(let i of this.data.markers){
      if( i.latitude === d.latitude
        && i.latitude === d.latitude) return
    }
    console.log('没有点中mark')
    this.setData({
      ['markers[0].latitude']: d.latitude,
      ['markers[0].longitude']: d.longitude
    })

  },

  touchMark(e){
    
    const d = e.detail
    console.log('点击了标志', d)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      success: (d) => {
        console.log('获得位置', d)
        this.setData({
          long : d.longitude,
          lat: d.latitude 
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})