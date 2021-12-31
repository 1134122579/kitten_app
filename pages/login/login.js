// pages/start/index.js
import Api from '../../api/index'

import Cache from '../../utils/cache'
let App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,
    userInfo: {},
    disabled:false
  },
  onLoad(e) {
    var that = this;
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    // this.bindgetuserinfo()
  },
  bindgetuserinfo() {
    var that = this;
    wx.getUserInfo({
      success(res) {
        console.log(res)
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  noUser(){
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  getUserProfile(e) {
    let that = this
    this.setData({
      disabled: true
    })

    wx.login({
      success: res => {
        console.log(res)
        this.setData({
          code: res.code
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      lang: 'zh_CN',
      success: (res) => {
        console.log(res)
        let obj = res
        obj.code = that.data.code
        console.log(obj)
        wx.showLoading({
          title: '登陆中..',
        })
  
        Api.wx_mini_login(obj).then(res => {
          console.log(res)
          // 获取用户信息
          Cache.setToken(res.token)
          Api.getUserInfo().then(res => {
     
            Cache.setUserInfo(res)
            wx.hideLoading()
            that.setData({
              userInfo: res
            })
            App.globalData.userInfo=res
            App.globalData.is_login=false
    
            wx.switchTab({
              url: '/pages/home/home',
            })
          })
        })
      },
      complete: () => {
        that.setData({
          disabled: false
        })
      }
    })
  },
  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

})