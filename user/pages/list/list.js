import {Net} from '../../utils/Net'
const NF = new Net()

// pages/list/list.js
Page({

  async fetch(){
    if(this.data.isLoading) return
    this.setData({ isLoading : true })

    const o = {}
    if( this.data.last !== 0 ) o.last = this.data.last
    const ans = await NF.getFunc('movieList', o)
    const oarr = ans.msg
    console.log('得到的结果', ans, o, oarr[ oarr.length - 1 ].ID, this.data.last.length)
    
    this.setData({
      arr: [ ...this.data.arr, ...oarr ],
      last: oarr[ oarr.length - 1 ].ID,
      isLoading: false
    })

  },

  /**
   * 页面的初始数据
   */
  data: {
    last: 0,
    arr : [],
    isLoading: false,
  },

  goDetail(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetch()
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
    this.setData({
      last: 0,
      arr: []
    })
    this.fetch()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.fetch()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})