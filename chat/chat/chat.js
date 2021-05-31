const { Socket, MsgTypes } = require("../../utils/Socket")

const DB = new Socket()
// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    msg: [],
    chat: ''
  },

  chatTxt(e){
    console.log('输入', e)
    this.setData({
      chat: e.detail.value
    })
  },

  sendMsg(){
    DB.sendMessage({
      type: MsgTypes.CHAT, 
      name: this.data.name,
      msg: this.data.chat,
      avatar: this.data.avatar
    })
    this.setData({ chat: '' })
  },



  async socketIo(){
    
    const ans = await DB.socketConnect()
    console.log('链接信息', ans)
    // await DB.sendMessage({ type: 1, msg: '糖水'})
    await DB.sendMessage({ type: MsgTypes.INIT, msg: this.data.name })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      avatar: options.avatar,
    })
    this.socketIo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // DB.sendMessage({
    //   type: MsgTypes.CHAT,
    //   msg: this.data.name + ' 进入了房间'
    // })

    DB.onMsg = (msgList) => {
      console.log('接收到信息', msgList)
      this.setData({
        msg: msgList
      })
    }
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