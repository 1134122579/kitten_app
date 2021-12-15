// pages/vipdetail/vipdetail.js
let App = getApp()
import Api from '../../api/index'
import storage from '../../utils/cache'
import {
  getDate
} from "../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_show: false,
    checked: false,
    userInfo: '',
    vipDetail: null,
    statusBarHeights: App.globalData.statusBarHeight,
    price: ''
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });

  },

  getVipPlay() {
    Api.getVip().then(res => {
      console.log(res)
      this.setData({
        price: res.price
      })
    })
  },
  no() {},
  payVipOrder() {
    let that = this
    let {
      checked,
      price
    } = this.data
    // if (!checked) {
    //   wx.showToast({
    //     title: '请阅读会员协议',
    //   })
    //   return
    // }
    let {
      balance
    } = storage.getUserInfo()
    wx.showModal({
      content: '是否确认购买会员',
      showCancel: true,
      title: '购买提示',
      success: (result) => {
        if (result.confirm) {
          wx.showLoading({
            title: '支付中...',
            mask: true
          })
          Api.payVipOrder({
            pay_type: 2
          }).then(res => {
            wx.hideLoading()
            that.setData({
              is_show: true,
            })
          })
        }else{
          wx.showToast({
            title: '取消购买',
            icon:"none"
          })
        }

      },
      fail: (res) => {},
      complete: (res) => {},
    })
    if (Number(balance) < Number(price)) {
      wx.showToast({
        title: '余额不足,请充值',
        icon: "none"
      })
      return
    }
  },

  // 支付成功
  okpaly() {
    let {
      is_show
    } = this.data
    Api.getUserInfo().then(res => {
      App.globalData.userInfo = res
      res.vip_time_out = Math.round(new Date() / 1000) <= res.vip_time_out ? getDate(res["vip_time_out"] + "000") : '';
      this.setData({
        userInfo: res,
        is_show: !is_show
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVipPlay()
    wx.setNavigationBarTitle({
      title: '会员中心',
    })
    let userInfo = storage.getUserInfo()
    userInfo.vip_time_out = Math.round(new Date() / 1000) <= userInfo.vip_time_out ? getDate(userInfo["vip_time_out"] + "000") : '';
    this.setData({
      userInfo
    })
    // 获取详情
    Api.getVipDesc().then(res => {
      console.log(res)
      this.setData({
        vipDetail: res
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