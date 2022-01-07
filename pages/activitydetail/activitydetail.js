// pages/activitydetail/activitydetail.js
import Api from '../../api/index'
let App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    statusBarHeights:App.globalData.statusBarHeight,
  },

go(){
  let {detail } = this.data
wx.navigateTo({
  url: '/pages/purchase/purchase?id='+detail.id,
})
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id
    } = options
    Api.getActivityDetails({
      id
    }).then(res => {
      console.log(res)
      this.setData({
        detail: res
      })
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
    this.setData({
      statusBarHeights:App.globalData.statusBarHeight,
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