// pages/likepage/likepage.js
let App = getApp()
import Api from "../../api/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabId: null,
    navHeight: App.globalData.navHeight,
    isnullLsit: false,
    list: [],
    lisQuery: {
      page: 1
    }
  },
  tabType(e) {
    let id = e.detail
    console.log(id)
    this.setData({
      tabId: id
    })
    this.getFollow()
  },
  // 翻页
  onpullpage() {
    (this.data.lisQuery.page) ++
    this.getFollow()
  },
  // 数据
 async getFollow() {
    let {
      lisQuery,
      list,
      tabId
    } = this.data
    let res = []
    if (tabId == 1) {
      res =await Api.getFollow(lisQuery)
    } else if (tabId == 2) {
      res =await Api.getMyfans(lisQuery)
    } else {
      res =await Api.getFollow(lisQuery)
    }
    console.log(res,121231231)
    this.setData({
      isnullLsit: res.length > 0 ? false : true
    })
    if (lisQuery.page == 1) {
      this.setData({
        list: res
      })
    } else {
      this.setData({
        list: list.concat(res)
      })
    }
  },
  // 取关
  cacheFollow(e){
    console.log(e)
    let {item}=e.currentTarget.dataset
    Api.cacheFollow(item).then(res=>{
      wx.showToast({
        title: '取消关注',
        icon:'none'
      })
    })
  },
  // 关注
  addFollow(e){
    console.log(e)
    let {item}=e.currentTarget.dataset
    Api.addFollow(item).then(res=>{
      wx.showToast({
        title: '关注',
        icon:'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      id
    } = options
    this.setData({
      tabId: id
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight: App.globalData.navHeight,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getFollow()
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
this.onpullpage()
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