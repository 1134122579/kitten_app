// pages/OrderLog/OrderLog.js
import Api from '../../api/index'
import utils, { formatDate } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusList: [{
      title: '使用中',
      status: 1
    }, {
      title: '预约中',
      status: 2
    }, {
      title: '已预定 ',
      status: 3
    }, {
      title: '已结束 ',
      status: 4
    }, {
      title: '已取消 ',
      status: 5
    }],
    list: [],
    status: 1
  },
  notice(event) {
    let that = this
    console.log(event)
    let {
      item
    } = event.currentTarget.dataset
    Api.userVisit(item).then(res => {
      wx.showToast({
        title: res.data.message,
        duration: 3000,
        icon: "none"
      })
    })
  },
  order(event) {
    let that = this
    console.log(event)
    let {
      item
    } = event.currentTarget.dataset
    console.log(item)
    Api.nextPayRoomOrder({
      out_trade_no: item.order_no
    }).then(res => {
      let {
        nonceStr,
        paySign,
        signType,
        out_trade_no,
        timeStamp
      } = res
      wx.requestPayment({
        nonceStr,
        signType,
        package: res.package,
        paySign,
        timeStamp,
        success(data) {
          Api.queryOrder({
            out_trade_no
          }).then(res => {
            console.log('成功', data)
            that.getUserOrderLog()
            wx.showToast({
              title: '预约成功',
              duration: 3000
            })
          })
        },
      })

    })
  },
  onChange(event) {
    this.setData({
      status: event.detail.name
    })
    this.getUserOrderLog()
  },
  getUserOrderLog() {
    let {
      status
    } = this.data
    Api.getUserOrderLog({
      status
    }).then(res => {
      res = res.map(item => {
        return {
          room_id: item.room_id,
          name: item.name,
          end_time: item.end_time,
          start_time: item.start_time,
          end_time_date: utils.formatDate(item.end_time * 1000),
          cover: item.cover,
          order_no: item.order_no,
          start_time_dete: utils.formatDate(item.start_time * 1000)
        }
      })
      this.setData({
        list: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      status
    } = options
    this.setData({
      status
    })
    this.getUserOrderLog()
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