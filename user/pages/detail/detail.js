import { Net } from "../../utils/Net"

const NF = new Net()
// pages/detail/detail.js
Page({

  async fetchOne(){
    const one = await NF.getFunc('movieOne', {ID: this.data.id})
    console.log('得到的结果', one)
    this.setData({
      movie: one.msg
    })

    const clist = await NF.getFunc('commentOne', {ID: this.data.id})
    console.log('单片评论', clist)
    this.setData({ carr: clist.msg })
  },

  async submitComment(){
    const c = this.data.comment
    if(c.length < 10) return NF.alert('字数太少')
    const ans = await NF.post('addComment', {
      ID: this.data.id,
      content: c
    })
    NF.alert(ans.msg)
  },

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    movie: {},
    carr: [],  // 评论列表
    comment: '',
  },

  cc(e){
    this.setData({ comment: e.detail.value })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    console.log('传入的数据', options)
    this.setData({ id })
    this.fetchOne()
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