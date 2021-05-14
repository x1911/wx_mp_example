import { Net } from "../../utils/Net"

const NF = new Net()
// pages/reg/reg.js
Page({

  async reg(){
    console.log('注册信息', this.data.user)
    const ans  = await NF.post('s/reg', this.data.user)
    console.log('访问结果', ans)
    NF.alert( ans.msg )
    if( ans.success !== 1 ) return
    wx.navigateTo({
      url: '/pages/01/user',
    })
  },

  pe(e){
    const v = e.detail.value
    const k = e.currentTarget.dataset.key
    console.log('类人', v, k)
    const key = 'user.' + k
    this.setData({
      [key] : v
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('传入参数', options)
    const u = JSON.parse( options.d )
    this.setData({
      user: { ...u }
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