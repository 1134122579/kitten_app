// pages/home/home.jslet

let App=getApp()
import Api from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:App.globalData.navHeight,
    hotList:[],
  },
  // 获取标签
  getHotLable(){
    Api.getHotLable().then(res=>{
    this.setData({
      hotList:res
    })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    App.tabbershow(this,0 );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
    navHeight:App.globalData.navHeight,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getHotLable()
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