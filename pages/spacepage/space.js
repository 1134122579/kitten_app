// pages/spacepage/space.js
var appInst = getApp();
import Api from "../../api/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    is_location: false,
    navHeight: appInst.globalData.navHeight,
    RoomList: [],
    latitude: '',
    longitude: '',
    is_typeStatus: 1,
    typeList: [{
      status: 1,
      title: '默认门店'
    }, {
      status: 2,
      title: '离我最近'
    }]
  },

  onClickType(e) {
    let that = this
    let {
      status
    } = e.currentTarget.dataset
    let {
      is_typeStatus
    } = this.data
    let {
      is_location,
      longitude,
      latitude
    } = appInst.globalData
    if (is_typeStatus == status) {
      return
    }
 
    if (status == 1) {
      this.setData({
        is_typeStatus: status,
        longitude: '',
        latitude: '',
      })
      this.getRoom()
      return
    }
    wx.showLoading({
      title: '获取定位..',
    })
    if(is_location){
      that.setData({
        longitude,
        latitude,
        is_typeStatus: status
      })
      that.getRoom()
    }else{
    this.isGetlocation((res) => {
          appInst.globalData.longitude = res.longitude
          appInst.globalData.latitude = res.latitude
          appInst.globalData.is_location = true
          that.setData({
            longitude: res.longitude,
            latitude: res.latitude,
            is_typeStatus: status
          })
          that.getRoom()
    })
    }
    wx.hideLoading()
  },
  // 是否授权定位
  // isGetlocation(cb) {
  //   var that = this
  //   wx.getSetting({
  //     success(res) {
  //       console.log('这里判断是否有地位权限',res.authSetting)
  //       //这里判断是否有地位权限
  //       if (!res.authSetting['scope.userLocation']) {
  //         wx.showModal({
  //           title: '提示',
  //           content: '请求获取位置权限',
  //           success: function (res) {
  //             if (res.confirm == false) {
  //               return false;
  //             }
  //             wx.openSetting({
  //               success(res) {
  //                 //如果再次拒绝则返回页面并提示
  //                 if (!res.authSetting['scope.userLocation']) {
  //                   wx.showToast({
  //                     title: '此功能需获取位置信息，请重新设置',
  //                     duration: 3000,
  //                     icon: 'none'
  //                   })
  //                 } else {
  //                   //允许授权，调用地图
  //                   that.setData({
  //                     is_location: true
  //                   })
  //                   cb()
  //                 }
  //               }
  //             })
  //           }
  //         })
  //       } else {
  //         cb()
  //              //如果有定位权限，调用地图
  //             //  wx.showModal({
  //             //   title: '您手机定位功能没有开启',
  //             //   content: '请在系统设置中打开定位服务',
  //             //   success() {
  //             //          // 跳到首页
  //             //   }
  //             // })
  //       }
  //     }
  //   })
  // },
  // 是否授权定位
  isGetlocation(cb) {
    // wx.getSystemInfo(Object object) 可以获取app是否获取定位权限
    const that = this
    wx.getLocation({
      type: "wgs84",
      success(res) {
        console.log(res)
        // 调用业务逻辑
        cb(res)
      },
      fail() {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '提示',
                content: '此功能需获取位置信息，请重新设置',
                success(tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      type: "wgs84",
                      success(data) {
                        if (data.authSetting['scope.userLocation']) {
                          wx.getLocation({
                            success(res) {
                              console.log(res)
                              // 调用业务逻辑
                              cb(res)
                            }
                          })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 1000
                          })
                        }
                      },
                      fail(res) {
                        wx.showToast({
                          title: '调起小程序权限设置界面失败',
                          icon: 'none',
                          duration: 1000
                        })
                        console.log(res, '2333')
                      }
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '您手机定位功能没有开启, 请在系统设置中打开定位服务。',
                showCancel: false
              })
            }
          },
          fail(res) {
            wx.showToast({
              title: 'wx.getSetting获取用户之前授权的信息失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    })
  },
  getRoom() {
    let that = this;
    let {
      latitude,
      longitude
    } = this.data
    Api.getShop({
      lng: longitude,
      lat: latitude
    }).then((res) => {
      that.setData({
        RoomList: res,
      });
      wx.hideLoading();
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    });
  },
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading()
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getRoom();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      navHeight: appInst.globalData.navHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    appInst.tabbershow(this, 3);
    this.getRoom()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});