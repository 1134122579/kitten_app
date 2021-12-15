// pages/activitydetail/activitydetail.js
import Api from '../../api/index'
let App=getApp()
import storage from '../../utils/cache'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeights: App.globalData.statusBarHeight,
    detail: null,
    userInfo:null,
    list:[],
    type:'w'  //	w 近七天 m 近一个月
  },

go(){
  let {detail } = this.data
wx.navigateTo({
  url: '/pages/purchase/purchase?id='+detail.id,
})
},
ontabclick(event){
let name=event.detail.name
this.setData({
  type:name
})
this.getRank()
},
getRank(event){
  let {type}=this.data
  Api.getUserRank({
    date:type
  }).then(res=>{
    this.setData({
      list:res
    })
  })
},

tabbershow() {
  console.log('导航钢缆',this.getTabBar())
  if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
    })
  }
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
    wx.setNavigationBarTitle({
      title:'排行榜'
   })
   console.log(999,App.globalData)
   this.getRank()
   this.setData({
     userInfo:App.globalData.userInfo
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
    this.tabbershow()
    this.setData({
      statusBarHeights: App.globalData.statusBarHeight,
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