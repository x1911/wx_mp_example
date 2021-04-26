import { Net } from '../../utils/Net'

const NF = new Net()
// pages/01/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      phone: '', password: ''
    },
    isLogin: false,
  },

  async login(){
    const {user} = this.data
    if(user.phone === '' || user.password === '') return NF.alert('未填写')
    const ans = await NF.post('s/login', this.data.user)
    NF.alert( '登录成功' )
    // console.log('内容', user, ans.msg.token)
    // DB.saveToken( ans.msg )
  },

  async chkLogin(){
    const ans = await NF.post('s/auth')
    console.log('检查登录结果', ans)
    if(!ans.success) return
    this.setData({ isLogin : true })
  },


  bv(e){
    const v = e.currentTarget.dataset
    const name = v.xx
    const value = e.detail.value
    // console.log('点击的name', name, this.data.user)
    this.setData({
      [`user.${ name }`] : value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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