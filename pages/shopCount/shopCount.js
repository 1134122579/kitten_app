// pages/shopCount/shopCount.js
import storage from '../../utils/cache'
import Api from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wait_time: '',
    wait_car: ''
  },
  bindtimeInput: function (e) {
    var value = e.detail.value
    this.setData({
      wait_time: value
    })
  },
  bindcardInput(e) {
    console.log(e)
    var value = e.detail.value
    this.setData({
      wait_car: value
    })
  },
  // 修改门店客流两
  setshopCount() {
    let {
      shop_id
    } = storage.getUserInfo()
    let {
      wait_car,
      wait_time
    } = this.data
    if (!wait_time) {
      wx.showToast({
        title: '请输入等待时间',
        icon: "none"
      })
      return
    }
    if (!wait_car) {
      wx.showToast({
        title: '请输入等待车辆',
        icon: "none"
      })
      return
    }

    wx.showLoading({
      title: '修改中...',
      mask: true
    })
    Api.shopCount({
      shop_id,
      wait_car,
      wait_time
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '修改成功',
      })
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