// pages/about/about.js
let App = getApp()
import storage from '../../utils/cache'
import Api  from '../../api/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },
  goVip() {
    wx.navigateTo({
      url: '/pages/vipdetail/vipdetail',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!storage.getToken()) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tabbershow() {
    console.log('导航钢缆',this.getTabBar())
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.tabbershow()
    console.log(123)
    Api.getUserInfo().then(res=>{
      App.globalData.userInfo=res
    })
    let userInfo = App.globalData.userInfo
    this.setData({
      userInfo
    })
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