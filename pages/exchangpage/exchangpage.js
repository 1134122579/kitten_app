 

 import Api from "../../api/index" 
 let  App=getApp()
// pages/exchangpage/exchangpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navHeight:App.globalData.navHeight,
    disabled: true,
    inputValue: ''
  },
  bindcodeInput: function (e) {
    let value = e.detail.value
    if (value) {
      this.setData({
        disabled: false
      })
    }else{
      this.setData({
        disabled: true
      })
    }
    this.setData({
      inputValue: value
    })
  },
  exchangeCoupon(){
    let {inputValue}=this.data
    Api.exchangeCoupon({
      coupon_code:inputValue
    }).then(res=>{
      wx.showToast({
        title: '兑换成功',
        icon:'none'
      })
      this.setData({
        inputValue:''
      })
    })
  },
  // 扫码
  scanCode(){
  let that=this 
    wx.scanCode({
      success (res) {
        console.log(res)
      that.setData({
        inputValue:res.result
      })
      }
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
    this.setData({
      navHeight:App.globalData.navHeight
    })

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